import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const base = site!.href.replace(/\/$/, '');
  // Preview deployments (*.pages.dev branch URLs) should not be indexed; Pages adds X-Robots-Tag there too.
  return new Response(`User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${base}/sitemap-index.xml\n`, {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  });
};
