/** "/" → the visitor's best language from Accept-Language, falling back to /en/. */
import { LOCALES, DEFAULT_LANG, type Lang } from '../src/i18n/locales';

// Neighbouring languages that read one of ours comfortably.
const ALIASES: Record<string, Lang> = { sk: 'cs', at: 'de' };

export function bestLang(header: string | null): Lang {
  if (!header) return DEFAULT_LANG;
  const ranked = header
    .split(',')
    .map((part) => {
      const [tag, ...params] = part.trim().split(';');
      const q = params.map((p) => p.trim()).find((p) => p.startsWith('q='));
      return { tag: tag.toLowerCase(), q: q ? Number(q.slice(2)) || 0 : 1 };
    })
    .filter((x) => x.tag && x.q > 0)
    .sort((a, b) => b.q - a.q);
  for (const { tag } of ranked) {
    const base = tag.split('-')[0];
    if ((LOCALES as readonly string[]).includes(base)) return base as Lang;
    if (ALIASES[base]) return ALIASES[base];
  }
  return DEFAULT_LANG;
}

export const onRequestGet: PagesFunction = ({ request }) => {
  const url = new URL(request.url);
  const lang = bestLang(request.headers.get('accept-language'));
  return new Response(null, {
    status: 302,
    headers: {
      location: `${url.origin}/${lang}/${url.search}`,
      vary: 'Accept-Language',
      'cache-control': 'private, max-age=0',
    },
  });
};
