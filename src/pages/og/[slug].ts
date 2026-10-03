/**
 * Social cards (1200×630): one per piece (/og/677.jpg), a default card and the logo.
 * Rendered with sharp at build time; the type is drawn as SVG, so it uses whatever
 * serif the build machine has — the photo and the layout carry the card.
 */
import type { APIRoute, GetStaticPaths } from 'astro';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import sharp, { type OverlayOptions } from 'sharp';
import { allPieces, type Piece } from '../../lib/pieces';
import { t } from '../../i18n/ui';

export const getStaticPaths = (async () => {
  const pieces = await allPieces();
  return [
    { params: { slug: 'default.jpg' }, props: { piece: null } },
    { params: { slug: 'logo.png' }, props: { piece: null } },
    ...pieces.map((p) => ({ params: { slug: `${p.no}.jpg` }, props: { piece: p } })),
  ];
}) satisfies GetStaticPaths;

const W = 1200;
const H = 630;
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);
const LOGO = join(process.cwd(), 'src/assets/brand/logo-ink.png');

/** Migrated photos live at src/assets/pieces/{no}/1.jpg. */
const sourcePath = (p: Piece) => (p.images.length ? join(process.cwd(), 'src/assets/pieces', String(p.no), '1.jpg') : null);

async function card(p: Piece | null): Promise<Buffer> {
  const u = t('en');
  const title = p ? p.title : 'Medals, badges & belt buckles';
  const sub = p ? `${u.cat[p.category].singular} · No. ${p.no}` : 'Cast to your design · Brno · Est. 2001';
  const text = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <rect width="${W}" height="${H}" fill="#F6F6F4"/>
    <line x1="56" y1="80" x2="${p ? 600 : 1144}" y2="80" stroke="#38414A" stroke-width="1"/>
    <text x="56" y="112" font-family="IBM Plex Mono, DejaVu Sans Mono, monospace" font-size="20" letter-spacing="4" fill="#38414A">CRDESIGN — BRNO</text>
    ${p ? `<text x="40" y="430" font-family="Bodoni Moda, DejaVu Serif, serif" font-style="italic" font-size="300" fill="none" stroke="#B6BEC7" stroke-width="1.5">${p.no}</text>` : ''}
    <text x="56" y="500" font-family="Bodoni Moda, DejaVu Serif, serif" font-size="${title.length > 18 ? 52 : 76}" fill="#14181C">${esc(title.length > 34 ? title.slice(0, 33) + '…' : title)}</text>
    <text x="56" y="560" font-family="IBM Plex Mono, DejaVu Sans Mono, monospace" font-size="20" letter-spacing="3" fill="#5E6873">${esc(sub.toUpperCase())}</text>
  </svg>`);
  const layers: OverlayOptions[] = [];
  const path = p && sourcePath(p);
  if (path && existsSync(path)) {
    const photo = await sharp(await readFile(path)).resize(520, 520, { fit: 'cover' }).toBuffer();
    layers.push({ input: photo, left: 624, top: 56 });
  } else {
    const logo = await sharp(LOGO).resize(360, 350, { fit: 'contain', background: '#F6F6F4' }).flatten({ background: '#F6F6F4' }).toBuffer();
    layers.push({ input: logo, left: 760, top: 120 });
  }
  return sharp(text).composite(layers).jpeg({ quality: 82, mozjpeg: true }).toBuffer();
}

export const GET: APIRoute = async ({ params, props }) => {
  if (params.slug === 'logo.png') {
    const png = await sharp(LOGO).resize(512, 512, { fit: 'contain', background: '#F6F6F4' }).flatten({ background: '#F6F6F4' }).png().toBuffer();
    return new Response(new Uint8Array(png), { headers: { 'content-type': 'image/png' } });
  }
  const jpg = await card((props as { piece: Piece | null }).piece);
  return new Response(new Uint8Array(jpg), { headers: { 'content-type': 'image/jpeg' } });
};
