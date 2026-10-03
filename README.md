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
| `QUOTE_UPLOADS` | R2 binding to the bucket `crdesign-quote-uploads` (Pages → Settings → Bindings) | `/api/quote` stores artwork; `/api/files/*` serves it |
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

## Deployment (Cloudflare Workers)

The project runs as a **Worker with static assets** (`wrangler.jsonc`, entry `worker/index.ts`), which is what the Cloudflare dashboard creates by default. The Worker serves `dist/` and runs the same handlers as `functions/` (kept so the repo also works as a Pages project).

- Dashboard → Workers & Pages → the `coufal` Worker → Settings → Build: build command `npm run build`, deploy command `npx wrangler deploy`.
- Settings → Variables and Secrets: `TURNSTILE_SECRET_KEY`, `QUOTE_WEBHOOK_URL`, `QUOTE_WEBHOOK_SECRET`, `FILE_LINK_SECRET` (secrets); `SITE_URL`, `PUBLIC_TURNSTILE_SITE_KEY` (build variables).
- R2: enable R2 on the account, create `crdesign-quote-uploads`, then add the `r2_buckets` block noted in `wrangler.jsonc`. Until then the site works; only quote requests with attachments fail.
- `SITE_URL` must be the public URL (e.g. `https://coufal.<account>.workers.dev`, later the domain), otherwise canonical, hreflang and sitemap point elsewhere.
