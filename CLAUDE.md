# medaile-odznaky.cz — new website for CRdesign

You are building the production website for **CRdesign** (Richard Coufal, Brno), a family workshop that spin-casts medals, badges, belt buckles and other small castings in tin and zinc. It replaces the old Joomla site at https://www.medaile-odznaky.cz and targets clients across Europe.

The visual design is **already approved**. Your job is to implement it faithfully, not to redesign it. The source of truth is `design/artboards/*.dc.html` (see "Reading the design files").

## Stack and hosting

- **Astro** (latest stable), static output. Vanilla CSS with custom properties, no Tailwind, no UI framework.
- Interactive parts are small vanilla TypeScript modules (`<script>` in Astro components). No React/Vue islands needed.
- **GitHub** repo → **Cloudflare Pages** (build `npm run build`, output `dist`). Every branch gets a preview URL.
- Quote form: **Cloudflare Pages Function** at `functions/api/quote.ts` + **Turnstile** + artwork uploads to **R2**.
- Fonts are **self-hosted** via `@fontsource` packages (Google Fonts loaded from Google servers is a GDPR problem in the EU).
- The domain is not connected yet. Launch on the `*.pages.dev` URL first.

## Reading the design files

`design/artboards/` holds four artboards from the design canvas: `Main` (home), `Archive`, `Piece` (detail of one piece) and `Quote`. They use a small template runtime, so they will not run on their own. Read them as markup and logic specs:

- `{{name}}` is a value computed in the `renderVals()` method at the bottom of each file.
- `<sc-for list="{{items}}" as="x">` is a loop and `<sc-if value="{{cond}}">` is a conditional.
- `onClick="{{fn}}"` and similar attributes are event handlers defined in `renderVals()`.
- `<helmet><style>` holds the global CSS: animations, hover states, media queries. Port it.
- `/_blob/...` image URLs are the logo. Use `design/assets/` instead.
- Inline `style="…"` carries the exact spacing, sizes and colours. Convert these to classes and tokens, keeping the values.

`design/assets/current-site-mobile-screenshot.jpg` shows the client's current site (slate header, silver logo). That is where the palette comes from.

## Design tokens (keep exactly)

| Token | Value | Use |
|---|---|---|
| `--paper` | `#F6F6F4` | page background |
| `--paper-2` | `#ECEDEB` | alternate band |
| `--ink` | `#38414A` | client's slate: body text, dark bands, buttons |
| `--ink-deep` | `#2B3138` | footer |
| `--black` | `#14181C` | headlines |
| `--muted` | `#5E6873` | secondary text (passes 4.5:1 on paper) |
| `--line` | `#C9CED4` | hairlines, silver from the logo |
| `--silver` | `#E6E7EB` | outlined type on dark |
| photo placeholder tones | `#D3D8DD #DDE1E5 #E2E5E8 #CDD3D9 #DADEE2 #D6DBE0` | |

Typefaces:
- **Bodoni Moda** (display, normal + italic) for all headings, piece numbers and outlined type.
- **Montserrat** (body). It is the client's current font, so keep it.
- **IBM Plex Mono** for catalogue labels.

The headline scale is fluid with `clamp()`, as in the artboards. Keep the very large sizes; they carry the design.

## Information architecture and URLs

Locales: `en`, `de`, `cs`, `pl`, `fr`, `it`. Use Astro i18n routing with a prefix on every locale. `/` redirects to the visitor's best language via a Pages Function reading `Accept-Language`, falling back to `/en/`. Slugs are translated.

```
/{lang}/                                   home
/{lang}/{archive}/                         archive, all pieces (archive|archiv|archiwum|archives|archivio)
/{lang}/{archive}/{category}/              category landing page (SEO)
/{lang}/{archive}/{category}/{no}-{slug}/  piece detail, e.g. /en/archive/medals/677-zbrojovka-brno/
/{lang}/{quote}/                           quote request (quote|anfrage|poptavka|wycena|devis|preventivo)
/{lang}/privacy/                           privacy policy (GDPR, the form collects personal data)
```

Category slugs per locale go in `src/i18n/routes.ts`.

## Content model (Astro content collections)

- `src/content/pieces/{no}.json` holds one file per piece. Seed it from `content/pieces.seed.json` with these fields: `no`, `title`, `category`, `client`, `year`, `metal`, `finish`, `sizeMm`, `series`, `story` (per locale), `images[]` (with `alt` per locale and a `role` of `obverse|reverse|detail|in-use`), `clientNamePublishable`, `oldUrls`.
- `content/products.json` holds the categories and minimum order quantities (MOQ). These come from the current quote form.
- `content/company.json` holds facts and contact details. Its `toConfirm` list is everything still to be confirmed with the client.
- `content/i18n.hero.json` holds the hero and nav strings in all 6 languages.
- All other UI strings: write them in English, then draft DE/CS/PL/FR/IT and mark them `needsReview`. Put them in `src/i18n/ui.ts`.

Placeholders shown in `[square brackets]` in the design are unknown facts. Never invent them. Render them as visible placeholders and collect them in `TODO-CLIENT.md`.

## Pages and components (match the artboards)

### Home (`Main.dc.html`)
1. **Header**: logo, nav with an animated underline on hover, the **language dropdown** and a quote button. The dropdown is a button with a globe icon showing the current code and name. It opens a listbox with native language names and marks the current one. It needs full keyboard support (Enter, Space, arrows, Esc), closes on outside click, and navigates to the same page in the chosen locale.
2. **Hero**:
   - The headline reveals line by line from behind a mask on load.
   - The last phrase cycles every 2.6 s with a flip animation, using the localized `words` list.
   - The **engraved medal** is an SVG with a guilloché rosette, a rim text that rotates slowly (120 s) and the logo in the centre.
   - The medal tilts in 3D toward the pointer and a soft-light shine follows the cursor.
   - Clicking it flips to the reverse: a laurel wreath, "MMI" and "BRNO · CZ".
   - It must work as a real `<button>` with an `aria-label`. On touch devices, tap flips it and there is no tilt.
3. **Marquee**: outlined italic product names scrolling infinitely. It pauses on hover and fills a word on hover.
4. **Editorial paragraph** with inline photo "chips". These become small cropped photos of real pieces.
5. **Selected commissions wall**: an asymmetric 12-column layout with offsets (`.w-a`…`.w-f`).
   - Photos zoom on hover, "View" slides in, and labels follow a museum-label style.
   - It uses scroll-driven reveal and parallax inside `@supports (animation-timeline: view())`, with no-JS fallback = visible.
6. **Index**: a typographic list of the 8 product families with their MOQ. Each row inverts on hover. A floating photo preview follows the cursor (desktop and fine-pointer only).
7. **Process "From line to metal"**: 5 steps that auto-advance every 4.6 s with a progress bar. Clicking a step pins it. An SVG builds up as the steps advance:
   - the sketch draws itself;
   - the mould ring appears;
   - molten metal rises and fills the disc;
   - the guilloché pattern and a sweep shine appear;
   - a "Ready to ship" tag slides in.
8. **Studio**: an outlined "25" for years of casting, the story with a drop cap, and a horizontal scroll-snap strip of workshop photos.
9. **FAQ** uses `<details>` with a rotating "+". Add FAQPage JSON-LD.
10. **CTA band** with a rotating rim-text medal.
11. **Footer** with a giant outlined wordmark that fills on hover.
12. **Film grain overlay**: an SVG `feTurbulence`, fixed position, about 7 % opacity, `pointer-events: none`.

### Archive (`Archive.dc.html`)
- A huge title with the piece count as a superscript.
- A sticky filter bar by category with counts. Filtering is client-side; also update the URL to the category page.
- A CSS-columns masonry grid of museum-labelled tiles.
- The not-for-sale note.
- Each category also gets its own static page with an intro text (SEO).

### Piece detail (`Piece.dc.html`)
- A giant outlined piece number behind the title.
- A gallery (obverse, reverse, macro detail, in use) with a lightbox and zoom.
- The story, with a drop cap.
- A spec table (`dl`).
- A CTA "Something like this?" that links to the quote form with `?ref=677` prefilled.
- "More medals" (same category), and BreadcrumbList JSON-LD.

### Quote (`Quote.dc.html`)
- Product type as large toggle tiles. The selection drives the `min` value of the quantity field and its helper text: buckles 10, key fobs 20, badges 20, medals 20, figures 30, other 10.
- Fields: description, quantity, reference piece number (prefilled from `?ref=`), multi-file artwork upload (PDF/AI/SVG/PNG/JPG, at most 20 MB total), needed-by date, delivery country, name and company, email, plus a privacy consent line.
- Submit goes to `POST /api/quote`. That function verifies Turnstile, stores the files in R2, then forwards a JSON payload to `QUOTE_WEBHOOK_URL` (a Make.com scenario that emails the workshop and can log the lead in a CRM). Configure everything via environment variables and never hard-code secrets.
- Success and error states are inline and localized. An error says what went wrong and how to fix it.

## SEO requirements

- Every page has a unique `<title>` and meta description per locale, a canonical URL, `hreflang` alternates for all 6 locales plus `x-default`, and Open Graph and Twitter tags. Generate an OG image per piece.
- Use `@astrojs/sitemap` with i18n, plus `robots.txt`.
- JSON-LD:
  - `Organization` + `LocalBusiness` (address, phone, `foundingDate` 2001) on home;
  - `VisualArtwork` or `CreativeWork` per piece (not `Product`, because pieces are not for sale);
  - `BreadcrumbList`;
  - `FAQPage`.
- **301 redirects** from every old Joomla URL to the new one go in `public/_redirects`, generated from `oldUrls`. The patterns are `/{cs|en|de}/ukazky-nasich-vyrobku/{oldCat}/item/{id}-{slug}`, the category pages and `/poptavka`.
- Use semantic HTML: one `h1` per page and a logical heading order.
- Images go through `astro:assets` as AVIF/WebP with `srcset`. The hero LCP image is preloaded and everything else is lazy-loaded. Alt texts are written per locale.

## Motion and accessibility rules

- Respect `prefers-reduced-motion`: disable all animation, auto-advance and the word cycler.
- Every interactive element is a real `button`, `a` or `input` with a visible focus ring. Touch targets are at least 44 px.
- Text contrast is at least 4.5:1 (3:1 for text 24 px and above). The token palette already passes.
- Pages are fully usable without JS; JS only enhances.
- The layout works from 360 px up, following the mobile rules in the artboards' media queries.

## Content migration

Write `scripts/migrate.ts`, which crawls the old site's category listings (`/{cs,en,de}/ukazky-nasich-vyrobku/{oldCat}`, paginated). For each K2 item it collects the number, title and description, and downloads the full-size images into `src/assets/pieces/{no}/`. It writes or updates `src/content/pieces/{no}.json` and is idempotent. Run it once, commit the result and report the item count.

## Definition of done (phase 1)

1. The repo builds and is deployed to Cloudflare Pages preview.
2. All 4 page types render in all 6 locales; the language dropdown switches locale on the same page.
3. All interactions from the artboards work, including reduced-motion behaviour.
4. Lighthouse scores on mobile, home and piece page: Performance ≥ 90, Accessibility ≥ 95, SEO 100.
5. Redirects, sitemap, hreflang and JSON-LD all validate.
6. `TODO-CLIENT.md` lists every placeholder and open question (start from `company.json → toConfirm`).

Work in small commits. After each milestone, run the build and a quick visual check against the artboards.
