import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { LOCALES, LANG_TAGS, DEFAULT_LANG } from './src/i18n/locales';
import { alternatesFor, parsePath } from './src/i18n/routes';

// Production URL. Set SITE_URL in Cloudflare Pages once the domain is connected.
const site = process.env.SITE_URL || 'https://medaile-odznaky.pages.dev';

export default defineConfig({
  site,
  output: 'static',
  devToolbar: { enabled: false },
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  image: {
    // ~760 photos × a few widths: a low AVIF effort keeps the Cloudflare build well under its time limit.
    service: { entrypoint: 'astro/assets/services/sharp', config: { avif: { effort: 2, quality: 55 }, webp: { quality: 78, effort: 4 } } },
  },
  integrations: [
    sitemap({
      filter: (page) => !/\/404\/?$/.test(page) && new URL(page).pathname !== '/',
      // Slugs are translated, so hreflang alternates come from our route table, not from swapping the prefix.
      serialize(item) {
        const parsed = parsePath(new URL(item.url).pathname);
        if (!parsed) return item;
        const alts = alternatesFor(parsed.route);
        item.links = [
          ...LOCALES.map((l) => ({ lang: LANG_TAGS[l].html, url: site + alts[l] })),
          { lang: 'x-default', url: site + alts[DEFAULT_LANG] },
        ];
        return item;
      },
    }),
  ],
});
