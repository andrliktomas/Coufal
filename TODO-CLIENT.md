# Otevřené otázky pro klienta (CRdesign — Richard Coufal)

Vše, co je na webu v `[hranatých závorkách]`, je neznámý údaj. Na stránkách je vidět jako šedý čárkovaný štítek, aby se omylem nespustil naostro. Až přijde odpověď, opravte text na místě uvedeném v závorce a štítek zmizí sám.

## Firma a obchodní podmínky (`content/company.json → toConfirm`)

- [ ] **IČO / DIČ (VAT ID)** — patička na úvodní stránce a stránka Ochrana údajů (`src/components/Footer.astro`, `src/i18n/ui.ts → privacy`).
- [ ] **Dodací lhůta** — FAQ „Jak dlouho trvá výroba?“ (`ui.ts → home.faq`, všechny jazyky).
- [ ] **Země a podmínky dopravy** — FAQ „Posíláte i mimo ČR?“ (`ui.ts → home.faq`).
- [ ] **Jak rychle odpovídáte na poptávku** — „[within X working days]“ v boxu „Co bude dál“ na stránce poptávky (`ui.ts → quote.next`).
- [ ] **Jména kterých klientů smíme zveřejnit** — u každého kusu `client` + `clientNamePublishable: true` v `src/content/pieces/{č}.json`. Dokud to není potvrzené, ukazuje se „[confirm]“.
- [ ] **Doména a přístup k DNS** pro medaile-odznaky.cz (web zatím běží na `*.pages.dev`).
- [ ] **E-mail pro poptávky** — zůstat u coufalcr@centrum.cz, nebo nová schránka na doméně? (Make.com scénář, patička, Ochrana údajů.)
- [ ] **Jak dlouho uchovávat poptávky**, které nevedou k objednávce — „[retention period — to be confirmed]“ na stránce Ochrana údajů.
- [ ] **Minimální série u plaket a firemních štítků** — teď „na dotaz“ (`content/products.json → moq: null`).

## Texty a značka

- [ ] **Logo ve vektoru (SVG)** — teď se používá PNG z `design/assets/*-placeholder.png`.
- [ ] **„25 let u ponku“** — číslo se počítá od založení firmy (2001). Odlévání je až od roku 2004 (22 let), proto návrh „25 let lití“ jsme přeformulovali. Potvrdit formulaci.
- [ ] **Kontrola překladů rodilým mluvčím**: DE, PL, FR, IT (a CS). Všechny jsou koncepty (`needsReview` v `src/i18n/ui.ts`, `_note` v `content/i18n.hero.json`).
- [ ] **Názvy kusů** — při migraci jsme odstranili předponu („Odznak Kartonie“ → „Kartonie“). Projít a případně opravit v `src/content/pieces/*.json` (pole `title`, původní název je v `originalTitle`).

## Fotografie

- [ ] **6 fotek z dílny** do posuvného pásu na úvodní stránce: licí stroj, pryžové formy, ruční malba, surový odlitek vs. hotový, galvanická lázeň, zabalená série.
- [ ] **Další fotky kusů** (rub, makro detail, kus v použití). Ze starého webu je u většiny kusů jen jedna fotka a ta má vodoznak „CR design“.
- [ ] Priorita: kusy na úvodní stránce — č. **677, 727, 642, 733, 676, 643**.

## Údaje o kusech (702 kusů, `src/content/pieces/{č}.json`)

U všech kusů chybí (na webu jako placeholder): **rok** (`year`), **kov** (`metal`: cín / zinek), **rozměr** (`sizeMm`), **velikost série** (`series`), **klient** (`client`). Povrchová úprava (`finish`) se převzala ze starého webu u 404 kusů.

- [ ] **Příběh zakázky** (120–200 slov, `story.cs` / `story.en` …): komu byla, k jaké příležitosti, co návrh zobrazuje, co bylo technicky zajímavé. Jsou to unikátní texty, díky kterým se stránky kusů najdou ve vyhledávačích. Dokud příběh chybí, zobrazuje se krátký obecný text a štítek „[Story of the commission — to be written with the client.]“.

## Provoz (pro nás, ne pro klienta)

- [ ] Založit projekt Cloudflare Pages, R2 bucket, klíče Turnstile a Make.com scénář — viz README → Nasazení.
