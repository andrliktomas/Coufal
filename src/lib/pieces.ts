import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n/locales';
import { pathFor, pieceSlug, type CategoryId, type Route } from '../i18n/routes';
import { t } from '../i18n/ui';

export type Piece = CollectionEntry<'pieces'>['data'];

let cache: Piece[] | null = null;

/** All pieces, newest (highest number) first. */
export async function allPieces(): Promise<Piece[]> {
  if (!cache) cache = (await getCollection('pieces')).map((e) => e.data).sort((a, b) => b.no - a.no);
  return cache;
}

export const pieceRoute = (p: Piece): Extract<Route, { type: 'piece' }> => ({
  type: 'piece',
  category: p.category,
  no: p.no,
  slug: pieceSlug(p.no, p.title),
});

export const pieceUrl = (p: Piece, lang: Lang) => pathFor(pieceRoute(p), lang);

export const byNo = async (no: number) => (await allPieces()).find((p) => p.no === no);

export const inCategory = async (c: CategoryId) => (await allPieces()).filter((p) => p.category === c);

/** Localized value with sensible fallbacks (EN, then CS, then whatever exists). */
export function pick(v: string | Record<string, string | null> | null | undefined, lang: Lang): string | null {
  if (!v) return null;
  if (typeof v === 'string') return v;
  return v[lang] ?? v.en ?? v.cs ?? v.de ?? Object.values(v).find(Boolean) ?? null;
}

const NO: Record<Lang, string> = { en: 'No.', de: 'Nr.', cs: 'č.', pl: 'nr', fr: 'n°', it: 'n.' };
/** "No. 677" in the visitor's language. */
export const numLabel = (no: number, lang: Lang) => `${NO[lang]} ${no}`;

export function altFor(p: Piece, i: number, lang: Lang): string {
  const img = p.images[i];
  const own = img?.alt[lang];
  if (own) return own;
  const u = t(lang);
  const role = img ? `, ${u.piece.roles[img.role]}` : '';
  return `${u.cat[p.category].singular} ${numLabel(p.no, lang)} — ${p.title}${role}`;
}

/** Catalogue label under a tile: "Medal · [year] · [metal]" — placeholders stay visible until the client fills them. */
export function labelFor(p: Piece, lang: Lang, withMetal = false): string {
  const u = t(lang);
  const parts = [u.cat[p.category].singular, p.year ? String(p.year) : u.common.year];
  if (withMetal) parts.push(p.metal ?? u.common.metal);
  return parts.join(' · ');
}

/** Next free catalogue number, used in the process illustration. */
export const nextNo = async () => Math.max(...(await allPieces()).map((p) => p.no)) + 1;
