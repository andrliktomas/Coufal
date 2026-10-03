/** GET /api/files/<r2 key>?exp=…&sig=… — time-limited download of an uploaded artwork file. */
import type { Env } from '../../_lib/env';
import { verify } from '../../_lib/sign';

export const onRequestGet: PagesFunction<Env> = async ({ request, env, params }) => {
  const url = new URL(request.url);
  const key = decodeURIComponent(Array.isArray(params.key) ? params.key.join('/') : String(params.key ?? ''));
  const exp = Number(url.searchParams.get('exp'));
  const sig = url.searchParams.get('sig') ?? '';
  if (!env.FILE_LINK_SECRET || !env.QUOTE_UPLOADS || !key.startsWith('quotes/')) return new Response('Not found', { status: 404 });
  if (!(await verify(env.FILE_LINK_SECRET, key, exp, sig))) return new Response('Link expired or invalid', { status: 403 });
  const obj = await env.QUOTE_UPLOADS.get(key);
  if (!obj) return new Response('Not found', { status: 404 });
  const headers = new Headers();
  obj.writeHttpMetadata(headers);
  headers.set('cache-control', 'private, no-store');
  headers.set('x-robots-tag', 'noindex');
  return new Response(obj.body, { headers });
};
