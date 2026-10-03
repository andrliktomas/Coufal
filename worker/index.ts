/**
 * Cloudflare Worker entry (Workers + static assets). Serves dist/ and runs the same
 * handlers as the Pages Functions in functions/, so the site works on either product.
 * Only the paths listed in wrangler.jsonc → assets.run_worker_first reach this code;
 * everything else is served straight from the assets (incl. _redirects and _headers).
 */
import type { Env } from '../functions/_lib/env';
import { onRequestGet as rootRedirect } from '../functions/index';
import { onRequestPost as quote } from '../functions/api/quote';
import { onRequestGet as files } from '../functions/api/files/[[key]]';
import { legacyHandler } from '../functions/_lib/legacy';

interface WorkerEnv extends Env {
  ASSETS: Fetcher;
}

type Handler = (ctx: { request: Request; env: WorkerEnv; params: Record<string, string | string[]> }) => Response | Promise<Response>;
const call = (h: unknown, request: Request, env: WorkerEnv, params: Record<string, string | string[]> = {}) =>
  (h as Handler)({ request, env, params });

const enLegacy = legacyHandler('en');
const deLegacy = legacyHandler('de');

export default {
  async fetch(request: Request, env: WorkerEnv): Promise<Response> {
    const { pathname } = new URL(request.url);
    const method = request.method;

    if (pathname === '/' && (method === 'GET' || method === 'HEAD')) return call(rootRedirect, request, env);
    if (pathname === '/api/quote') {
      return method === 'POST' ? call(quote, request, env) : new Response('Method Not Allowed', { status: 405, headers: { allow: 'POST' } });
    }
    if (pathname.startsWith('/api/files/') && method === 'GET') {
      return call(files, request, env, { key: pathname.slice('/api/files/'.length).split('/') });
    }
    if (pathname.startsWith('/en/ukazky-nasich-vyrobku')) return call(enLegacy, request, env);
    if (pathname.startsWith('/de/ukazky-nasich-vyrobku')) return call(deLegacy, request, env);
    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<WorkerEnv>;
