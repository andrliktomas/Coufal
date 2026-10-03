# medaile-odznaky.cz

New website for **CRdesign** (Richard Coufal, Brno): spin-cast medals, badges, belt buckles and small castings in tin and zinc. Astro static site on Cloudflare Pages. The brief and the approved design live in `CLAUDE.md`, `design/` and `content/`.

## Run it

```sh
npm install
npm run dev          # http://localhost:4321 (Astro only, no Functions)
npm run build        # astro build + scripts/postbuild.ts → dist/
npm run preview      # wrangler pages dev dist — static site + Functions; needs .dev.vars (see .dev.vars.example)
npm run check        # astro check (types)
npm run migrate      # re-crawl the old site into src/content/pieces (idempotent)
```

Node 22+.

## Structure

| Path | What |
|---|---|
| `src/pages/[...path].astro` | One router for every localized page. Slugs are translated per locale, so all URLs come from `src/i18n/routes.ts`. |
| `src/views/` | Home, Archive (also category pages), Piece, Quote, Privacy. |
| `src/components/` | Header, language switch, footer, hero medal, process, tiles, photos. |
| `src/i18n/` | `locales.ts`, `routes.ts` (slugs + URL builder/parser), `ui.ts` (all UI strings, EN source + drafts). Hero/nav strings are in `content/i18n.hero.json`. |
| `src/content/pieces/{no}.json` | One file per catalogue piece (702, migrated). Photos in `src/assets/pieces/{no}/`. |
| `content/` | Brief data: `company.json`, `products.json` (categories + MOQ), seed list. |
| `functions/` | Cloudflare Pages Functions (see below). |
| `scripts/migrate.ts` | Crawls the old Joomla/K2 catalogue (cs/en/de), downloads and re-encodes photos, writes piece JSON. Hand edits in the JSON are never overwritten. |
| `scripts/postbuild.ts` | Writes `dist/_redirects`, `dist/_routes.json`, `dist/_headers` and `functions/_lib/legacy-map.json`. |
| `TODO-CLIENT.md` | Every placeholder and open question for the client. |

### Editing content

- **A piece**: edit `src/content/pieces/677.json`. Fill `year`, `metal`, `sizeMm`, `series`, `client` (+ `clientNamePublishable: true` to show it) and `story` per language (`{"cs": "…", "en": "…"}`; missing languages fall back to EN, then CS). Add photos to `src/assets/pieces/677/` and list them in `images` with a `role` (`obverse | reverse | detail | in-use`) and optional `alt` per language.
- **UI text**: `src/i18n/ui.ts`. Anything in `[square brackets]` renders as a visible placeholder.
- **Categories / minimum order**: `content/products.json` (index + category pages) and `src/lib/quote-config.ts` (quote form minimums, shared with the Function).

## URLs

```
/                                   → 302 to the best language (functions/index.ts, Accept-Language)
/{lang}/                            home
/{lang}/{archive}/                  archive        (archive | archiv | archiwum | archives | archivio)
/{lang}/{archive}/{category}/       category page
/{lang}/{archive}/{category}/{no}-{slug}/   piece, e.g. /en/archive/medals/677-zbrojovka-brno/
/{lang}/{quote}/                    quote form     (quote | anfrage | poptavka | wycena | devis | preventivo)
/{lang}/privacy/                    privacy policy
/og/{no}.jpg                        social card per piece
```

Old Joomla URLs redirect with 301:
- Czech items, categories and `/poptavka`: static rules in `dist/_redirects` (generated from `oldUrls`).
- English and German catalogue URLs: `functions/{en,de}/ukazky-nasich-vyrobku/[[path]].ts`. All three languages together would exceed Cloudflare's limit of 2,000 static redirect rules.

## Functions and environment

| Name | Kind | Used by |
|---|---|---|
| `QUOTE_UPLOADS` | R2 binding (bucket `crdesign-quote-uploads`, see `wrangler.toml`) | `/api/quote` stores artwork; `/api/files/*` serves it |
| `TURNSTILE_SECRET_KEY` | secret | `/api/quote` |
| `PUBLIC_TURNSTILE_SITE_KEY` | build variable | quote page widget (defaults to Cloudflare's always-pass test key) |
| `QUOTE_WEBHOOK_URL` | secret | Make.com custom webhook |
| `QUOTE_WEBHOOK_SECRET` | secret, optional | sent as `X-Quote-Secret`; check it in the Make scenario |
| `FILE_LINK_SECRET` | secret | signs 30-day download links to uploaded files |
| `PUBLIC_ORIGIN` | variable, optional | origin used in those links (default: request origin) |
| `SITE_URL` | build variable | canonical/hreflang/sitemap origin (default `https://medaile-odznaky.pages.dev`) |

The webhook receives JSON like this:

```json
{
  "id": "uuid", "receivedAt": "2026-10-03T10:00:00Z", "lang": "de",
  "type": "medals", "minimum": 20, "quantity": 150, "reference": "No. 677",
  "description": "…", "neededBy": "2026-12-01", "country": "Deutschland",
  "name": "…", "email": "…",
  "files": [{ "name": "logo.pdf", "size": 12345, "type": "application/pdf", "key": "quotes/2026-10-03/<id>/1-logo.pdf", "url": "https://…/api/files/…?exp=…&sig=…" }],
  "filesExpireAt": "…", "page": "…", "userAgent": "…", "ipCountry": "DE"
}
```

Suggested Make scenario: *Webhooks → Custom webhook* → filter on the `x-quote-secret` header → *Email* to the workshop (reply-to = `email`) → optionally create a lead in the CRM.

## Deployment (Cloudflare Pages)

Nothing has been created online yet. To set it up:

1. **R2**: create the bucket `crdesign-quote-uploads` (EU jurisdiction recommended). Optionally add a lifecycle rule that deletes `quotes/` objects after the retention period.
2. **Turnstile**: add a widget for `*.pages.dev` (and later the domain). Note the site key and the secret.
3. **Pages**: *Workers & Pages → Create → Pages → Connect to Git* → this repo. Framework preset: Astro. Build command `npm run build`. Output `dist`. Set the environment variable `NODE_VERSION=22`.
4. **Settings → Bindings**: R2 bucket `QUOTE_UPLOADS` → `crdesign-quote-uploads`.
5. **Settings → Variables and Secrets**: the table above (`PUBLIC_TURNSTILE_SITE_KEY` and `SITE_URL` as plain build variables).
6. **Build cache** (Settings → Build): enable it so the processed images (`node_modules/.astro`) are reused between builds.
7. Every branch gets a preview URL. When the domain is ready, add it under *Custom domains*, set `SITE_URL` and rebuild.
