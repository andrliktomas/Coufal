/**
 * Translated URL slugs and the single place that builds and parses URLs.
 * Everything here is plain TS with no Astro imports, so astro.config and the
 * build scripts can use it as well.
 */
import { LOCALES, type Lang } from './locales';

export const CATEGORY_IDS = ['medals', 'plaques', 'badges', 'buckles', 'key-fobs', 'figures', 'labels', 'other'] as const;
export type CategoryId = (typeof CATEGORY_IDS)[number];

export const ARCHIVE_SLUG: Record<Lang, string> = {
  en: 'archive',
  de: 'archiv',
  cs: 'archiv',
  pl: 'archiwum',
  fr: 'archives',
  it: 'archivio',
};

export const QUOTE_SLUG: Record<Lang, string> = {
  en: 'quote',
  de: 'anfrage',
  cs: 'poptavka',
  pl: 'wycena',
  fr: 'devis',
  it: 'preventivo',
};

export const PRIVACY_SLUG: Record<Lang, string> = {
  en: 'privacy',
  de: 'privacy',
  cs: 'privacy',
  pl: 'privacy',
  fr: 'privacy',
  it: 'privacy',
};

export const CATEGORY_SLUG: Record<CategoryId, Record<Lang, string>> = {
  medals: { en: 'medals', de: 'medaillen', cs: 'medaile', pl: 'medale', fr: 'medailles', it: 'medaglie' },
  plaques: { en: 'plaques', de: 'plaketten', cs: 'plakety', pl: 'plakiety', fr: 'plaques', it: 'placche' },
  badges: { en: 'badges', de: 'abzeichen', cs: 'odznaky', pl: 'odznaki', fr: 'insignes', it: 'distintivi' },
  buckles: { en: 'belt-buckles', de: 'guertelschnallen', cs: 'opaskove-spony', pl: 'klamry', fr: 'boucles-de-ceinture', it: 'fibbie' },
  'key-fobs': { en: 'key-fobs', de: 'schluesselanhaenger', cs: 'privesky-na-klice', pl: 'breloki', fr: 'porte-cles', it: 'portachiavi' },
  figures: { en: 'figures', de: 'figuren', cs: 'figurky', pl: 'figurki', fr: 'figurines', it: 'figure' },
  labels: { en: 'company-labels', de: 'firmenschilder', cs: 'firemni-stitky', pl: 'tabliczki-firmowe', fr: 'etiquettes', it: 'targhette' },
  other: { en: 'other-castings', de: 'sonstiges', cs: 'ostatni-vyrobky', pl: 'inne', fr: 'autres', it: 'altro' },
};

/** Descriptor of a page, independent of language. */
export type Route =
  | { type: 'home' }
  | { type: 'archive' }
  | { type: 'category'; category: CategoryId }
  | { type: 'piece'; category: CategoryId; no: number; slug: string }
  | { type: 'quote' }
  | { type: 'privacy' };

export function slugify(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/ß/g, 'ss')
    .replace(/ł/g, 'l')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export const pieceSlug = (no: number, title: string) => [String(no), slugify(title)].filter(Boolean).join('-');

/** Path with leading and trailing slash, e.g. /en/archive/medals/677-zbrojovka-brno/ */
export function pathFor(route: Route, lang: Lang): string {
  switch (route.type) {
    case 'home':
      return `/${lang}/`;
    case 'archive':
      return `/${lang}/${ARCHIVE_SLUG[lang]}/`;
    case 'category':
      return `/${lang}/${ARCHIVE_SLUG[lang]}/${CATEGORY_SLUG[route.category][lang]}/`;
    case 'piece':
      return `/${lang}/${ARCHIVE_SLUG[lang]}/${CATEGORY_SLUG[route.category][lang]}/${route.slug}/`;
    case 'quote':
      return `/${lang}/${QUOTE_SLUG[lang]}/`;
    case 'privacy':
      return `/${lang}/${PRIVACY_SLUG[lang]}/`;
  }
}

export const alternatesFor = (route: Route) =>
  Object.fromEntries(LOCALES.map((l) => [l, pathFor(route, l)])) as Record<Lang, string>;

/** Reverse of pathFor. Pieces come back with slug but without verifying the piece exists. */
export function parsePath(path: string): { lang: Lang; route: Route } | null {
  const parts = path.split('/').filter(Boolean);
  const lang = parts[0] as Lang;
  if (!LOCALES.includes(lang)) return null;
  if (parts.length === 1) return { lang, route: { type: 'home' } };
  if (parts[1] === QUOTE_SLUG[lang] && parts.length === 2) return { lang, route: { type: 'quote' } };
  if (parts[1] === PRIVACY_SLUG[lang] && parts.length === 2) return { lang, route: { type: 'privacy' } };
  if (parts[1] !== ARCHIVE_SLUG[lang]) return null;
  if (parts.length === 2) return { lang, route: { type: 'archive' } };
  const category = CATEGORY_IDS.find((c) => CATEGORY_SLUG[c][lang] === parts[2]);
  if (!category) return null;
  if (parts.length === 3) return { lang, route: { type: 'category', category } };
  const m = parts[3].match(/^(\d+)/);
  if (parts.length === 4 && m) return { lang, route: { type: 'piece', category, no: Number(m[1]), slug: parts[3] } };
  return null;
}
