import type { APIRoute } from 'astro';

/** Temporary hosts (workers.dev / pages.dev) stay out of search results until the real domain is live. */
export const GET: APIRoute = ({ site }) => {
  const base = site!.href.replace(/\/$/, '');
  const temporary = /\.(workers|pages)\.dev$/.test(site!.hostname);
  const body = temporary
    ? `User-agent: *\nDisallow: /\n`
    : `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${base}/sitemap-index.xml\n`;
  return new Response(body, { headers: { 'content-type': 'text/plain; charset=utf-8' } });
};
