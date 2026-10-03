/**
 * Migrates the K2 catalogue from the old Joomla site into content collections.
 *
 *   npm run migrate              crawl everything
 *   npm run migrate -- --only=677,733   re-crawl selected items
 *
 * Idempotent: images that already exist are not downloaded again, and fields
 * that were edited by hand in src/content/pieces/{no}.json (anything that is not
 * null) are never overwritten. Only `migrated.*` and missing values are refreshed.
 */
import { mkdir, readFile, writeFile, access } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import products from '../content/products.json' with { type: 'json' };

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const BASE = 'https://www.medaile-odznaky.cz';
const OLD_LANGS = ['cs', 'en', 'de'] as const;
type OldLang = (typeof OLD_LANGS)[number];
const PAGE = 20;

const args = process.argv.slice(2);
const only = args.find((a) => a.startsWith('--only='))?.slice(7).split(',').map(Number);

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function get(url: string, tries = 4): Promise<Response> {
  for (let i = 0; ; i++) {
    try {
      const res = await fetch(url, { headers: { 'user-agent': 'CRdesign-migration/1.0' } });
      if (res.ok) return res;
      if (res.status === 404) return res;
      throw new Error(`HTTP ${res.status}`);
    } catch (e) {
      if (i >= tries - 1) throw new Error(`${url}: ${(e as Error).message}`);
      await sleep(1000 * 2 ** i);
    }
  }
}
const html = async (url: string) => {
  const r = await get(url);
  return r.ok ? r.text() : null;
};

const decode = (s: string) =>
  s
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>\s*<p[^>]*>/gi, '\n\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/[ \t]+/g, ' ')
    .trim();

interface Listed {
  no: number;
  slug: string;
  oldCat: string;
}

/** Crawl one old category listing (all pages) and return the items it links to. */
async function crawlCategory(oldCat: string): Promise<Listed[]> {
  const found = new Map<number, Listed>();
  for (let start = 0; start < 2000; start += PAGE) {
    const page = await html(`${BASE}/cs/ukazky-nasich-vyrobku/${oldCat}?start=${start}`);
    if (!page) break;
    const before = found.size;
    const re = new RegExp(`/cs/ukazky-nasich-vyrobku/${oldCat}/item/(\\d+)-([a-z0-9-]+)`, 'g');
    for (const m of page.matchAll(re)) {
      const no = Number(m[1]);
      if (!found.has(no)) found.set(no, { no, slug: m[2], oldCat });
    }
    if (found.size === before) break;
    await sleep(250);
  }
  return [...found.values()];
}

interface Scraped {
  title: string;
  text: string | null;
  fields: Record<string, string>;
  images: string[];
}

function parseItem(page: string): Scraped {
  const title = decode(page.match(/<h1 class="itemTitle">([\s\S]*?)<\/h1>/)?.[1] ?? '');
  const parts = [
    page.match(/class="itemIntroText">([\s\S]*?)<\/div>/)?.[1],
    page.match(/class="itemFullText">([\s\S]*?)<\/div>/)?.[1],
  ]
    .filter((x): x is string => !!x && !x.includes('falang-missing'))
    .map(decode)
    .filter(Boolean);
  const fields: Record<string, string> = {};
  for (const m of page.matchAll(
    /itemExtraFieldsLabel">([\s\S]*?)<\/span>\s*<span class="itemExtraFieldsValue">([\s\S]*?)<\/span>/g,
  )) {
    fields[decode(m[1]).replace(/:$/, '')] = decode(m[2]);
  }
  const images = new Set<string>();
  for (const m of page.matchAll(/href="(\/media\/k2\/items\/cache\/[a-f0-9]+_XL\.jpg)"/g)) images.add(m[1]);
  for (const m of page.matchAll(/(?:href|src)="(\/media\/k2\/galleries\/[^"]+\.(?:jpe?g|png))"/gi)) images.add(m[1]);
  return { title, text: parts.join('\n\n') || null, fields, images: [...images] };
}

/** Old titles often start with the category noun ("Odznak Kartonie"); the catalogue label already says that. */
const PREFIX = /^(?:odznaky?|medaile|opaskov[áa] spona|plaketa|p[řr][íi]v[ěe]sek(?: na kl[íi][čc]e)?|kl[íi][čc]enka|firemn[íi] [šs]t[íi]tek|[šs]t[íi]tek|figurka)\s+/i;
export const cleanTitle = (t: string) => {
  const rest = t.replace(PREFIX, '').trim();
  return rest ? rest.charAt(0).toUpperCase() + rest.slice(1) : t;
};

/** "LS - Opasková spona" → { title: "LS", suffix: "Opasková spona" } */
function splitTitle(raw: string) {
  const m = raw.match(/^(.*?)\s+[-–—]\s+(.*)$/);
  return m ? { title: cleanTitle(m[1].trim()), suffix: m[2].trim() } : { title: cleanTitle(raw.trim()), suffix: null };
}

const exists = (p: string) => access(p).then(() => true, () => false);

async function download(url: string, dest: string) {
  if (await exists(dest)) return false;
  const res = await get(url);
  if (!res.ok) return false;
  await mkdir(dirname(dest), { recursive: true });
  // Re-encode to keep the repo small; astro:assets makes AVIF/WebP from these at build time.
  const buf = await sharp(Buffer.from(await res.arrayBuffer()))
    .rotate()
    .resize({ width: 2400, height: 2400, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();
  await writeFile(dest, buf);
  return true;
}

const FINISH_LABEL = /povrch|surface|oberfl/i;

async function main() {
  const catByOld = new Map(products.products.map((p) => [p.oldCat, p.id]));
  const listed: Listed[] = [];
  for (const p of products.products) {
    const items = await crawlCategory(p.oldCat);
    console.log(`${p.oldCat}: ${items.length}`);
    listed.push(...items);
  }
  const byNo = new Map<number, Listed>();
  for (const l of listed) if (!byNo.has(l.no)) byNo.set(l.no, l);
  const todo = [...byNo.values()].filter((l) => !only || only.includes(l.no)).sort((a, b) => b.no - a.no);
  console.log(`items: ${todo.length}`);

  let written = 0;
  let images = 0;
  const failures: string[] = [];
  const queue = [...todo];
  const worker = async () => {
    for (let l = queue.shift(); l; l = queue.shift()) {
      try {
        const scraped: Partial<Record<OldLang, Scraped>> = {};
        const oldUrls: Record<string, string> = {};
        for (const lang of OLD_LANGS) {
          const url = `${BASE}/${lang}/ukazky-nasich-vyrobku/${l.oldCat}/item/${l.no}-${l.slug}`;
          const page = await html(url);
          if (!page) continue;
          oldUrls[lang] = url;
          scraped[lang] = parseItem(page);
        }
        const cs = scraped.cs ?? scraped.en ?? scraped.de;
        if (!cs) throw new Error('no page in any language');

        const file = join(ROOT, 'src/content/pieces', `${l.no}.json`);
        const prev = (await exists(file)) ? JSON.parse(await readFile(file, 'utf8')) : {};

        const imgs: { src: string; role: string; alt: Record<string, string | null> }[] = [];
        for (const [i, src] of cs.images.entries()) {
          const name = `${i + 1}.jpg`;
          if (await download(BASE + src, join(ROOT, 'src/assets/pieces', String(l.no), name))) images++;
          imgs.push({ src: `../../assets/pieces/${l.no}/${name}`, role: i === 0 ? 'obverse' : 'detail', alt: {} });
        }

        const { title, suffix } = splitTitle(cs.title);
        const finish: Record<string, string> = {};
        for (const lang of OLD_LANGS) {
          const f = scraped[lang] && Object.entries(scraped[lang]!.fields).find(([k]) => FINISH_LABEL.test(k));
          if (f) finish[lang] = f[1];
        }
        const story: Record<string, string | null> = {};
        // Short texts on the old site are notes ("zlatá vložka"), not stories.
        for (const lang of OLD_LANGS) {
          const t = scraped[lang]?.text ?? null;
          story[lang] = t && t.length >= 80 ? t : null;
        }

        // Hand edits win: only fill what is still empty.
        const keep = <T>(a: T | null | undefined, b: T) => (a === null || a === undefined ? b : a);
        const piece = {
          no: l.no,
          title: keep(prev.title, title),
          originalTitle: keep(prev.originalTitle, cs.title),
          category: keep(prev.category, catByOld.get(l.oldCat)!),
          client: prev.client ?? null,
          year: prev.year ?? null,
          metal: prev.metal ?? null,
          finish: keep(prev.finish, Object.keys(finish).length ? finish : null),
          sizeMm: prev.sizeMm ?? null,
          series: prev.series ?? null,
          note: keep(prev.note, cs.text && cs.text.length < 80 ? cs.text : null),
          story: { ...story, ...Object.fromEntries(Object.entries(prev.story ?? {}).filter(([, v]) => v)) },
          images: prev.images?.length ? prev.images : imgs,
          clientNamePublishable: prev.clientNamePublishable ?? null,
          oldUrls: { ...oldUrls, ...(prev.oldUrls ?? {}) },
          migrated: { at: new Date().toISOString().slice(0, 10), oldCat: l.oldCat, slug: l.slug, titleSuffix: suffix },
        };
        await mkdir(dirname(file), { recursive: true });
        await writeFile(file, JSON.stringify(piece, null, 2) + '\n');
        written++;
        if (written % 25 === 0) console.log(`  ${written}/${todo.length}`);
      } catch (e) {
        failures.push(`${l.no}: ${(e as Error).message}`);
      }
    }
  };
  await Promise.all(Array.from({ length: 4 }, worker));

  console.log(`\nwritten ${written} pieces, downloaded ${images} new images`);
  if (failures.length) {
    console.log(`failures (${failures.length}):\n  ${failures.join('\n  ')}`);
    process.exitCode = 1;
  }
}

// Run only when executed directly (cleanTitle is also imported by one-off scripts).
if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) main();
