/**
 * POST /api/quote — the quote request form.
 *
 * 1. validates the fields (same rules as the browser),
 * 2. verifies Cloudflare Turnstile,
 * 3. stores attached artwork in R2 (QUOTE_UPLOADS),
 * 4. forwards a JSON payload to QUOTE_WEBHOOK_URL (Make.com), with signed download links.
 *
 * Answers JSON to fetch() (Accept: application/json). A plain form post (no JS) gets a
 * 303 back to the quote page with #sent or #error-<code>, which the page shows via :target.
 */
import type { Env } from '../_lib/env';
import { sign } from '../_lib/sign';
import { ALLOWED_EXT, MAX_UPLOAD_BYTES, QUOTE_MIN, QUOTE_TYPES, type QuoteType } from '../../src/lib/quote-config';
import { QUOTE_SLUG } from '../../src/i18n/routes';
import { LOCALES, DEFAULT_LANG, type Lang } from '../../src/i18n/locales';

type ErrorCode = 'turnstile' | 'too_large' | 'file_type' | 'missing' | 'qty_min' | 'email' | 'date' | 'server';

const MAX_FILES = 10;
const LINK_TTL_DAYS = 30;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const str = (v: string | File | null, max = 500) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

function reply(request: Request, lang: Lang, result: { ok: true; id: string } | { ok: false; error: ErrorCode; field?: string }, status = 200) {
  const wantsJson = (request.headers.get('accept') ?? '').includes('application/json');
  if (wantsJson) {
    return new Response(JSON.stringify(result), {
      status: result.ok ? 200 : status,
      headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
    });
  }
  const url = new URL(request.url);
  const hash = result.ok ? 'sent' : `error-${result.error}`;
  return Response.redirect(`${url.origin}/${lang}/${QUOTE_SLUG[lang]}/#${hash}`, 303);
}

async function verifyTurnstile(secret: string, token: string, ip: string | null, idempotencyKey: string) {
  const body = new FormData();
  body.append('secret', secret);
  body.append('response', token);
  if (ip) body.append('remoteip', ip);
  body.append('idempotency_key', idempotencyKey);
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body });
  const data = (await res.json()) as { success: boolean; 'error-codes'?: string[] };
  return data.success;
}

const safeName = (name: string) =>
  name
    .normalize('NFKD')
    .replace(/[^\w.\- ]+/g, '')
    .replace(/\s+/g, '_')
    .slice(-120) || 'file';

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return reply(request, DEFAULT_LANG, { ok: false, error: 'server' }, 400);
  }

  const langIn = str(form.get('lang'), 5);
  const lang: Lang = (LOCALES as readonly string[]).includes(langIn) ? (langIn as Lang) : DEFAULT_LANG;
  const fail = (error: ErrorCode, field?: string, status = 422) => reply(request, lang, { ok: false, error, field }, status);
  const id = crypto.randomUUID();

  // Honeypot: bots fill every field. Pretend success, do nothing.
  if (str(form.get('website'))) return reply(request, lang, { ok: true, id });

  // --- fields
  const type = str(form.get('type'), 20) as QuoteType;
  if (!QUOTE_TYPES.includes(type)) return fail('missing', 'type');
  const quantityRaw = str(form.get('quantity'), 10);
  if (!quantityRaw) return fail('missing', 'quantity');
  const quantity = Number(quantityRaw);
  if (!Number.isInteger(quantity) || quantity < QUOTE_MIN[type]) return fail('qty_min', 'quantity');
  const neededBy = str(form.get('neededBy'), 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(neededBy)) return fail('missing', 'neededBy');
  const yesterday = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10);
  if (neededBy < yesterday) return fail('date', 'neededBy');
  const country = str(form.get('country'), 100);
  if (!country) return fail('missing', 'country');
  const email = str(form.get('email'), 254);
  if (!EMAIL.test(email)) return fail('email', 'email');
  const name = str(form.get('name'), 200);
  const description = str(form.get('description'), 5000);
  const reference = str(form.get('reference'), 40);

  const files = form.getAll('files').filter((f): f is File => typeof f !== 'string' && f.size > 0);
  if (files.length > MAX_FILES) return fail('too_large', 'files');
  if (files.reduce((s, f) => s + f.size, 0) > MAX_UPLOAD_BYTES) return fail('too_large', 'files', 413);
  for (const f of files) {
    const ext = f.name.split('.').pop()?.toLowerCase() ?? '';
    if (!(ALLOWED_EXT as readonly string[]).includes(ext)) return fail('file_type', 'files');
  }

  // --- spam check
  const token = str(form.get('cf-turnstile-response'), 4096);
  if (!env.TURNSTILE_SECRET_KEY) {
    console.error('TURNSTILE_SECRET_KEY is not set');
    return fail('server', undefined, 500);
  }
  if (!token) return fail('turnstile');
  try {
    if (!(await verifyTurnstile(env.TURNSTILE_SECRET_KEY, token, request.headers.get('cf-connecting-ip'), id))) return fail('turnstile', undefined, 403);
  } catch (e) {
    console.error('turnstile verify failed', e);
    return fail('server', undefined, 502);
  }

  // --- uploads
  const day = new Date().toISOString().slice(0, 10);
  const origin = (env.PUBLIC_ORIGIN || new URL(request.url).origin).replace(/\/$/, '');
  const exp = Math.floor(Date.now() / 1000) + LINK_TTL_DAYS * 86_400;
  const stored: { name: string; size: number; type: string; key: string; url: string | null }[] = [];
  if (files.length) {
    if (!env.QUOTE_UPLOADS) {
      console.error('R2 binding QUOTE_UPLOADS is missing');
      return fail('server', undefined, 500);
    }
    try {
      for (const [i, f] of files.entries()) {
        const key = `quotes/${day}/${id}/${i + 1}-${safeName(f.name)}`;
        await env.QUOTE_UPLOADS.put(key, f.stream(), {
          httpMetadata: { contentType: f.type || 'application/octet-stream', contentDisposition: `attachment; filename="${safeName(f.name)}"` },
          customMetadata: { quoteId: id, originalName: f.name.slice(0, 200), email },
        });
        const url = env.FILE_LINK_SECRET
          ? `${origin}/api/files/${encodeURIComponent(key)}?exp=${exp}&sig=${await sign(env.FILE_LINK_SECRET, key, exp)}`
          : null;
        stored.push({ name: f.name, size: f.size, type: f.type, key, url });
      }
    } catch (e) {
      console.error('R2 upload failed', e);
      return fail('server', undefined, 502);
    }
  }

  // --- hand over to Make.com
  const payload = {
    id,
    receivedAt: new Date().toISOString(),
    lang,
    type,
    minimum: QUOTE_MIN[type],
    quantity,
    reference: reference || null,
    description: description || null,
    neededBy,
    country,
    name: name || null,
    email,
    files: stored,
    filesExpireAt: stored.length ? new Date(exp * 1000).toISOString() : null,
    page: request.headers.get('referer'),
    userAgent: request.headers.get('user-agent'),
    ipCountry: (request as Request & { cf?: { country?: string } }).cf?.country ?? null,
  };
  if (!env.QUOTE_WEBHOOK_URL) {
    console.error('QUOTE_WEBHOOK_URL is not set', payload);
    return fail('server', undefined, 500);
  }
  const headers: Record<string, string> = { 'content-type': 'application/json' };
  if (env.QUOTE_WEBHOOK_SECRET) headers['x-quote-secret'] = env.QUOTE_WEBHOOK_SECRET;
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetch(env.QUOTE_WEBHOOK_URL, { method: 'POST', headers, body: JSON.stringify(payload) });
      if (res.ok) return reply(request, lang, { ok: true, id });
      console.error('webhook answered', res.status, await res.text().catch(() => ''));
    } catch (e) {
      console.error('webhook failed', e);
    }
  }
  return fail('server', undefined, 502);
};
