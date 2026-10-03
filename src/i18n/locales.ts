export const LOCALES = ['en', 'de', 'cs', 'pl', 'fr', 'it'] as const;
export type Lang = (typeof LOCALES)[number];
export const DEFAULT_LANG: Lang = 'en';

/** Native names, shown in the language dropdown. */
export const LANG_NAMES: Record<Lang, string> = {
  en: 'English',
  de: 'Deutsch',
  cs: 'Čeština',
  pl: 'Polski',
  fr: 'Français',
  it: 'Italiano',
};

/** BCP 47 tags for <html lang>, hreflang and og:locale. */
export const LANG_TAGS: Record<Lang, { html: string; og: string }> = {
  en: { html: 'en', og: 'en_GB' },
  de: { html: 'de', og: 'de_DE' },
  cs: { html: 'cs', og: 'cs_CZ' },
  pl: { html: 'pl', og: 'pl_PL' },
  fr: { html: 'fr', og: 'fr_FR' },
  it: { html: 'it', og: 'it_IT' },
};

export const isLang = (x: string | undefined): x is Lang => !!x && (LOCALES as readonly string[]).includes(x);
