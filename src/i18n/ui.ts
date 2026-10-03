/**
 * UI strings. English is the source; DE/CS/PL/FR/IT are machine-assisted drafts
 * that need a native-speaker review before launch (see `needsReview`).
 *
 * Text in [square brackets] is a fact we do not know yet. It is rendered as a
 * visible placeholder and listed in TODO-CLIENT.md. Never replace it with a guess.
 *
 * Inline markup used in some strings:
 *   *word*        → <em>word</em>
 *   {chip:677}    → small cropped photo of piece No. 677 (editorial paragraph)
 */
import type { Lang } from './locales';
import type { CategoryId } from './routes';

export const needsReview: Record<Lang, boolean> = {
  en: false,
  de: true,
  cs: true,
  pl: true,
  fr: true,
  it: true,
};

type Cat = { plural: string; singular: string; desc: string; intro: string };

export interface UI {
  meta: {
    homeTitle: string;
    homeDesc: string;
    archiveTitle: string;
    archiveDesc: string;
    categoryTitle: (plural: string) => string;
    categoryDesc: (plural: string, count: number) => string;
    pieceTitle: (no: number, title: string, singular: string) => string;
    pieceDesc: (no: number, title: string, singular: string) => string;
    quoteTitle: string;
    quoteDesc: string;
    privacyTitle: string;
    privacyDesc: string;
    notFoundTitle: string;
  };
  common: {
    skip: string;
    home: string;
    language: string;
    mainNav: string;
    menu: string;
    menuClose: string;
    breadcrumb: string;
    view: string;
    notForSale: string;
    notForSaleShort: string;
    privacy: string;
    photoOf: (no: number) => string;
    pcs: (n: number) => string;
    from: (n: number) => string;
    onRequest: string;
    year: string;
    metal: string;
  };
  cat: Record<CategoryId, Cat>;
  home: {
    utilRight: string;
    medalLabel: string;
    medalReverseLabel: string;
    heroMeta: [string, string];
    editorial: string;
    wallTitle: [string, string];
    wallLink: string;
    indexTitle: string;
    indexLead: string;
    processTitle: [string, string];
    processLead: string;
    steps: [string, string][];
    readyToShip: string;
    yearsLabel: [string, string];
    studio: [string, string];
    signature: string;
    strip: string[];
    stripLabel: string;
    stripHint: string;
    faqTitle: [string, string];
    faq: { q: string; a: string; placeholder?: boolean }[];
    ctaKicker: string;
    ctaTitle: [string, string];
    orCall: string;
    ctaRim: string;
    footStudio: string;
    footContact: string;
    footArchive: string;
    footLanguages: string;
    marquee: string[];
  };
  archive: {
    title: string;
    lead: string;
    filterLabel: string;
    all: string;
    empty: string;
    countLabel: (n: number) => string;
  };
  piece: {
    catalogueNo: string;
    gallery: string;
    roles: Record<'obverse' | 'reverse' | 'detail' | 'in-use', string>;
    client: string;
    year: string;
    metal: string;
    finish: string;
    size: string;
    series: string;
    note: string;
    likeThis: [string, string];
    startWith: (no: number) => string;
    requestQuote: string;
    more: (plural: string) => [string, string];
    allOf: (plural: string) => string;
    storyFallback: (no: number, title: string, singular: string) => string;
    storyPending: string;
    zoom: string;
    close: string;
    openLarge: string;
  };
  quote: {
    kicker: string;
    title: [string, string];
    lead: string;
    s1: string;
    s2: string;
    s3: string;
    types: Record<'medals' | 'badges' | 'buckles' | 'key-fobs' | 'figures' | 'other', string>;
    minPcs: (n: number) => string;
    desc: string;
    descPh: string;
    qty: string;
    minFor: (type: string, n: number) => string;
    ref: string;
    refPh: string;
    files: string;
    filesHint: string;
    date: string;
    country: string;
    countries: string[];
    name: string;
    email: string;
    consent: string;
    consentLink: string;
    submit: string;
    sending: string;
    note: string;
    nextTitle: [string, string];
    next: string[];
    talk: string;
    required: string;
    okTitle: string;
    okText: string;
    errTitle: string;
    errors: Record<
      'turnstile' | 'too_large' | 'file_type' | 'missing' | 'qty_min' | 'email' | 'date' | 'server' | 'network' | 'consent',
      string
    >;
    turnstileLabel: string;
  };
  privacy: {
    title: string;
    updated: string;
    sections: { h: string; p: string[] }[];
  };
  notFound: { title: string; text: string; back: string };
}

/* ------------------------------------------------------------------ EN -- */

const en: UI = {
  meta: {
    homeTitle: 'CRdesign — Medals, badges and belt buckles cast to your design',
    homeDesc:
      'Family workshop in Brno spin-casting custom medals, badges, belt buckles and small castings in tin and zinc. Made to order from 10 pieces, shipped across Europe.',
    archiveTitle: 'Archive of commissioned medals, badges and buckles — CRdesign',
    archiveDesc:
      'Every piece we have cast, numbered like a museum catalogue: medals, badges, belt buckles, key fobs and figures made to order in tin and zinc.',
    categoryTitle: (p) => `${p} cast to order — archive — CRdesign`,
    categoryDesc: (p, n) =>
      `${n} ${p.toLowerCase()} we have spin-cast in tin and zinc for our clients. Browse the archive and quote a number in your request.`,
    pieceTitle: (no, t, s) => `No. ${no} ${t} — ${s.toLowerCase()} — CRdesign`,
    pieceDesc: (no, t, s) =>
      `${s} No. ${no} “${t}”, spin-cast to order in tin or zinc by CRdesign in Brno. Want something like it? Request a quote with No. ${no} as reference.`,
    quoteTitle: 'Request a quote for custom medals, badges and buckles — CRdesign',
    quoteDesc:
      'Tell us what you need, attach your artwork and get a price and lead time for custom cast medals, badges, belt buckles and key fobs. Free and without obligation.',
    privacyTitle: 'Privacy policy — CRdesign',
    privacyDesc: 'How CRdesign handles the personal data you send us through the quote form.',
    notFoundTitle: 'Page not found — CRdesign',
  },
  common: {
    skip: 'Skip to content',
    home: 'Home',
    language: 'Language',
    mainNav: 'Main',
    menu: 'Menu',
    menuClose: 'Close menu',
    breadcrumb: 'Breadcrumb',
    view: 'View',
    notForSale: 'All pieces shown were made for our clients and remain their property — not for sale.',
    notForSaleShort: 'Made for a client and remains their property — not for sale.',
    privacy: 'Privacy',
    photoOf: (no) => `Photo of piece No. ${no}`,
    pcs: (n) => `${n} pcs`,
    from: (n) => `from ${n} pcs`,
    onRequest: 'on request',
    year: '[year]',
    metal: '[metal]',
  },
  cat: {
    medals: {
      plural: 'Medals',
      singular: 'Medal',
      desc: 'Sports, club and anniversary medals in relief.',
      intro:
        'Sports, club, commemorative and anniversary medals, spin-cast in tin or zinc from your design. We make the relief from your logo or sketch and finish each series with patina, galvanic plating or enamel colour. Medals are made to order from 20 pieces.',
    },
    plaques: {
      plural: 'Plaques',
      singular: 'Plaque',
      desc: 'Relief plaques for awards and anniversaries.',
      intro:
        'Relief plaques for awards, anniversaries and company gifts, cast to your design in tin or zinc. Minimum series on request.',
    },
    badges: {
      plural: 'Badges & pins',
      singular: 'Badge',
      desc: 'Lapel badges and breastpins.',
      intro:
        'Lapel badges, pins and breastpins for clubs, companies, events and institutions, spin-cast from your logo in tin or zinc and finished with plating or enamel colour. Badges are made to order from 20 pieces.',
    },
    buckles: {
      plural: 'Belt buckles',
      singular: 'Belt buckle',
      desc: 'Custom buckles, also with inlays.',
      intro:
        'Custom belt buckles for clubs, bikers, bands and brands, cast in tin or zinc, also with inlays and coloured enamel. Belt buckles are made to order from 10 pieces.',
    },
    'key-fobs': {
      plural: 'Key fobs',
      singular: 'Key fob',
      desc: 'Cast key fobs and pendants.',
      intro:
        'Cast metal key fobs and pendants with your logo or motif, as promotional gifts or merchandise. Key fobs are made to order from 20 pieces.',
    },
    figures: {
      plural: 'Figures & game pieces',
      singular: 'Figure',
      desc: 'Figurines, totems and game pawns.',
      intro:
        'Small figurines, totems and game pawns cast in tin or zinc for board games, collectors and promotions. Figures are made to order from 30 pieces.',
    },
    labels: {
      plural: 'Company labels',
      singular: 'Company label',
      desc: 'Logo labels for products and glassware.',
      intro:
        'Cast metal logo labels for products, packaging and glassware, made to your company design. Minimum series on request.',
    },
    other: {
      plural: 'Other castings',
      singular: 'Casting',
      desc: 'Christmas ornaments and more.',
      intro:
        'Christmas ornaments and other small castings that do not fit a single family. If you can draw it, we can probably cast it — from 10 pieces.',
    },
  },
  home: {
    utilRight: 'Brno — Est. MMI',
    medalLabel: 'Flip the medal to see the reverse',
    medalReverseLabel: 'Flip the medal back to the front',
    heroMeta: ['Tin · Zinc · Galvanic finish', 'Scroll ↓'],
    editorial:
      'Since 2001 we have been turning {chip:677} sketches into *medals* {chip:727}, *badges* and *belt buckles* {chip:733} — spin-cast in tin and zinc in our family workshop in Brno, from the first line to the finished piece.',
    wallTitle: ['Selected', 'commissions'],
    wallLink: 'The full archive →',
    indexTitle: 'Index',
    indexLead:
      'Everything we cast is made to order. Hover a line to preview — minimum series per product family on the right.',
    processTitle: ['From line', 'to metal'],
    processLead: 'Watch a piece take shape — or click a step.',
    steps: [
      ['Design', 'Your sketch, logo or reference becomes a relief drawing.'],
      ['Mould', 'A production mould is made for the piece.'],
      ['Casting', 'Tin or zinc is spin-cast into the mould.'],
      ['Finish', 'Galvanic plating and hand-painted colour.'],
      ['Delivery', 'Packed and shipped to you, across Europe.'],
    ],
    readyToShip: 'READY TO SHIP',
    yearsLabel: ['years at', 'the workbench'],
    studio: [
      'We started in 2001 hand-painting tin pictures. In 2004 we brought in technology for spin casting tin and zinc, and since then we have been making small metal castings — belt buckles, Christmas decorations, key fobs, badges, breastpins, medals, company logos, game pawns and glassware labels.',
      'Every job, from origination to the final product, including galvanic plating.',
    ],
    signature: '— Richard Coufal',
    strip: ['THE CASTING MACHINE', 'RUBBER MOULDS', 'HAND PAINTING', 'RAW CAST VS. FINISHED', 'GALVANIC BATH', 'PACKED SERIES'],
    stripLabel: 'Workshop photos — scroll sideways',
    stripHint: '← Drag / scroll the workshop →',
    faqTitle: ['Before', 'you order'],
    faq: [
      {
        q: 'What is the minimum order?',
        a: 'From 10 pieces for belt buckles and other castings, 20 for medals, badges and key fobs, and 30 for figures.',
      },
      {
        q: 'Which metals do you cast?',
        a: 'Tin and zinc, using spin casting. Pieces can be finished with galvanic plating or hand-painted colour.',
      },
      {
        q: 'Can you make a medal from our logo?',
        a: 'Yes. We work from your logo, sketch or a reference photo and take the job from origination to the finished product.',
      },
      { q: 'How long does production take?', a: '[Typical lead time — to be confirmed with the client.]', placeholder: true },
      {
        q: 'Do you ship outside the Czech Republic?',
        a: '[Shipping countries and terms — to be confirmed with the client.]',
        placeholder: true,
      },
      {
        q: 'Can I buy the pieces shown here?',
        a: 'No. Every piece shown was made for a client and remains their property. We only make custom work.',
      },
    ],
    ctaKicker: 'Commission a piece',
    ctaTitle: ['Your design,', 'in metal.'],
    orCall: 'or call',
    ctaRim: 'YOUR DESIGN · IN METAL · YOUR DESIGN · IN METAL · ',
    footStudio: 'Studio',
    footContact: 'Contact',
    footArchive: 'Archive',
    footLanguages: 'Languages',
    marquee: ['Medals', 'Plaques', 'Badges', 'Belt buckles', 'Key fobs', 'Figures', 'Company labels', 'Ornaments'],
  },
  archive: {
    title: 'Archive',
    lead: 'Every piece we have cast, numbered like a museum catalogue. Each has its own page — find one close to your idea and quote its number in your request.',
    filterLabel: 'Filter by product',
    all: 'All',
    empty: '[Pieces in this category will be migrated from the current website.]',
    countLabel: (n) => `${n} pieces`,
  },
  piece: {
    catalogueNo: 'Catalogue No.',
    gallery: 'Photos',
    roles: { obverse: 'obverse', reverse: 'reverse', detail: 'detail', 'in-use': 'in use' },
    client: 'Client',
    year: 'Year',
    metal: 'Metal',
    finish: 'Finish',
    size: 'Size',
    series: 'Series',
    note: 'Note',
    likeThis: ['Something', 'like this?'],
    startWith: (no) => `Start a request with No. ${no} as the reference.`,
    requestQuote: 'Request a quote →',
    more: (p) => ['More', p.toLowerCase()],
    allOf: (p) => `All ${p.toLowerCase()} →`,
    storyFallback: (no, t, s) =>
      `No. ${no}, “${t}”, is a ${s.toLowerCase()} we spin-cast to order for a client in our Brno workshop — from the relief drawing and the mould to the finished series.`,
    storyPending: '[Story of the commission — to be written with the client.]',
    zoom: 'Zoom',
    close: 'Close',
    openLarge: 'Open large photo',
  },
  quote: {
    kicker: 'Commission · free & without obligation',
    title: ['Your design,', 'in metal.'],
    lead: 'Tell us what you need and attach any artwork. We reply with a price and lead time.',
    s1: 'I — What should we cast?',
    s2: 'II — The piece',
    s3: 'III — Delivery & contact',
    types: { medals: 'Medals', badges: 'Badges', buckles: 'Belt buckles', 'key-fobs': 'Key fobs', figures: 'Figures', other: 'Other' },
    minPcs: (n) => `min. ${n} pcs`,
    desc: 'Description',
    descPh: 'Occasion, size, what the design should show…',
    qty: 'Quantity *',
    minFor: (t, n) => `Minimum for ${t.toLowerCase()}: ${n} pcs`,
    ref: 'Similar piece from the archive',
    refPh: 'No. 677',
    files: 'Artwork, logo or sketch — PDF, AI, SVG, PNG, JPG',
    filesHint: 'Up to 20 MB in total.',
    date: 'Needed by *',
    country: 'Delivery country *',
    countries: [
      'Czech Republic',
      'Slovakia',
      'Germany',
      'Austria',
      'Poland',
      'France',
      'Italy',
      'Netherlands',
      'Other EU country',
      'Outside the EU',
    ],
    name: 'Name & company',
    email: 'Email *',
    consent: 'Your details are used only to answer this request.',
    consentLink: 'Privacy policy',
    submit: 'Send request →',
    sending: 'Sending…',
    note: 'Fields marked * are required.',
    nextTitle: ['What', 'happens next'],
    next: [
      'We review your idea and artwork.',
      'You get a price and lead time [within X working days].',
      'We prepare the design for your approval, then cast the series.',
    ],
    talk: 'Prefer to talk?',
    required: 'required',
    okTitle: 'Thank you — your request is on its way.',
    okText: 'We have received it and will reply by email with a price and lead time.',
    errTitle: 'The request was not sent.',
    errors: {
      turnstile: 'The spam check did not finish. Wait a moment until it shows a tick, then send again.',
      too_large: 'The attached files are larger than 20 MB in total. Remove some files or send smaller exports.',
      file_type: 'One of the files has an unsupported format. Please attach PDF, AI, SVG, PNG or JPG.',
      missing: 'Please fill in all fields marked with *.',
      qty_min: 'The quantity is below the minimum for this product type. Raise it to at least the minimum shown under the field.',
      email: 'Please check the email address — we need it to reply.',
      date: 'Please choose a date in the future.',
      server: 'Something went wrong on our side. Please try again in a minute, or email us at coufalcr@centrum.cz.',
      network: 'Your connection dropped. Check that you are online and send again — nothing was lost.',
      consent: 'Please confirm that we may use your details to answer this request.',
    },
    turnstileLabel: 'Spam check',
  },
  privacy: {
    title: 'Privacy',
    updated: 'Last updated',
    sections: [
      {
        h: 'Who is responsible',
        p: [
          'The controller of your personal data is Richard Coufal — CRdesign, Horova 54, 616 00 Brno, Czech Republic, [IČO / VAT ID]. Email: coufalcr@centrum.cz, phone +420 603 772 780.',
        ],
      },
      {
        h: 'What we collect and why',
        p: [
          'When you send a quote request we process the details you enter — name and company, email address, delivery country, the description of the piece, quantity, date and any files you attach. We use them only to answer your request and, if you order, to prepare and deliver the order (Art. 6(1)(b) GDPR, steps prior to entering into a contract).',
          'We do not use your details for marketing and we do not sell or share them with anyone for their own purposes.',
        ],
      },
      {
        h: 'Who processes the data for us',
        p: [
          'The website runs on Cloudflare (hosting, spam protection with Cloudflare Turnstile and storage of uploaded files). Your request is passed to our workshop by email through Make.com. These providers act as processors under data processing agreements.',
        ],
      },
      {
        h: 'How long we keep it',
        p: [
          'Requests that do not lead to an order are deleted after [retention period — to be confirmed]. Orders are kept as long as accounting and tax law requires.',
        ],
      },
      {
        h: 'Cookies and tracking',
        p: [
          'This website does not use analytics or advertising cookies. Fonts are served from our own server. Cloudflare Turnstile may set a strictly necessary cookie to tell people from bots when you send the form.',
        ],
      },
      {
        h: 'Your rights',
        p: [
          'You have the right to access, correct and delete your data, to restrict or object to processing and to data portability. Write to coufalcr@centrum.cz. You can also lodge a complaint with the Czech data protection authority (Úřad pro ochranu osobních údajů, www.uoou.cz).',
        ],
      },
    ],
  },
  notFound: { title: 'Not found', text: 'This page does not exist — perhaps it was moved during the redesign.', back: 'Back to the home page' },
};

/* ------------------------------------------------------------------ CS -- */

const cs: UI = {
  meta: {
    homeTitle: 'CRdesign — medaile, odznaky a opaskové spony podle vašeho návrhu',
    homeDesc:
      'Rodinná dílna v Brně: odstředivé lití medailí, odznaků, opaskových spon a drobných odlitků z cínu a zinku na zakázku. Od 10 kusů, doprava po celé Evropě.',
    archiveTitle: 'Archiv zakázkových medailí, odznaků a spon — CRdesign',
    archiveDesc:
      'Všechny kusy, které jsme odlili, očíslované jako muzejní katalog: medaile, odznaky, opaskové spony, přívěsky a figurky z cínu a zinku na zakázku.',
    categoryTitle: (p) => `${p} na zakázku — archiv — CRdesign`,
    categoryDesc: (p, n) =>
      `${p} (${n}), které jsme pro naše klienty odlili z cínu a zinku. Projděte archiv a uveďte číslo kusu v poptávce.`,
    pieceTitle: (no, t, s) => `č. ${no} ${t} — ${s.toLowerCase()} — CRdesign`,
    pieceDesc: (no, t, s) =>
      `${s} č. ${no} „${t}“, odlitá na zakázku z cínu nebo zinku v dílně CRdesign v Brně. Chcete něco podobného? Pošlete poptávku s číslem ${no}.`,
    quoteTitle: 'Poptávka medailí, odznaků a spon na zakázku — CRdesign',
    quoteDesc:
      'Napište, co potřebujete, přiložte podklady a získejte cenu a termín výroby medailí, odznaků, opaskových spon a přívěsků. Zdarma a nezávazně.',
    privacyTitle: 'Ochrana osobních údajů — CRdesign',
    privacyDesc: 'Jak CRdesign nakládá s osobními údaji, které nám pošlete přes poptávkový formulář.',
    notFoundTitle: 'Stránka nenalezena — CRdesign',
  },
  common: {
    skip: 'Přejít na obsah',
    home: 'Úvod',
    language: 'Jazyk',
    mainNav: 'Hlavní',
    menu: 'Menu',
    menuClose: 'Zavřít menu',
    breadcrumb: 'Drobečková navigace',
    view: 'Detail',
    notForSale: 'Všechny zobrazené kusy byly vyrobeny pro naše klienty a jsou jejich majetkem — nejsou na prodej.',
    notForSaleShort: 'Vyrobeno pro klienta a je jeho majetkem — není na prodej.',
    privacy: 'Ochrana údajů',
    photoOf: (no) => `Fotografie kusu č. ${no}`,
    pcs: (n) => `${n} ks`,
    from: (n) => `od ${n} ks`,
    onRequest: 'na dotaz',
    year: '[rok]',
    metal: '[kov]',
  },
  cat: {
    medals: {
      plural: 'Medaile',
      singular: 'Medaile',
      desc: 'Sportovní, klubové a výroční medaile v reliéfu.',
      intro:
        'Sportovní, klubové, pamětní a výroční medaile odstředivě lité z cínu nebo zinku podle vašeho návrhu. Reliéf připravíme z loga nebo skici a sérii dokončíme patinou, galvanickým pokovením nebo smaltem. Medaile vyrábíme od 20 kusů.',
    },
    plaques: {
      plural: 'Plakety',
      singular: 'Plaketa',
      desc: 'Reliéfní plakety k ocenění a výročím.',
      intro: 'Reliéfní plakety k ocenění, výročím a jako firemní dárky, odlité z cínu nebo zinku podle vašeho návrhu. Minimální série na dotaz.',
    },
    badges: {
      plural: 'Odznaky',
      singular: 'Odznak',
      desc: 'Klopové odznaky a brože.',
      intro:
        'Klopové odznaky, piny a brože pro kluby, firmy, akce a instituce, odlité z vašeho loga z cínu nebo zinku a dokončené pokovením nebo smaltem. Odznaky vyrábíme od 20 kusů.',
    },
    buckles: {
      plural: 'Opaskové spony',
      singular: 'Opasková spona',
      desc: 'Spony na zakázku, i s vložkami.',
      intro:
        'Opaskové spony na zakázku pro kluby, motorkáře, kapely i značky, odlité z cínu nebo zinku, také s vložkami a barevným smaltem. Spony vyrábíme od 10 kusů.',
    },
    'key-fobs': {
      plural: 'Přívěsky na klíče',
      singular: 'Přívěsek',
      desc: 'Lité přívěsky a klíčenky.',
      intro: 'Kovové lité přívěsky na klíče s vaším logem nebo motivem jako reklamní dárky či merch. Přívěsky vyrábíme od 20 kusů.',
    },
    figures: {
      plural: 'Figurky',
      singular: 'Figurka',
      desc: 'Figurky, totemy a herní figurky.',
      intro: 'Drobné figurky, totemy a herní figurky z cínu nebo zinku pro deskové hry, sběratele a propagaci. Figurky vyrábíme od 30 kusů.',
    },
    labels: {
      plural: 'Firemní štítky',
      singular: 'Firemní štítek',
      desc: 'Štítky s logem na výrobky a sklo.',
      intro: 'Lité kovové štítky s logem na výrobky, obaly a sklo podle firemního návrhu. Minimální série na dotaz.',
    },
    other: {
      plural: 'Ostatní výrobky',
      singular: 'Odlitek',
      desc: 'Vánoční ozdoby a další.',
      intro: 'Vánoční ozdoby a další drobné odlitky, které nepatří do jedné skupiny. Co se dá nakreslit, to nejspíš odlijeme — od 10 kusů.',
    },
  },
  home: {
    utilRight: 'Brno — zal. MMI',
    medalLabel: 'Otočit medaili a zobrazit rub',
    medalReverseLabel: 'Otočit medaili zpět na líc',
    heroMeta: ['Cín · Zinek · Galvanická úprava', 'Dolů ↓'],
    editorial:
      'Od roku 2001 proměňujeme {chip:677} skici v *medaile* {chip:727}, *odznaky* a *opaskové spony* {chip:733} — odstředivě lité z cínu a zinku v naší rodinné dílně v Brně, od první linky po hotový kus.',
    wallTitle: ['Vybrané', 'zakázky'],
    wallLink: 'Celý archiv →',
    indexTitle: 'Rejstřík',
    indexLead: 'Všechno odléváme na zakázku. Najeďte na řádek pro náhled — minimální série pro každou skupinu vpravo.',
    processTitle: ['Od linky', 'ke kovu'],
    processLead: 'Sledujte, jak kus vzniká — nebo klikněte na krok.',
    steps: [
      ['Návrh', 'Z vaší skici, loga nebo předlohy vznikne reliéfní kresba.'],
      ['Forma', 'Pro kus vyrobíme výrobní formu.'],
      ['Lití', 'Cín nebo zinek se odstředivě odlije do formy.'],
      ['Úprava', 'Galvanické pokovení a ručně malovaná barva.'],
      ['Dodání', 'Zabalíme a pošleme k vám, po celé Evropě.'],
    ],
    readyToShip: 'PŘIPRAVENO',
    yearsLabel: ['let', 'u ponku'],
    studio: [
      'Začínali jsme v roce 2001 ručně malovanými cínovými obrázky. V roce 2004 jsme pořídili technologii odstředivého lití cínu a zinku a od té doby vyrábíme drobné kovové odlitky — opaskové spony, vánoční ozdoby, přívěsky na klíče, odznaky, brože, medaile, firemní loga, herní figurky a štítky na sklo.',
      'Každou zakázku od návrhu po hotový výrobek, včetně galvanického pokovení.',
    ],
    signature: '— Richard Coufal',
    strip: ['LICÍ STROJ', 'PRYŽOVÉ FORMY', 'RUČNÍ MALBA', 'SUROVÝ ODLITEK VS. HOTOVÝ', 'GALVANICKÁ LÁZEŇ', 'ZABALENÁ SÉRIE'],
    stripLabel: 'Fotografie z dílny — posouvejte do strany',
    stripHint: '← Táhněte / posouvejte dílnou →',
    faqTitle: ['Než', 'objednáte'],
    faq: [
      {
        q: 'Jaký je minimální odběr?',
        a: 'Od 10 kusů u opaskových spon a ostatních odlitků, 20 u medailí, odznaků a přívěsků a 30 u figurek.',
      },
      {
        q: 'Z jakých kovů odléváte?',
        a: 'Z cínu a zinku metodou odstředivého lití. Kusy lze dokončit galvanickým pokovením nebo ručně malovanou barvou.',
      },
      {
        q: 'Uděláte medaili z našeho loga?',
        a: 'Ano. Pracujeme z vašeho loga, skici nebo fotografie předlohy a zakázku vedeme od návrhu po hotový výrobek.',
      },
      { q: 'Jak dlouho trvá výroba?', a: '[Typical lead time — to be confirmed with the client.]', placeholder: true },
      { q: 'Posíláte i mimo Českou republiku?', a: '[Shipping countries and terms — to be confirmed with the client.]', placeholder: true },
      {
        q: 'Můžu si zobrazené kusy koupit?',
        a: 'Ne. Každý zobrazený kus byl vyroben pro klienta a zůstává jeho majetkem. Vyrábíme pouze na zakázku.',
      },
    ],
    ctaKicker: 'Zadejte zakázku',
    ctaTitle: ['Váš návrh,', 'v kovu.'],
    orCall: 'nebo volejte',
    ctaRim: 'VÁŠ NÁVRH · V KOVU · VÁŠ NÁVRH · V KOVU · ',
    footStudio: 'Dílna',
    footContact: 'Kontakt',
    footArchive: 'Archiv',
    footLanguages: 'Jazyky',
    marquee: ['Medaile', 'Plakety', 'Odznaky', 'Opaskové spony', 'Přívěsky', 'Figurky', 'Firemní štítky', 'Ozdoby'],
  },
  archive: {
    title: 'Archiv',
    lead: 'Všechny kusy, které jsme odlili, očíslované jako muzejní katalog. Každý má svou stránku — najděte ten nejbližší vašemu nápadu a uveďte jeho číslo v poptávce.',
    filterLabel: 'Filtrovat podle výrobku',
    all: 'Vše',
    empty: '[Pieces in this category will be migrated from the current website.]',
    countLabel: (n) => `${n} kusů`,
  },
  piece: {
    catalogueNo: 'Katalogové č.',
    gallery: 'Fotografie',
    roles: { obverse: 'líc', reverse: 'rub', detail: 'detail', 'in-use': 'v použití' },
    client: 'Klient',
    year: 'Rok',
    metal: 'Kov',
    finish: 'Povrch',
    size: 'Rozměr',
    series: 'Série',
    note: 'Poznámka',
    likeThis: ['Něco', 'podobného?'],
    startWith: (no) => `Začněte poptávku s č. ${no} jako předlohou.`,
    requestQuote: 'Nezávazná poptávka →',
    more: (p) => ['Další', p.toLowerCase()],
    allOf: (p) => `${p} — vše →`,
    storyFallback: (no, t) =>
      `Č. ${no}, „${t}“, jsme odstředivě odlili na zakázku pro klienta v naší brněnské dílně — od reliéfní kresby a formy až po hotovou sérii.`,
    storyPending: '[Story of the commission — to be written with the client.]',
    zoom: 'Přiblížit',
    close: 'Zavřít',
    openLarge: 'Otevřít velkou fotografii',
  },
  quote: {
    kicker: 'Zakázka · zdarma a nezávazně',
    title: ['Váš návrh,', 'v kovu.'],
    lead: 'Napište, co potřebujete, a přiložte podklady. Odpovíme cenou a termínem výroby.',
    s1: 'I — Co máme odlít?',
    s2: 'II — Výrobek',
    s3: 'III — Dodání a kontakt',
    types: { medals: 'Medaile', badges: 'Odznaky', buckles: 'Opaskové spony', 'key-fobs': 'Přívěsky', figures: 'Figurky', other: 'Ostatní' },
    minPcs: (n) => `min. ${n} ks`,
    desc: 'Popis',
    descPh: 'Příležitost, velikost, co má návrh zobrazovat…',
    qty: 'Počet kusů *',
    minFor: (t, n) => `Minimum pro ${t.toLowerCase()}: ${n} ks`,
    ref: 'Podobný kus z archivu',
    refPh: 'č. 677',
    files: 'Podklady, logo nebo skica — PDF, AI, SVG, PNG, JPG',
    filesHint: 'Celkem nejvýše 20 MB.',
    date: 'Potřebujete do *',
    country: 'Země doručení *',
    countries: [
      'Česká republika',
      'Slovensko',
      'Německo',
      'Rakousko',
      'Polsko',
      'Francie',
      'Itálie',
      'Nizozemsko',
      'Jiná země EU',
      'Mimo EU',
    ],
    name: 'Jméno a firma',
    email: 'E-mail *',
    consent: 'Vaše údaje použijeme jen k odpovědi na tuto poptávku.',
    consentLink: 'Ochrana osobních údajů',
    submit: 'Odeslat poptávku →',
    sending: 'Odesílám…',
    note: 'Pole označená * jsou povinná.',
    nextTitle: ['Co bude', 'dál'],
    next: [
      'Projdeme váš nápad a podklady.',
      'Pošleme cenu a termín výroby [within X working days].',
      'Připravíme návrh ke schválení a pak odlijeme sérii.',
    ],
    talk: 'Raději si zavoláte?',
    required: 'povinné',
    okTitle: 'Děkujeme — poptávka je na cestě.',
    okText: 'Přijali jsme ji a odpovíme e-mailem s cenou a termínem výroby.',
    errTitle: 'Poptávka nebyla odeslána.',
    errors: {
      turnstile: 'Kontrola proti spamu se nedokončila. Počkejte, až se zobrazí fajfka, a odešlete znovu.',
      too_large: 'Přiložené soubory mají dohromady víc než 20 MB. Některé odeberte nebo pošlete menší exporty.',
      file_type: 'Jeden ze souborů má nepodporovaný formát. Přiložte prosím PDF, AI, SVG, PNG nebo JPG.',
      missing: 'Vyplňte prosím všechna pole označená *.',
      qty_min: 'Počet kusů je pod minimem pro tento typ výrobku. Zvyšte ho alespoň na minimum uvedené pod polem.',
      email: 'Zkontrolujte prosím e-mailovou adresu — potřebujeme ji k odpovědi.',
      date: 'Zvolte prosím datum v budoucnosti.',
      server: 'Na naší straně se něco pokazilo. Zkuste to prosím za minutu znovu, nebo nám napište na coufalcr@centrum.cz.',
      network: 'Spojení se přerušilo. Zkontrolujte připojení a odešlete znovu — nic se neztratilo.',
      consent: 'Potvrďte prosím, že smíme vaše údaje použít k odpovědi na poptávku.',
    },
    turnstileLabel: 'Kontrola proti spamu',
  },
  privacy: {
    title: 'Ochrana údajů',
    updated: 'Aktualizováno',
    sections: [
      {
        h: 'Kdo je správce',
        p: [
          'Správcem vašich osobních údajů je Richard Coufal — CRdesign, Horova 54, 616 00 Brno, [IČO / VAT ID]. E-mail: coufalcr@centrum.cz, telefon +420 603 772 780.',
        ],
      },
      {
        h: 'Co zpracováváme a proč',
        p: [
          'Když pošlete poptávku, zpracováváme údaje, které vyplníte — jméno a firmu, e-mail, zemi doručení, popis výrobku, počet kusů, termín a přiložené soubory. Použijeme je jen k odpovědi na poptávku a v případě objednávky k její výrobě a dodání (čl. 6 odst. 1 písm. b) GDPR, jednání o smlouvě).',
          'Údaje nepoužíváme k marketingu a nikomu je neprodáváme ani nepředáváme pro jeho vlastní účely.',
        ],
      },
      {
        h: 'Kdo údaje zpracovává pro nás',
        p: [
          'Web běží na službách Cloudflare (hosting, ochrana proti spamu Cloudflare Turnstile a uložení nahraných souborů). Poptávka se do dílny předává e-mailem přes službu Make.com. Tito poskytovatelé jsou zpracovateli na základě smluv o zpracování.',
        ],
      },
      {
        h: 'Jak dlouho údaje uchováváme',
        p: [
          'Poptávky, které nevedou k objednávce, mažeme po [retention period — to be confirmed]. Objednávky uchováváme po dobu, kterou vyžadují účetní a daňové předpisy.',
        ],
      },
      {
        h: 'Cookies a měření',
        p: [
          'Web nepoužívá analytické ani reklamní cookies. Písma se načítají z našeho serveru. Cloudflare Turnstile může při odeslání formuláře nastavit nezbytnou cookie k rozlišení lidí od robotů.',
        ],
      },
      {
        h: 'Vaše práva',
        p: [
          'Máte právo na přístup, opravu a výmaz údajů, na omezení zpracování, vznesení námitky a přenositelnost. Napište na coufalcr@centrum.cz. Stížnost můžete podat také u Úřadu pro ochranu osobních údajů (www.uoou.cz).',
        ],
      },
    ],
  },
  notFound: { title: 'Nenalezeno', text: 'Tato stránka neexistuje — možná se při přestavbě webu přesunula.', back: 'Zpět na úvod' },
};

/* ------------------------------------------------------------------ DE -- */

const de: UI = {
  meta: {
    homeTitle: 'CRdesign — Medaillen, Abzeichen und Gürtelschnallen nach Ihrem Entwurf',
    homeDesc:
      'Familienwerkstatt in Brünn: Medaillen, Abzeichen, Gürtelschnallen und Kleinguss aus Zinn und Zink im Schleuderguss nach Maß. Ab 10 Stück, Versand in ganz Europa.',
    archiveTitle: 'Archiv gegossener Medaillen, Abzeichen und Schnallen — CRdesign',
    archiveDesc:
      'Jedes Stück, das wir gegossen haben, nummeriert wie ein Museumskatalog: Medaillen, Abzeichen, Gürtelschnallen, Schlüsselanhänger und Figuren nach Maß.',
    categoryTitle: (p) => `${p} nach Maß — Archiv — CRdesign`,
    categoryDesc: (p, n) =>
      `${p} (${n}), die wir für unsere Kunden aus Zinn und Zink gegossen haben. Stöbern Sie im Archiv und nennen Sie die Nummer in Ihrer Anfrage.`,
    pieceTitle: (no, t, s) => `Nr. ${no} ${t} — ${s} — CRdesign`,
    pieceDesc: (no, t, s) =>
      `${s} Nr. ${no} „${t}“, im Schleuderguss aus Zinn oder Zink nach Maß gefertigt von CRdesign in Brünn. Etwas Ähnliches gewünscht? Anfrage mit Nr. ${no} senden.`,
    quoteTitle: 'Anfrage für Medaillen, Abzeichen und Schnallen nach Maß — CRdesign',
    quoteDesc:
      'Beschreiben Sie Ihr Vorhaben, hängen Sie Ihre Vorlage an und erhalten Sie Preis und Lieferzeit für gegossene Medaillen, Abzeichen und Gürtelschnallen. Kostenlos und unverbindlich.',
    privacyTitle: 'Datenschutz — CRdesign',
    privacyDesc: 'Wie CRdesign mit den personenbezogenen Daten aus dem Anfrageformular umgeht.',
    notFoundTitle: 'Seite nicht gefunden — CRdesign',
  },
  common: {
    skip: 'Zum Inhalt springen',
    home: 'Start',
    language: 'Sprache',
    mainNav: 'Hauptmenü',
    menu: 'Menü',
    menuClose: 'Menü schließen',
    breadcrumb: 'Brotkrumen',
    view: 'Ansehen',
    notForSale: 'Alle gezeigten Stücke wurden für unsere Kunden gefertigt und sind deren Eigentum — nicht verkäuflich.',
    notForSaleShort: 'Für einen Kunden gefertigt und dessen Eigentum — nicht verkäuflich.',
    privacy: 'Datenschutz',
    photoOf: (no) => `Foto von Stück Nr. ${no}`,
    pcs: (n) => `${n} Stück`,
    from: (n) => `ab ${n} Stück`,
    onRequest: 'auf Anfrage',
    year: '[Jahr]',
    metal: '[Metall]',
  },
  cat: {
    medals: {
      plural: 'Medaillen',
      singular: 'Medaille',
      desc: 'Sport-, Vereins- und Jubiläumsmedaillen im Relief.',
      intro:
        'Sport-, Vereins-, Gedenk- und Jubiläumsmedaillen im Schleuderguss aus Zinn oder Zink nach Ihrem Entwurf. Das Relief entsteht aus Ihrem Logo oder Ihrer Skizze; jede Serie wird patiniert, galvanisch veredelt oder emailliert. Medaillen fertigen wir ab 20 Stück.',
    },
    plaques: {
      plural: 'Plaketten',
      singular: 'Plakette',
      desc: 'Reliefplaketten für Auszeichnungen und Jubiläen.',
      intro: 'Reliefplaketten für Auszeichnungen, Jubiläen und Firmengeschenke, nach Ihrem Entwurf aus Zinn oder Zink gegossen. Mindestmenge auf Anfrage.',
    },
    badges: {
      plural: 'Abzeichen',
      singular: 'Abzeichen',
      desc: 'Anstecker und Anstecknadeln.',
      intro:
        'Anstecker, Pins und Anstecknadeln für Vereine, Firmen, Veranstaltungen und Institutionen, aus Ihrem Logo in Zinn oder Zink gegossen und galvanisch oder mit Emaille veredelt. Abzeichen fertigen wir ab 20 Stück.',
    },
    buckles: {
      plural: 'Gürtelschnallen',
      singular: 'Gürtelschnalle',
      desc: 'Schnallen nach Maß, auch mit Einlagen.',
      intro:
        'Gürtelschnallen nach Maß für Clubs, Biker, Bands und Marken, aus Zinn oder Zink gegossen, auch mit Einlagen und farbiger Emaille. Gürtelschnallen fertigen wir ab 10 Stück.',
    },
    'key-fobs': {
      plural: 'Schlüsselanhänger',
      singular: 'Schlüsselanhänger',
      desc: 'Gegossene Schlüsselanhänger und Anhänger.',
      intro: 'Gegossene Schlüsselanhänger aus Metall mit Ihrem Logo oder Motiv, als Werbegeschenk oder Merchandise. Ab 20 Stück.',
    },
    figures: {
      plural: 'Figuren',
      singular: 'Figur',
      desc: 'Figuren, Totems und Spielfiguren.',
      intro: 'Kleine Figuren, Totems und Spielfiguren aus Zinn oder Zink für Brettspiele, Sammler und Werbung. Figuren fertigen wir ab 30 Stück.',
    },
    labels: {
      plural: 'Firmenschilder',
      singular: 'Firmenschild',
      desc: 'Logo-Schilder für Produkte und Glas.',
      intro: 'Gegossene Logo-Schilder aus Metall für Produkte, Verpackungen und Glas nach Ihrem Firmendesign. Mindestmenge auf Anfrage.',
    },
    other: {
      plural: 'Sonstige Produkte',
      singular: 'Gussteil',
      desc: 'Weihnachtsschmuck und mehr.',
      intro: 'Weihnachtsschmuck und andere Kleingussteile, die in keine Gruppe passen. Was sich zeichnen lässt, können wir meist auch gießen — ab 10 Stück.',
    },
  },
  home: {
    utilRight: 'Brünn — gegr. MMI',
    medalLabel: 'Medaille wenden, um die Rückseite zu sehen',
    medalReverseLabel: 'Medaille zurück auf die Vorderseite wenden',
    heroMeta: ['Zinn · Zink · Galvanische Veredelung', 'Scrollen ↓'],
    editorial:
      'Seit 2001 verwandeln wir {chip:677} Skizzen in *Medaillen* {chip:727}, *Abzeichen* und *Gürtelschnallen* {chip:733} — im Schleuderguss aus Zinn und Zink in unserer Familienwerkstatt in Brünn, von der ersten Linie bis zum fertigen Stück.',
    wallTitle: ['Ausgewählte', 'Aufträge'],
    wallLink: 'Das ganze Archiv →',
    indexTitle: 'Index',
    indexLead: 'Alles, was wir gießen, entsteht auf Bestellung. Fahren Sie über eine Zeile für eine Vorschau — rechts die Mindestmenge je Produktgruppe.',
    processTitle: ['Von der Linie', 'zum Metall'],
    processLead: 'Sehen Sie zu, wie ein Stück entsteht — oder klicken Sie auf einen Schritt.',
    steps: [
      ['Entwurf', 'Aus Ihrer Skizze, Ihrem Logo oder Ihrer Vorlage wird eine Reliefzeichnung.'],
      ['Form', 'Für das Stück wird eine Produktionsform gefertigt.'],
      ['Guss', 'Zinn oder Zink wird im Schleuderguss in die Form gegossen.'],
      ['Veredelung', 'Galvanische Beschichtung und handbemalte Farbe.'],
      ['Lieferung', 'Verpackt und zu Ihnen geschickt, in ganz Europa.'],
    ],
    readyToShip: 'VERSANDBEREIT',
    yearsLabel: ['Jahre an', 'der Werkbank'],
    studio: [
      'Wir haben 2001 mit handbemalten Zinnbildern angefangen. 2004 kam die Technik für den Schleuderguss von Zinn und Zink dazu, und seitdem fertigen wir kleine Metallgussteile — Gürtelschnallen, Weihnachtsschmuck, Schlüsselanhänger, Abzeichen, Anstecknadeln, Medaillen, Firmenlogos, Spielfiguren und Glasetiketten.',
      'Jeder Auftrag vom Entwurf bis zum fertigen Produkt, einschließlich galvanischer Veredelung.',
    ],
    signature: '— Richard Coufal',
    strip: ['DIE GIESSMASCHINE', 'GUMMIFORMEN', 'HANDBEMALUNG', 'ROHGUSS VS. FERTIG', 'GALVANIKBAD', 'VERPACKTE SERIE'],
    stripLabel: 'Fotos aus der Werkstatt — seitlich scrollen',
    stripHint: '← Ziehen / durch die Werkstatt scrollen →',
    faqTitle: ['Bevor', 'Sie bestellen'],
    faq: [
      {
        q: 'Wie hoch ist die Mindestbestellmenge?',
        a: 'Ab 10 Stück für Gürtelschnallen und sonstige Gussteile, 20 für Medaillen, Abzeichen und Schlüsselanhänger und 30 für Figuren.',
      },
      {
        q: 'Welche Metalle gießen Sie?',
        a: 'Zinn und Zink im Schleuderguss. Die Stücke können galvanisch veredelt oder von Hand bemalt werden.',
      },
      {
        q: 'Können Sie eine Medaille aus unserem Logo machen?',
        a: 'Ja. Wir arbeiten nach Ihrem Logo, Ihrer Skizze oder einem Referenzfoto und begleiten den Auftrag vom Entwurf bis zum fertigen Produkt.',
      },
      { q: 'Wie lange dauert die Fertigung?', a: '[Typical lead time — to be confirmed with the client.]', placeholder: true },
      { q: 'Liefern Sie auch außerhalb Tschechiens?', a: '[Shipping countries and terms — to be confirmed with the client.]', placeholder: true },
      {
        q: 'Kann ich die gezeigten Stücke kaufen?',
        a: 'Nein. Jedes gezeigte Stück wurde für einen Kunden gefertigt und bleibt dessen Eigentum. Wir fertigen nur nach Maß.',
      },
    ],
    ctaKicker: 'Ein Stück in Auftrag geben',
    ctaTitle: ['Ihr Entwurf,', 'in Metall.'],
    orCall: 'oder anrufen',
    ctaRim: 'IHR ENTWURF · IN METALL · IHR ENTWURF · IN METALL · ',
    footStudio: 'Atelier',
    footContact: 'Kontakt',
    footArchive: 'Archiv',
    footLanguages: 'Sprachen',
    marquee: ['Medaillen', 'Plaketten', 'Abzeichen', 'Gürtelschnallen', 'Schlüsselanhänger', 'Figuren', 'Firmenschilder', 'Schmuck'],
  },
  archive: {
    title: 'Archiv',
    lead: 'Jedes Stück, das wir gegossen haben, nummeriert wie ein Museumskatalog. Jedes hat seine eigene Seite — finden Sie eines, das Ihrer Idee nahekommt, und nennen Sie die Nummer in Ihrer Anfrage.',
    filterLabel: 'Nach Produkt filtern',
    all: 'Alle',
    empty: '[Pieces in this category will be migrated from the current website.]',
    countLabel: (n) => `${n} Stücke`,
  },
  piece: {
    catalogueNo: 'Katalog-Nr.',
    gallery: 'Fotos',
    roles: { obverse: 'Vorderseite', reverse: 'Rückseite', detail: 'Detail', 'in-use': 'im Einsatz' },
    client: 'Kunde',
    year: 'Jahr',
    metal: 'Metall',
    finish: 'Oberfläche',
    size: 'Größe',
    series: 'Serie',
    note: 'Hinweis',
    likeThis: ['Etwas', 'Ähnliches?'],
    startWith: (no) => `Starten Sie eine Anfrage mit Nr. ${no} als Referenz.`,
    requestQuote: 'Angebot anfordern →',
    more: (p) => ['Weitere', p],
    allOf: (p) => `Alle ${p} →`,
    storyFallback: (no, t, s) =>
      `Nr. ${no}, „${t}“, ist ein(e) ${s}, die wir in unserer Brünner Werkstatt für einen Kunden im Schleuderguss gefertigt haben — von der Reliefzeichnung und der Form bis zur fertigen Serie.`,
    storyPending: '[Story of the commission — to be written with the client.]',
    zoom: 'Vergrößern',
    close: 'Schließen',
    openLarge: 'Großes Foto öffnen',
  },
  quote: {
    kicker: 'Auftrag · kostenlos & unverbindlich',
    title: ['Ihr Entwurf,', 'in Metall.'],
    lead: 'Sagen Sie uns, was Sie brauchen, und hängen Sie Ihre Vorlage an. Wir antworten mit Preis und Lieferzeit.',
    s1: 'I — Was sollen wir gießen?',
    s2: 'II — Das Stück',
    s3: 'III — Lieferung & Kontakt',
    types: {
      medals: 'Medaillen',
      badges: 'Abzeichen',
      buckles: 'Gürtelschnallen',
      'key-fobs': 'Schlüsselanhänger',
      figures: 'Figuren',
      other: 'Sonstiges',
    },
    minPcs: (n) => `min. ${n} Stück`,
    desc: 'Beschreibung',
    descPh: 'Anlass, Größe, was der Entwurf zeigen soll…',
    qty: 'Menge *',
    minFor: (t, n) => `Mindestmenge für ${t}: ${n} Stück`,
    ref: 'Ähnliches Stück aus dem Archiv',
    refPh: 'Nr. 677',
    files: 'Vorlage, Logo oder Skizze — PDF, AI, SVG, PNG, JPG',
    filesHint: 'Insgesamt bis zu 20 MB.',
    date: 'Benötigt bis *',
    country: 'Lieferland *',
    countries: [
      'Tschechien',
      'Slowakei',
      'Deutschland',
      'Österreich',
      'Polen',
      'Frankreich',
      'Italien',
      'Niederlande',
      'Anderes EU-Land',
      'Außerhalb der EU',
    ],
    name: 'Name & Firma',
    email: 'E-Mail *',
    consent: 'Ihre Angaben werden nur zur Beantwortung dieser Anfrage verwendet.',
    consentLink: 'Datenschutz',
    submit: 'Anfrage senden →',
    sending: 'Wird gesendet…',
    note: 'Mit * markierte Felder sind Pflichtfelder.',
    nextTitle: ['Wie es', 'weitergeht'],
    next: [
      'Wir prüfen Ihre Idee und Ihre Vorlage.',
      'Sie erhalten Preis und Lieferzeit [within X working days].',
      'Wir bereiten den Entwurf zur Freigabe vor und gießen dann die Serie.',
    ],
    talk: 'Lieber telefonieren?',
    required: 'Pflichtfeld',
    okTitle: 'Danke — Ihre Anfrage ist unterwegs.',
    okText: 'Wir haben sie erhalten und antworten per E-Mail mit Preis und Lieferzeit.',
    errTitle: 'Die Anfrage wurde nicht gesendet.',
    errors: {
      turnstile: 'Die Spamprüfung ist nicht abgeschlossen. Warten Sie, bis ein Häkchen erscheint, und senden Sie erneut.',
      too_large: 'Die Anhänge sind zusammen größer als 20 MB. Entfernen Sie Dateien oder senden Sie kleinere Exporte.',
      file_type: 'Eine Datei hat ein nicht unterstütztes Format. Bitte PDF, AI, SVG, PNG oder JPG anhängen.',
      missing: 'Bitte füllen Sie alle mit * markierten Felder aus.',
      qty_min: 'Die Menge liegt unter dem Minimum für diesen Produkttyp. Bitte mindestens die unter dem Feld angegebene Menge eintragen.',
      email: 'Bitte prüfen Sie die E-Mail-Adresse — wir brauchen sie für die Antwort.',
      date: 'Bitte wählen Sie ein Datum in der Zukunft.',
      server: 'Bei uns ist etwas schiefgelaufen. Bitte versuchen Sie es in einer Minute erneut oder schreiben Sie an coufalcr@centrum.cz.',
      network: 'Die Verbindung wurde unterbrochen. Prüfen Sie Ihre Verbindung und senden Sie erneut — nichts ist verloren.',
      consent: 'Bitte bestätigen Sie, dass wir Ihre Angaben zur Beantwortung verwenden dürfen.',
    },
    turnstileLabel: 'Spamprüfung',
  },
  privacy: {
    title: 'Datenschutz',
    updated: 'Stand',
    sections: [
      {
        h: 'Verantwortlicher',
        p: [
          'Verantwortlich für Ihre personenbezogenen Daten ist Richard Coufal — CRdesign, Horova 54, 616 00 Brno, Tschechien, [IČO / VAT ID]. E-Mail: coufalcr@centrum.cz, Telefon +420 603 772 780.',
        ],
      },
      {
        h: 'Welche Daten wir verarbeiten und warum',
        p: [
          'Wenn Sie eine Anfrage senden, verarbeiten wir Ihre Angaben — Name und Firma, E-Mail-Adresse, Lieferland, Beschreibung, Menge, Termin und angehängte Dateien. Wir verwenden sie nur zur Beantwortung Ihrer Anfrage und bei einer Bestellung zu deren Ausführung (Art. 6 Abs. 1 lit. b DSGVO, vorvertragliche Maßnahmen).',
          'Wir nutzen Ihre Daten nicht für Werbung und geben sie nicht an Dritte für deren eigene Zwecke weiter.',
        ],
      },
      {
        h: 'Auftragsverarbeiter',
        p: [
          'Die Website läuft bei Cloudflare (Hosting, Spamschutz mit Cloudflare Turnstile und Speicherung hochgeladener Dateien). Ihre Anfrage wird über Make.com per E-Mail an unsere Werkstatt weitergeleitet. Diese Anbieter handeln als Auftragsverarbeiter.',
        ],
      },
      {
        h: 'Speicherdauer',
        p: [
          'Anfragen ohne Bestellung löschen wir nach [retention period — to be confirmed]. Bestellungen bewahren wir so lange auf, wie es Buchhaltungs- und Steuerrecht verlangen.',
        ],
      },
      {
        h: 'Cookies und Tracking',
        p: [
          'Diese Website verwendet keine Analyse- oder Werbe-Cookies. Schriften werden von unserem eigenen Server geladen. Cloudflare Turnstile kann beim Absenden des Formulars ein technisch notwendiges Cookie setzen.',
        ],
      },
      {
        h: 'Ihre Rechte',
        p: [
          'Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung, Widerspruch und Datenübertragbarkeit. Schreiben Sie an coufalcr@centrum.cz. Sie können sich auch bei der tschechischen Datenschutzbehörde (Úřad pro ochranu osobních údajů, www.uoou.cz) oder Ihrer örtlichen Aufsichtsbehörde beschweren.',
        ],
      },
    ],
  },
  notFound: { title: 'Nicht gefunden', text: 'Diese Seite gibt es nicht — vielleicht wurde sie beim Relaunch verschoben.', back: 'Zur Startseite' },
};

/* ------------------------------------------------------------------ PL -- */

const pl: UI = {
  meta: {
    homeTitle: 'CRdesign — medale, odznaki i klamry odlewane według Twojego projektu',
    homeDesc:
      'Rodzinny warsztat w Brnie: medale, odznaki, klamry do pasków i drobne odlewy z cyny i cynku na zamówienie. Od 10 sztuk, wysyłka w całej Europie.',
    archiveTitle: 'Archiwum medali, odznak i klamer na zamówienie — CRdesign',
    archiveDesc:
      'Każdy odlany przez nas wyrób, ponumerowany jak katalog muzealny: medale, odznaki, klamry, breloki i figurki z cyny i cynku na zamówienie.',
    categoryTitle: (p) => `${p} na zamówienie — archiwum — CRdesign`,
    categoryDesc: (p, n) =>
      `${p} (${n}) odlane dla naszych klientów z cyny i cynku. Przejrzyj archiwum i podaj numer w zapytaniu.`,
    pieceTitle: (no, t, s) => `Nr ${no} ${t} — ${s.toLowerCase()} — CRdesign`,
    pieceDesc: (no, t, s) =>
      `${s} nr ${no} „${t}”, odlewana na zamówienie z cyny lub cynku przez CRdesign w Brnie. Chcesz coś podobnego? Wyślij zapytanie z numerem ${no}.`,
    quoteTitle: 'Wycena medali, odznak i klamer na zamówienie — CRdesign',
    quoteDesc:
      'Opisz, czego potrzebujesz, dołącz projekt i otrzymaj cenę oraz termin realizacji medali, odznak, klamer i breloków. Bezpłatnie i niezobowiązująco.',
    privacyTitle: 'Polityka prywatności — CRdesign',
    privacyDesc: 'Jak CRdesign przetwarza dane osobowe przesłane przez formularz zapytania.',
    notFoundTitle: 'Nie znaleziono strony — CRdesign',
  },
  common: {
    skip: 'Przejdź do treści',
    home: 'Start',
    language: 'Język',
    mainNav: 'Główne',
    menu: 'Menu',
    menuClose: 'Zamknij menu',
    breadcrumb: 'Ścieżka',
    view: 'Zobacz',
    notForSale: 'Wszystkie pokazane wyroby wykonano dla naszych klientów i pozostają ich własnością — nie są na sprzedaż.',
    notForSaleShort: 'Wykonane dla klienta i pozostaje jego własnością — nie jest na sprzedaż.',
    privacy: 'Prywatność',
    photoOf: (no) => `Zdjęcie wyrobu nr ${no}`,
    pcs: (n) => `${n} szt.`,
    from: (n) => `od ${n} szt.`,
    onRequest: 'na zapytanie',
    year: '[rok]',
    metal: '[metal]',
  },
  cat: {
    medals: {
      plural: 'Medale',
      singular: 'Medal',
      desc: 'Medale sportowe, klubowe i jubileuszowe w reliefie.',
      intro:
        'Medale sportowe, klubowe, pamiątkowe i jubileuszowe odlewane odśrodkowo z cyny lub cynku według Twojego projektu. Relief przygotujemy z logo lub szkicu, a serię wykończymy patyną, galwanizacją lub emalią. Medale wykonujemy od 20 sztuk.',
    },
    plaques: {
      plural: 'Plakiety',
      singular: 'Plakieta',
      desc: 'Plakiety reliefowe na nagrody i jubileusze.',
      intro: 'Plakiety reliefowe na nagrody, jubileusze i prezenty firmowe, odlewane z cyny lub cynku według projektu. Minimalna seria na zapytanie.',
    },
    badges: {
      plural: 'Odznaki',
      singular: 'Odznaka',
      desc: 'Odznaki i przypinki.',
      intro:
        'Odznaki, piny i przypinki dla klubów, firm, wydarzeń i instytucji, odlewane z Twojego logo z cyny lub cynku, z galwanizacją lub emalią. Odznaki wykonujemy od 20 sztuk.',
    },
    buckles: {
      plural: 'Klamry do pasków',
      singular: 'Klamra',
      desc: 'Klamry na zamówienie, także z wkładkami.',
      intro:
        'Klamry do pasków na zamówienie dla klubów, motocyklistów, zespołów i marek, z cyny lub cynku, także z wkładkami i kolorową emalią. Klamry wykonujemy od 10 sztuk.',
    },
    'key-fobs': {
      plural: 'Breloki',
      singular: 'Brelok',
      desc: 'Odlewane breloki i zawieszki.',
      intro: 'Metalowe odlewane breloki z Twoim logo lub motywem jako upominki reklamowe lub merch. Breloki wykonujemy od 20 sztuk.',
    },
    figures: {
      plural: 'Figurki',
      singular: 'Figurka',
      desc: 'Figurki, totemy i pionki do gier.',
      intro: 'Małe figurki, totemy i pionki z cyny lub cynku do gier planszowych, dla kolekcjonerów i do promocji. Figurki wykonujemy od 30 sztuk.',
    },
    labels: {
      plural: 'Tabliczki firmowe',
      singular: 'Tabliczka',
      desc: 'Tabliczki z logo na produkty i szkło.',
      intro: 'Odlewane metalowe tabliczki z logo na produkty, opakowania i szkło według projektu firmy. Minimalna seria na zapytanie.',
    },
    other: {
      plural: 'Inne odlewy',
      singular: 'Odlew',
      desc: 'Ozdoby choinkowe i inne.',
      intro: 'Ozdoby choinkowe i inne drobne odlewy, które nie pasują do jednej grupy. Co da się narysować, zwykle da się odlać — od 10 sztuk.',
    },
  },
  home: {
    utilRight: 'Brno — zał. MMI',
    medalLabel: 'Obróć medal, aby zobaczyć rewers',
    medalReverseLabel: 'Obróć medal z powrotem na awers',
    heroMeta: ['Cyna · Cynk · Galwanizacja', 'Przewiń ↓'],
    editorial:
      'Od 2001 roku zamieniamy {chip:677} szkice w *medale* {chip:727}, *odznaki* i *klamry do pasków* {chip:733} — odlewane odśrodkowo z cyny i cynku w naszym rodzinnym warsztacie w Brnie, od pierwszej linii po gotowy wyrób.',
    wallTitle: ['Wybrane', 'zlecenia'],
    wallLink: 'Całe archiwum →',
    indexTitle: 'Indeks',
    indexLead: 'Wszystko odlewamy na zamówienie. Najedź na wiersz, aby zobaczyć podgląd — minimalna seria dla każdej grupy po prawej.',
    processTitle: ['Od linii', 'do metalu'],
    processLead: 'Zobacz, jak powstaje wyrób — albo kliknij krok.',
    steps: [
      ['Projekt', 'Twój szkic, logo lub wzór zamieniamy w rysunek reliefu.'],
      ['Forma', 'Dla wyrobu powstaje forma produkcyjna.'],
      ['Odlew', 'Cyna lub cynk zostaje odlana odśrodkowo do formy.'],
      ['Wykończenie', 'Galwanizacja i ręcznie malowany kolor.'],
      ['Dostawa', 'Pakujemy i wysyłamy do Ciebie, w całej Europie.'],
    ],
    readyToShip: 'GOTOWE DO WYSYŁKI',
    yearsLabel: ['lat przy', 'warsztacie'],
    studio: [
      'Zaczynaliśmy w 2001 roku od ręcznie malowanych obrazków z cyny. W 2004 roku wprowadziliśmy technologię odlewania odśrodkowego cyny i cynku i od tego czasu wytwarzamy drobne odlewy metalowe — klamry do pasków, ozdoby choinkowe, breloki, odznaki, przypinki, medale, logotypy firm, pionki do gier i etykiety na szkło.',
      'Każde zlecenie od projektu po gotowy wyrób, łącznie z galwanizacją.',
    ],
    signature: '— Richard Coufal',
    strip: ['MASZYNA ODLEWNICZA', 'FORMY GUMOWE', 'MALOWANIE RĘCZNE', 'SUROWY ODLEW VS. GOTOWY', 'KĄPIEL GALWANICZNA', 'SPAKOWANA SERIA'],
    stripLabel: 'Zdjęcia z warsztatu — przewiń w bok',
    stripHint: '← Przeciągnij / przewiń warsztat →',
    faqTitle: ['Zanim', 'zamówisz'],
    faq: [
      {
        q: 'Jakie jest minimalne zamówienie?',
        a: 'Od 10 sztuk dla klamer i innych odlewów, 20 dla medali, odznak i breloków oraz 30 dla figurek.',
      },
      {
        q: 'Z jakich metali odlewacie?',
        a: 'Z cyny i cynku metodą odlewania odśrodkowego. Wyroby można wykończyć galwanicznie lub ręcznie malowanym kolorem.',
      },
      {
        q: 'Czy zrobicie medal z naszego logo?',
        a: 'Tak. Pracujemy na podstawie logo, szkicu lub zdjęcia wzoru i prowadzimy zlecenie od projektu po gotowy wyrób.',
      },
      { q: 'Ile trwa produkcja?', a: '[Typical lead time — to be confirmed with the client.]', placeholder: true },
      { q: 'Czy wysyłacie poza Czechy?', a: '[Shipping countries and terms — to be confirmed with the client.]', placeholder: true },
      {
        q: 'Czy mogę kupić pokazane wyroby?',
        a: 'Nie. Każdy pokazany wyrób wykonano dla klienta i pozostaje jego własnością. Pracujemy wyłącznie na zamówienie.',
      },
    ],
    ctaKicker: 'Zamów wyrób',
    ctaTitle: ['Twój projekt,', 'w metalu.'],
    orCall: 'lub zadzwoń',
    ctaRim: 'TWÓJ PROJEKT · W METALU · TWÓJ PROJEKT · W METALU · ',
    footStudio: 'Pracownia',
    footContact: 'Kontakt',
    footArchive: 'Archiwum',
    footLanguages: 'Języki',
    marquee: ['Medale', 'Plakiety', 'Odznaki', 'Klamry', 'Breloki', 'Figurki', 'Tabliczki firmowe', 'Ozdoby'],
  },
  archive: {
    title: 'Archiwum',
    lead: 'Każdy odlany przez nas wyrób, ponumerowany jak katalog muzealny. Każdy ma własną stronę — znajdź ten najbliższy Twojemu pomysłowi i podaj jego numer w zapytaniu.',
    filterLabel: 'Filtruj według produktu',
    all: 'Wszystko',
    empty: '[Pieces in this category will be migrated from the current website.]',
    countLabel: (n) => `${n} wyrobów`,
  },
  piece: {
    catalogueNo: 'Nr katalogowy',
    gallery: 'Zdjęcia',
    roles: { obverse: 'awers', reverse: 'rewers', detail: 'detal', 'in-use': 'w użyciu' },
    client: 'Klient',
    year: 'Rok',
    metal: 'Metal',
    finish: 'Wykończenie',
    size: 'Rozmiar',
    series: 'Seria',
    note: 'Uwaga',
    likeThis: ['Coś', 'podobnego?'],
    startWith: (no) => `Zacznij zapytanie z nr ${no} jako wzorem.`,
    requestQuote: 'Zapytaj o wycenę →',
    more: (p) => ['Więcej', p.toLowerCase()],
    allOf: (p) => `${p} — wszystkie →`,
    storyFallback: (no, t) =>
      `Nr ${no}, „${t}”, odlaliśmy odśrodkowo na zamówienie klienta w naszym warsztacie w Brnie — od rysunku reliefu i formy po gotową serię.`,
    storyPending: '[Story of the commission — to be written with the client.]',
    zoom: 'Powiększ',
    close: 'Zamknij',
    openLarge: 'Otwórz duże zdjęcie',
  },
  quote: {
    kicker: 'Zlecenie · bezpłatnie i niezobowiązująco',
    title: ['Twój projekt,', 'w metalu.'],
    lead: 'Napisz, czego potrzebujesz, i dołącz projekt. Odpowiemy ceną i terminem realizacji.',
    s1: 'I — Co mamy odlać?',
    s2: 'II — Wyrób',
    s3: 'III — Dostawa i kontakt',
    types: { medals: 'Medale', badges: 'Odznaki', buckles: 'Klamry', 'key-fobs': 'Breloki', figures: 'Figurki', other: 'Inne' },
    minPcs: (n) => `min. ${n} szt.`,
    desc: 'Opis',
    descPh: 'Okazja, rozmiar, co ma przedstawiać projekt…',
    qty: 'Liczba sztuk *',
    minFor: (t, n) => `Minimum dla kategorii ${t.toLowerCase()}: ${n} szt.`,
    ref: 'Podobny wyrób z archiwum',
    refPh: 'nr 677',
    files: 'Projekt, logo lub szkic — PDF, AI, SVG, PNG, JPG',
    filesHint: 'Łącznie do 20 MB.',
    date: 'Potrzebne do *',
    country: 'Kraj dostawy *',
    countries: ['Czechy', 'Słowacja', 'Niemcy', 'Austria', 'Polska', 'Francja', 'Włochy', 'Holandia', 'Inny kraj UE', 'Poza UE'],
    name: 'Imię i firma',
    email: 'E-mail *',
    consent: 'Twoje dane wykorzystamy wyłącznie do odpowiedzi na to zapytanie.',
    consentLink: 'Polityka prywatności',
    submit: 'Wyślij zapytanie →',
    sending: 'Wysyłanie…',
    note: 'Pola oznaczone * są wymagane.',
    nextTitle: ['Co', 'dalej'],
    next: [
      'Przeglądamy Twój pomysł i projekt.',
      'Otrzymujesz cenę i termin [within X working days].',
      'Przygotowujemy projekt do akceptacji, a potem odlewamy serię.',
    ],
    talk: 'Wolisz porozmawiać?',
    required: 'wymagane',
    okTitle: 'Dziękujemy — zapytanie zostało wysłane.',
    okText: 'Otrzymaliśmy je i odpowiemy e-mailem z ceną i terminem realizacji.',
    errTitle: 'Zapytanie nie zostało wysłane.',
    errors: {
      turnstile: 'Weryfikacja antyspamowa nie została zakończona. Poczekaj, aż pojawi się znaczek, i wyślij ponownie.',
      too_large: 'Załączniki mają łącznie ponad 20 MB. Usuń część plików lub wyślij mniejsze eksporty.',
      file_type: 'Jeden z plików ma nieobsługiwany format. Dołącz PDF, AI, SVG, PNG lub JPG.',
      missing: 'Wypełnij wszystkie pola oznaczone *.',
      qty_min: 'Liczba sztuk jest poniżej minimum dla tego typu wyrobu. Zwiększ ją co najmniej do minimum podanego pod polem.',
      email: 'Sprawdź adres e-mail — potrzebujemy go do odpowiedzi.',
      date: 'Wybierz datę w przyszłości.',
      server: 'Coś poszło nie tak po naszej stronie. Spróbuj ponownie za minutę lub napisz na coufalcr@centrum.cz.',
      network: 'Połączenie zostało przerwane. Sprawdź internet i wyślij ponownie — nic nie zginęło.',
      consent: 'Potwierdź, że możemy wykorzystać Twoje dane do odpowiedzi.',
    },
    turnstileLabel: 'Weryfikacja antyspamowa',
  },
  privacy: {
    title: 'Prywatność',
    updated: 'Aktualizacja',
    sections: [
      {
        h: 'Administrator',
        p: [
          'Administratorem Twoich danych osobowych jest Richard Coufal — CRdesign, Horova 54, 616 00 Brno, Czechy, [IČO / VAT ID]. E-mail: coufalcr@centrum.cz, telefon +420 603 772 780.',
        ],
      },
      {
        h: 'Jakie dane przetwarzamy i dlaczego',
        p: [
          'Gdy wysyłasz zapytanie, przetwarzamy podane dane — imię i firmę, e-mail, kraj dostawy, opis wyrobu, liczbę sztuk, termin i załączone pliki. Wykorzystujemy je wyłącznie do odpowiedzi na zapytanie, a w razie zamówienia do jego realizacji (art. 6 ust. 1 lit. b RODO).',
          'Nie wykorzystujemy danych do marketingu i nie przekazujemy ich innym podmiotom do ich własnych celów.',
        ],
      },
      {
        h: 'Podmioty przetwarzające',
        p: [
          'Strona działa w usługach Cloudflare (hosting, ochrona antyspamowa Cloudflare Turnstile i przechowywanie przesłanych plików). Zapytanie trafia do warsztatu e-mailem za pośrednictwem Make.com. Dostawcy ci działają jako podmioty przetwarzające.',
        ],
      },
      { h: 'Okres przechowywania', p: ['Zapytania, które nie prowadzą do zamówienia, usuwamy po [retention period — to be confirmed]. Zamówienia przechowujemy tak długo, jak wymagają przepisy rachunkowe i podatkowe.'] },
      {
        h: 'Cookies i śledzenie',
        p: [
          'Strona nie używa analitycznych ani reklamowych plików cookie. Czcionki ładowane są z naszego serwera. Cloudflare Turnstile może ustawić niezbędne cookie podczas wysyłania formularza.',
        ],
      },
      {
        h: 'Twoje prawa',
        p: [
          'Masz prawo dostępu do danych, ich sprostowania, usunięcia, ograniczenia przetwarzania, sprzeciwu i przenoszenia. Napisz na coufalcr@centrum.cz. Możesz też złożyć skargę do czeskiego organu nadzorczego (Úřad pro ochranu osobních údajů, www.uoou.cz) lub do Prezesa UODO.',
        ],
      },
    ],
  },
  notFound: { title: 'Nie znaleziono', text: 'Ta strona nie istnieje — być może przeniesiono ją podczas przebudowy.', back: 'Wróć na stronę główną' },
};

/* ------------------------------------------------------------------ FR -- */

const fr: UI = {
  meta: {
    homeTitle: 'CRdesign — Médailles, insignes et boucles de ceinture coulés selon votre dessin',
    homeDesc:
      'Atelier familial à Brno : médailles, insignes, boucles de ceinture et petites pièces coulées en étain et en zinc sur mesure. Dès 10 pièces, livraison dans toute l’Europe.',
    archiveTitle: 'Archives de médailles, insignes et boucles sur mesure — CRdesign',
    archiveDesc:
      'Chaque pièce que nous avons coulée, numérotée comme un catalogue de musée : médailles, insignes, boucles, porte-clés et figurines sur mesure.',
    categoryTitle: (p) => `${p} sur mesure — archives — CRdesign`,
    categoryDesc: (p, n) =>
      `${p} (${n}) coulés en étain et en zinc pour nos clients. Parcourez les archives et indiquez le numéro dans votre demande.`,
    pieceTitle: (no, t, s) => `N° ${no} ${t} — ${s.toLowerCase()} — CRdesign`,
    pieceDesc: (no, t, s) =>
      `${s} n° ${no} « ${t} », coulée sur mesure en étain ou en zinc par CRdesign à Brno. Envie de quelque chose de semblable ? Demandez un devis avec le n° ${no}.`,
    quoteTitle: 'Devis pour médailles, insignes et boucles sur mesure — CRdesign',
    quoteDesc:
      'Décrivez votre besoin, joignez votre visuel et recevez un prix et un délai pour des médailles, insignes, boucles de ceinture et porte-clés coulés. Gratuit et sans engagement.',
    privacyTitle: 'Confidentialité — CRdesign',
    privacyDesc: 'Comment CRdesign traite les données personnelles envoyées via le formulaire de devis.',
    notFoundTitle: 'Page introuvable — CRdesign',
  },
  common: {
    skip: 'Aller au contenu',
    home: 'Accueil',
    language: 'Langue',
    mainNav: 'Principal',
    menu: 'Menu',
    menuClose: 'Fermer le menu',
    breadcrumb: 'Fil d’Ariane',
    view: 'Voir',
    notForSale: 'Toutes les pièces présentées ont été réalisées pour nos clients et restent leur propriété — elles ne sont pas à vendre.',
    notForSaleShort: 'Réalisée pour un client et reste sa propriété — pas à vendre.',
    privacy: 'Confidentialité',
    photoOf: (no) => `Photo de la pièce n° ${no}`,
    pcs: (n) => `${n} pcs`,
    from: (n) => `dès ${n} pcs`,
    onRequest: 'sur demande',
    year: '[année]',
    metal: '[métal]',
  },
  cat: {
    medals: {
      plural: 'Médailles',
      singular: 'Médaille',
      desc: 'Médailles sportives, de club et commémoratives en relief.',
      intro:
        'Médailles sportives, de club, commémoratives et d’anniversaire, coulées par centrifugation en étain ou en zinc selon votre dessin. Le relief est créé à partir de votre logo ou croquis ; chaque série reçoit une patine, une galvanisation ou de l’émail. Médailles sur mesure dès 20 pièces.',
    },
    plaques: {
      plural: 'Plaques',
      singular: 'Plaque',
      desc: 'Plaques en relief pour récompenses et anniversaires.',
      intro: 'Plaques en relief pour récompenses, anniversaires et cadeaux d’entreprise, coulées en étain ou en zinc selon votre dessin. Série minimale sur demande.',
    },
    badges: {
      plural: 'Insignes & pin’s',
      singular: 'Insigne',
      desc: 'Insignes de revers et broches.',
      intro:
        'Insignes, pin’s et broches pour clubs, entreprises, événements et institutions, coulés à partir de votre logo en étain ou en zinc, galvanisés ou émaillés. Insignes sur mesure dès 20 pièces.',
    },
    buckles: {
      plural: 'Boucles de ceinture',
      singular: 'Boucle de ceinture',
      desc: 'Boucles sur mesure, aussi avec incrustations.',
      intro:
        'Boucles de ceinture sur mesure pour clubs, motards, groupes et marques, en étain ou en zinc, aussi avec incrustations et émail coloré. Dès 10 pièces.',
    },
    'key-fobs': {
      plural: 'Porte-clés',
      singular: 'Porte-clés',
      desc: 'Porte-clés et pendentifs coulés.',
      intro: 'Porte-clés en métal coulé avec votre logo ou motif, comme cadeaux publicitaires ou merchandising. Dès 20 pièces.',
    },
    figures: {
      plural: 'Figurines',
      singular: 'Figurine',
      desc: 'Figurines, totems et pions de jeu.',
      intro: 'Petites figurines, totems et pions de jeu en étain ou en zinc pour jeux de société, collectionneurs et promotions. Dès 30 pièces.',
    },
    labels: {
      plural: 'Étiquettes d’entreprise',
      singular: 'Étiquette',
      desc: 'Étiquettes logo pour produits et verrerie.',
      intro: 'Étiquettes logo en métal coulé pour produits, emballages et verrerie, selon le design de votre entreprise. Série minimale sur demande.',
    },
    other: {
      plural: 'Autres pièces',
      singular: 'Pièce coulée',
      desc: 'Décorations de Noël et plus.',
      intro: 'Décorations de Noël et autres petites pièces coulées qui n’entrent dans aucune famille. Si cela se dessine, nous pouvons sans doute le couler — dès 10 pièces.',
    },
  },
  home: {
    utilRight: 'Brno — fondé MMI',
    medalLabel: 'Retourner la médaille pour voir le revers',
    medalReverseLabel: 'Remettre la médaille côté face',
    heroMeta: ['Étain · Zinc · Finition galvanique', 'Défiler ↓'],
    editorial:
      'Depuis 2001, nous transformons {chip:677} des croquis en *médailles* {chip:727}, *insignes* et *boucles de ceinture* {chip:733} — coulés par centrifugation en étain et en zinc dans notre atelier familial de Brno, du premier trait à la pièce finie.',
    wallTitle: ['Commandes', 'choisies'],
    wallLink: 'Toutes les archives →',
    indexTitle: 'Index',
    indexLead: 'Tout ce que nous coulons est fait sur commande. Survolez une ligne pour un aperçu — série minimale par famille à droite.',
    processTitle: ['Du trait', 'au métal'],
    processLead: 'Regardez une pièce prendre forme — ou cliquez sur une étape.',
    steps: [
      ['Dessin', 'Votre croquis, logo ou modèle devient un dessin en relief.'],
      ['Moule', 'Un moule de production est réalisé pour la pièce.'],
      ['Coulée', 'L’étain ou le zinc est coulé par centrifugation dans le moule.'],
      ['Finition', 'Galvanisation et couleur peinte à la main.'],
      ['Livraison', 'Emballée et expédiée chez vous, dans toute l’Europe.'],
    ],
    readyToShip: 'PRÊT À EXPÉDIER',
    yearsLabel: ['ans à', 'l’établi'],
    studio: [
      'Nous avons commencé en 2001 en peignant à la main des tableaux en étain. En 2004, nous avons adopté la coulée centrifuge de l’étain et du zinc et, depuis, nous fabriquons de petites pièces métalliques — boucles de ceinture, décorations de Noël, porte-clés, insignes, broches, médailles, logos d’entreprise, pions de jeu et étiquettes pour la verrerie.',
      'Chaque commande, de la création au produit fini, galvanisation comprise.',
    ],
    signature: '— Richard Coufal',
    strip: ['LA MACHINE DE COULÉE', 'MOULES EN CAOUTCHOUC', 'PEINTURE À LA MAIN', 'BRUT VS. FINI', 'BAIN GALVANIQUE', 'SÉRIE EMBALLÉE'],
    stripLabel: 'Photos de l’atelier — faites défiler',
    stripHint: '← Glissez / parcourez l’atelier →',
    faqTitle: ['Avant', 'de commander'],
    faq: [
      {
        q: 'Quelle est la commande minimale ?',
        a: 'Dès 10 pièces pour les boucles de ceinture et autres pièces, 20 pour les médailles, insignes et porte-clés, et 30 pour les figurines.',
      },
      {
        q: 'Quels métaux coulez-vous ?',
        a: 'L’étain et le zinc, par coulée centrifuge. Les pièces peuvent être galvanisées ou peintes à la main.',
      },
      {
        q: 'Pouvez-vous faire une médaille à partir de notre logo ?',
        a: 'Oui. Nous travaillons à partir de votre logo, d’un croquis ou d’une photo et menons la commande de la création au produit fini.',
      },
      { q: 'Quel est le délai de fabrication ?', a: '[Typical lead time — to be confirmed with the client.]', placeholder: true },
      { q: 'Livrez-vous hors de la République tchèque ?', a: '[Shipping countries and terms — to be confirmed with the client.]', placeholder: true },
      {
        q: 'Puis-je acheter les pièces présentées ?',
        a: 'Non. Chaque pièce présentée a été réalisée pour un client et reste sa propriété. Nous ne travaillons que sur mesure.',
      },
    ],
    ctaKicker: 'Commander une pièce',
    ctaTitle: ['Votre dessin,', 'en métal.'],
    orCall: 'ou appelez',
    ctaRim: 'VOTRE DESSIN · EN MÉTAL · VOTRE DESSIN · EN MÉTAL · ',
    footStudio: 'Atelier',
    footContact: 'Contact',
    footArchive: 'Archives',
    footLanguages: 'Langues',
    marquee: ['Médailles', 'Plaques', 'Insignes', 'Boucles', 'Porte-clés', 'Figurines', 'Étiquettes', 'Ornements'],
  },
  archive: {
    title: 'Archives',
    lead: 'Chaque pièce que nous avons coulée, numérotée comme un catalogue de musée. Chacune a sa page — trouvez celle qui se rapproche de votre idée et indiquez son numéro dans votre demande.',
    filterLabel: 'Filtrer par produit',
    all: 'Tout',
    empty: '[Pieces in this category will be migrated from the current website.]',
    countLabel: (n) => `${n} pièces`,
  },
  piece: {
    catalogueNo: 'N° de catalogue',
    gallery: 'Photos',
    roles: { obverse: 'avers', reverse: 'revers', detail: 'détail', 'in-use': 'en situation' },
    client: 'Client',
    year: 'Année',
    metal: 'Métal',
    finish: 'Finition',
    size: 'Taille',
    series: 'Série',
    note: 'Remarque',
    likeThis: ['Quelque chose', 'de semblable ?'],
    startWith: (no) => `Commencez une demande avec le n° ${no} comme référence.`,
    requestQuote: 'Demander un devis →',
    more: (p) => ['Autres', p.toLowerCase()],
    allOf: (p) => `${p} — tout voir →`,
    storyFallback: (no, t) =>
      `Le n° ${no}, « ${t} », a été coulé par centrifugation sur commande d’un client dans notre atelier de Brno — du dessin en relief et du moule jusqu’à la série finie.`,
    storyPending: '[Story of the commission — to be written with the client.]',
    zoom: 'Agrandir',
    close: 'Fermer',
    openLarge: 'Ouvrir la grande photo',
  },
  quote: {
    kicker: 'Commande · gratuit et sans engagement',
    title: ['Votre dessin,', 'en métal.'],
    lead: 'Dites-nous ce dont vous avez besoin et joignez vos visuels. Nous répondons avec un prix et un délai.',
    s1: 'I — Que devons-nous couler ?',
    s2: 'II — La pièce',
    s3: 'III — Livraison et contact',
    types: { medals: 'Médailles', badges: 'Insignes', buckles: 'Boucles', 'key-fobs': 'Porte-clés', figures: 'Figurines', other: 'Autre' },
    minPcs: (n) => `min. ${n} pcs`,
    desc: 'Description',
    descPh: 'Occasion, taille, ce que le dessin doit montrer…',
    qty: 'Quantité *',
    minFor: (t, n) => `Minimum pour ${t.toLowerCase()} : ${n} pcs`,
    ref: 'Pièce similaire des archives',
    refPh: 'n° 677',
    files: 'Visuel, logo ou croquis — PDF, AI, SVG, PNG, JPG',
    filesHint: '20 Mo au total maximum.',
    date: 'Pour le *',
    country: 'Pays de livraison *',
    countries: [
      'République tchèque',
      'Slovaquie',
      'Allemagne',
      'Autriche',
      'Pologne',
      'France',
      'Italie',
      'Pays-Bas',
      'Autre pays de l’UE',
      'Hors UE',
    ],
    name: 'Nom et société',
    email: 'E-mail *',
    consent: 'Vos données servent uniquement à répondre à cette demande.',
    consentLink: 'Politique de confidentialité',
    submit: 'Envoyer la demande →',
    sending: 'Envoi…',
    note: 'Les champs marqués * sont obligatoires.',
    nextTitle: ['Et', 'ensuite'],
    next: [
      'Nous étudions votre idée et vos visuels.',
      'Vous recevez un prix et un délai [within X working days].',
      'Nous préparons le dessin pour validation, puis coulons la série.',
    ],
    talk: 'Vous préférez en parler ?',
    required: 'obligatoire',
    okTitle: 'Merci — votre demande est partie.',
    okText: 'Nous l’avons reçue et répondrons par e-mail avec un prix et un délai.',
    errTitle: 'La demande n’a pas été envoyée.',
    errors: {
      turnstile: 'La vérification anti-spam n’est pas terminée. Attendez la coche, puis renvoyez.',
      too_large: 'Les fichiers joints dépassent 20 Mo au total. Retirez-en ou envoyez des exports plus légers.',
      file_type: 'Un fichier a un format non pris en charge. Joignez un PDF, AI, SVG, PNG ou JPG.',
      missing: 'Merci de remplir tous les champs marqués *.',
      qty_min: 'La quantité est inférieure au minimum pour ce type de produit. Indiquez au moins le minimum affiché sous le champ.',
      email: 'Vérifiez l’adresse e-mail — nous en avons besoin pour répondre.',
      date: 'Choisissez une date future.',
      server: 'Un problème est survenu chez nous. Réessayez dans une minute ou écrivez à coufalcr@centrum.cz.',
      network: 'La connexion a été interrompue. Vérifiez votre connexion et renvoyez — rien n’est perdu.',
      consent: 'Merci de confirmer que nous pouvons utiliser vos données pour vous répondre.',
    },
    turnstileLabel: 'Vérification anti-spam',
  },
  privacy: {
    title: 'Confidentialité',
    updated: 'Mise à jour',
    sections: [
      {
        h: 'Responsable du traitement',
        p: [
          'Le responsable du traitement est Richard Coufal — CRdesign, Horova 54, 616 00 Brno, République tchèque, [IČO / VAT ID]. E-mail : coufalcr@centrum.cz, téléphone +420 603 772 780.',
        ],
      },
      {
        h: 'Données traitées et finalités',
        p: [
          'Lorsque vous envoyez une demande, nous traitons les informations saisies — nom et société, e-mail, pays de livraison, description, quantité, date et fichiers joints — uniquement pour y répondre et, en cas de commande, pour l’exécuter (art. 6, par. 1, point b du RGPD).',
          'Nous n’utilisons pas vos données à des fins marketing et ne les transmettons à personne pour ses propres fins.',
        ],
      },
      {
        h: 'Sous-traitants',
        p: [
          'Le site est hébergé par Cloudflare (hébergement, protection anti-spam Cloudflare Turnstile et stockage des fichiers). Votre demande est transmise à l’atelier par e-mail via Make.com. Ces prestataires agissent en tant que sous-traitants.',
        ],
      },
      { h: 'Durée de conservation', p: ['Les demandes sans commande sont supprimées après [retention period — to be confirmed]. Les commandes sont conservées le temps exigé par le droit comptable et fiscal.'] },
      {
        h: 'Cookies et suivi',
        p: [
          'Ce site n’utilise aucun cookie d’analyse ou publicitaire. Les polices sont servies depuis notre serveur. Cloudflare Turnstile peut déposer un cookie strictement nécessaire lors de l’envoi du formulaire.',
        ],
      },
      {
        h: 'Vos droits',
        p: [
          'Vous disposez d’un droit d’accès, de rectification, d’effacement, de limitation, d’opposition et de portabilité. Écrivez à coufalcr@centrum.cz. Vous pouvez aussi saisir l’autorité tchèque (Úřad pro ochranu osobních údajů, www.uoou.cz) ou la CNIL.',
        ],
      },
    ],
  },
  notFound: { title: 'Introuvable', text: 'Cette page n’existe pas — elle a peut-être été déplacée lors de la refonte.', back: 'Retour à l’accueil' },
};

/* ------------------------------------------------------------------ IT -- */

const it: UI = {
  meta: {
    homeTitle: 'CRdesign — Medaglie, distintivi e fibbie fusi sul tuo disegno',
    homeDesc:
      'Laboratorio di famiglia a Brno: medaglie, distintivi, fibbie per cinture e piccole fusioni in stagno e zinco su misura. Da 10 pezzi, spedizione in tutta Europa.',
    archiveTitle: 'Archivio di medaglie, distintivi e fibbie su misura — CRdesign',
    archiveDesc:
      'Ogni pezzo che abbiamo fuso, numerato come un catalogo museale: medaglie, distintivi, fibbie, portachiavi e figure su misura in stagno e zinco.',
    categoryTitle: (p) => `${p} su misura — archivio — CRdesign`,
    categoryDesc: (p, n) =>
      `${p} (${n}) fusi in stagno e zinco per i nostri clienti. Sfoglia l’archivio e indica il numero nella tua richiesta.`,
    pieceTitle: (no, t, s) => `N. ${no} ${t} — ${s.toLowerCase()} — CRdesign`,
    pieceDesc: (no, t, s) =>
      `${s} n. ${no} «${t}», fusa su misura in stagno o zinco da CRdesign a Brno. Vuoi qualcosa di simile? Chiedi un preventivo con il n. ${no}.`,
    quoteTitle: 'Preventivo per medaglie, distintivi e fibbie su misura — CRdesign',
    quoteDesc:
      'Descrivi cosa ti serve, allega il tuo disegno e ricevi prezzo e tempi per medaglie, distintivi, fibbie e portachiavi fusi. Gratis e senza impegno.',
    privacyTitle: 'Privacy — CRdesign',
    privacyDesc: 'Come CRdesign tratta i dati personali inviati tramite il modulo di preventivo.',
    notFoundTitle: 'Pagina non trovata — CRdesign',
  },
  common: {
    skip: 'Vai al contenuto',
    home: 'Home',
    language: 'Lingua',
    mainNav: 'Principale',
    menu: 'Menu',
    menuClose: 'Chiudi menu',
    breadcrumb: 'Percorso',
    view: 'Vedi',
    notForSale: 'Tutti i pezzi mostrati sono stati realizzati per i nostri clienti e restano di loro proprietà — non sono in vendita.',
    notForSaleShort: 'Realizzato per un cliente e resta di sua proprietà — non in vendita.',
    privacy: 'Privacy',
    photoOf: (no) => `Foto del pezzo n. ${no}`,
    pcs: (n) => `${n} pz`,
    from: (n) => `da ${n} pz`,
    onRequest: 'su richiesta',
    year: '[anno]',
    metal: '[metallo]',
  },
  cat: {
    medals: {
      plural: 'Medaglie',
      singular: 'Medaglia',
      desc: 'Medaglie sportive, di club e commemorative in rilievo.',
      intro:
        'Medaglie sportive, di club, commemorative e per anniversari, in fusione centrifuga di stagno o zinco sul tuo disegno. Il rilievo nasce dal tuo logo o schizzo; ogni serie è rifinita con patina, galvanica o smalto. Medaglie su misura da 20 pezzi.',
    },
    plaques: {
      plural: 'Placche',
      singular: 'Placca',
      desc: 'Placche in rilievo per premi e anniversari.',
      intro: 'Placche in rilievo per premi, anniversari e regali aziendali, fuse in stagno o zinco sul tuo disegno. Serie minima su richiesta.',
    },
    badges: {
      plural: 'Distintivi e spille',
      singular: 'Distintivo',
      desc: 'Distintivi da bavero e spille.',
      intro:
        'Distintivi, pin e spille per club, aziende, eventi e istituzioni, fusi dal tuo logo in stagno o zinco e rifiniti con galvanica o smalto. Distintivi su misura da 20 pezzi.',
    },
    buckles: {
      plural: 'Fibbie per cinture',
      singular: 'Fibbia',
      desc: 'Fibbie su misura, anche con inserti.',
      intro: 'Fibbie per cinture su misura per club, motociclisti, band e marchi, in stagno o zinco, anche con inserti e smalto colorato. Da 10 pezzi.',
    },
    'key-fobs': {
      plural: 'Portachiavi',
      singular: 'Portachiavi',
      desc: 'Portachiavi e ciondoli fusi.',
      intro: 'Portachiavi in metallo fuso con il tuo logo o motivo, come gadget promozionali o merchandising. Da 20 pezzi.',
    },
    figures: {
      plural: 'Figure e pedine',
      singular: 'Figura',
      desc: 'Figurine, totem e pedine da gioco.',
      intro: 'Piccole figure, totem e pedine in stagno o zinco per giochi da tavolo, collezionisti e promozioni. Da 30 pezzi.',
    },
    labels: {
      plural: 'Targhette aziendali',
      singular: 'Targhetta',
      desc: 'Targhette con logo per prodotti e vetro.',
      intro: 'Targhette con logo in metallo fuso per prodotti, confezioni e vetro, sul design della tua azienda. Serie minima su richiesta.',
    },
    other: {
      plural: 'Altre fusioni',
      singular: 'Fusione',
      desc: 'Decorazioni natalizie e altro.',
      intro: 'Decorazioni natalizie e altre piccole fusioni che non rientrano in una famiglia. Se si può disegnare, probabilmente si può fondere — da 10 pezzi.',
    },
  },
  home: {
    utilRight: 'Brno — fond. MMI',
    medalLabel: 'Gira la medaglia per vedere il rovescio',
    medalReverseLabel: 'Rigira la medaglia sul dritto',
    heroMeta: ['Stagno · Zinco · Finitura galvanica', 'Scorri ↓'],
    editorial:
      'Dal 2001 trasformiamo {chip:677} schizzi in *medaglie* {chip:727}, *distintivi* e *fibbie per cinture* {chip:733} — in fusione centrifuga di stagno e zinco nel nostro laboratorio di famiglia a Brno, dalla prima linea al pezzo finito.',
    wallTitle: ['Commesse', 'scelte'],
    wallLink: 'Tutto l’archivio →',
    indexTitle: 'Indice',
    indexLead: 'Tutto ciò che fondiamo è su ordinazione. Passa su una riga per l’anteprima — serie minima per famiglia a destra.',
    processTitle: ['Dalla linea', 'al metallo'],
    processLead: 'Guarda un pezzo prendere forma — o fai clic su un passaggio.',
    steps: [
      ['Disegno', 'Il tuo schizzo, logo o riferimento diventa un disegno in rilievo.'],
      ['Stampo', 'Per il pezzo viene realizzato uno stampo di produzione.'],
      ['Fusione', 'Stagno o zinco vengono fusi per centrifugazione nello stampo.'],
      ['Finitura', 'Galvanica e colore dipinto a mano.'],
      ['Consegna', 'Imballato e spedito a te, in tutta Europa.'],
    ],
    readyToShip: 'PRONTO PER LA SPEDIZIONE',
    yearsLabel: ['anni al', 'banco'],
    studio: [
      'Abbiamo iniziato nel 2001 dipingendo a mano quadretti in stagno. Nel 2004 abbiamo introdotto la fusione centrifuga di stagno e zinco e da allora realizziamo piccole fusioni in metallo — fibbie per cinture, decorazioni natalizie, portachiavi, distintivi, spille, medaglie, loghi aziendali, pedine da gioco ed etichette per il vetro.',
      'Ogni lavoro dall’ideazione al prodotto finito, galvanica compresa.',
    ],
    signature: '— Richard Coufal',
    strip: ['LA MACCHINA DI FUSIONE', 'STAMPI IN GOMMA', 'PITTURA A MANO', 'GREZZO VS. FINITO', 'BAGNO GALVANICO', 'SERIE IMBALLATA'],
    stripLabel: 'Foto del laboratorio — scorri di lato',
    stripHint: '← Trascina / scorri il laboratorio →',
    faqTitle: ['Prima', 'di ordinare'],
    faq: [
      {
        q: 'Qual è l’ordine minimo?',
        a: 'Da 10 pezzi per fibbie e altre fusioni, 20 per medaglie, distintivi e portachiavi, 30 per le figure.',
      },
      {
        q: 'Quali metalli fondete?',
        a: 'Stagno e zinco, con fusione centrifuga. I pezzi possono essere rifiniti con galvanica o colore dipinto a mano.',
      },
      {
        q: 'Potete fare una medaglia dal nostro logo?',
        a: 'Sì. Lavoriamo dal tuo logo, da uno schizzo o da una foto di riferimento e seguiamo il lavoro dall’ideazione al prodotto finito.',
      },
      { q: 'Quanto dura la produzione?', a: '[Typical lead time — to be confirmed with the client.]', placeholder: true },
      { q: 'Spedite fuori dalla Repubblica Ceca?', a: '[Shipping countries and terms — to be confirmed with the client.]', placeholder: true },
      {
        q: 'Posso comprare i pezzi mostrati?',
        a: 'No. Ogni pezzo mostrato è stato realizzato per un cliente e resta di sua proprietà. Lavoriamo solo su misura.',
      },
    ],
    ctaKicker: 'Commissiona un pezzo',
    ctaTitle: ['Il tuo disegno,', 'in metallo.'],
    orCall: 'oppure chiama',
    ctaRim: 'IL TUO DISEGNO · IN METALLO · IL TUO DISEGNO · IN METALLO · ',
    footStudio: 'Laboratorio',
    footContact: 'Contatti',
    footArchive: 'Archivio',
    footLanguages: 'Lingue',
    marquee: ['Medaglie', 'Placche', 'Distintivi', 'Fibbie', 'Portachiavi', 'Figure', 'Targhette', 'Decorazioni'],
  },
  archive: {
    title: 'Archivio',
    lead: 'Ogni pezzo che abbiamo fuso, numerato come un catalogo museale. Ognuno ha la sua pagina — trova quello più vicino alla tua idea e indica il suo numero nella richiesta.',
    filterLabel: 'Filtra per prodotto',
    all: 'Tutti',
    empty: '[Pieces in this category will be migrated from the current website.]',
    countLabel: (n) => `${n} pezzi`,
  },
  piece: {
    catalogueNo: 'N. di catalogo',
    gallery: 'Foto',
    roles: { obverse: 'dritto', reverse: 'rovescio', detail: 'dettaglio', 'in-use': 'in uso' },
    client: 'Cliente',
    year: 'Anno',
    metal: 'Metallo',
    finish: 'Finitura',
    size: 'Dimensioni',
    series: 'Serie',
    note: 'Nota',
    likeThis: ['Qualcosa', 'di simile?'],
    startWith: (no) => `Inizia una richiesta con il n. ${no} come riferimento.`,
    requestQuote: 'Richiedi un preventivo →',
    more: (p) => ['Altre', p.toLowerCase()],
    allOf: (p) => `${p} — tutti →`,
    storyFallback: (no, t) =>
      `Il n. ${no}, «${t}», è stato fuso per centrifugazione su ordinazione di un cliente nel nostro laboratorio di Brno — dal disegno in rilievo e dallo stampo fino alla serie finita.`,
    storyPending: '[Story of the commission — to be written with the client.]',
    zoom: 'Ingrandisci',
    close: 'Chiudi',
    openLarge: 'Apri la foto grande',
  },
  quote: {
    kicker: 'Commessa · gratis e senza impegno',
    title: ['Il tuo disegno,', 'in metallo.'],
    lead: 'Dicci cosa ti serve e allega i tuoi file. Rispondiamo con prezzo e tempi di consegna.',
    s1: 'I — Cosa dobbiamo fondere?',
    s2: 'II — Il pezzo',
    s3: 'III — Consegna e contatto',
    types: { medals: 'Medaglie', badges: 'Distintivi', buckles: 'Fibbie', 'key-fobs': 'Portachiavi', figures: 'Figure', other: 'Altro' },
    minPcs: (n) => `min. ${n} pz`,
    desc: 'Descrizione',
    descPh: 'Occasione, dimensioni, cosa deve mostrare il disegno…',
    qty: 'Quantità *',
    minFor: (t, n) => `Minimo per ${t.toLowerCase()}: ${n} pz`,
    ref: 'Pezzo simile dall’archivio',
    refPh: 'n. 677',
    files: 'Disegno, logo o schizzo — PDF, AI, SVG, PNG, JPG',
    filesHint: 'Fino a 20 MB in totale.',
    date: 'Serve entro il *',
    country: 'Paese di consegna *',
    countries: [
      'Repubblica Ceca',
      'Slovacchia',
      'Germania',
      'Austria',
      'Polonia',
      'Francia',
      'Italia',
      'Paesi Bassi',
      'Altro paese UE',
      'Fuori dall’UE',
    ],
    name: 'Nome e azienda',
    email: 'E-mail *',
    consent: 'I tuoi dati servono solo a rispondere a questa richiesta.',
    consentLink: 'Informativa privacy',
    submit: 'Invia richiesta →',
    sending: 'Invio…',
    note: 'I campi con * sono obbligatori.',
    nextTitle: ['Cosa', 'succede ora'],
    next: [
      'Esaminiamo la tua idea e i file.',
      'Ricevi prezzo e tempi [within X working days].',
      'Prepariamo il disegno per la tua approvazione, poi fondiamo la serie.',
    ],
    talk: 'Preferisci parlarne?',
    required: 'obbligatorio',
    okTitle: 'Grazie — la tua richiesta è partita.',
    okText: 'L’abbiamo ricevuta e risponderemo via e-mail con prezzo e tempi.',
    errTitle: 'La richiesta non è stata inviata.',
    errors: {
      turnstile: 'Il controllo antispam non è terminato. Attendi la spunta e invia di nuovo.',
      too_large: 'I file allegati superano 20 MB in totale. Rimuovine alcuni o invia esportazioni più leggere.',
      file_type: 'Un file ha un formato non supportato. Allega PDF, AI, SVG, PNG o JPG.',
      missing: 'Compila tutti i campi contrassegnati da *.',
      qty_min: 'La quantità è sotto il minimo per questo tipo di prodotto. Indica almeno il minimo mostrato sotto il campo.',
      email: 'Controlla l’indirizzo e-mail — ci serve per risponderti.',
      date: 'Scegli una data futura.',
      server: 'Qualcosa è andato storto da parte nostra. Riprova tra un minuto o scrivi a coufalcr@centrum.cz.',
      network: 'La connessione si è interrotta. Controlla la rete e invia di nuovo — non è andato perso nulla.',
      consent: 'Conferma che possiamo usare i tuoi dati per risponderti.',
    },
    turnstileLabel: 'Controllo antispam',
  },
  privacy: {
    title: 'Privacy',
    updated: 'Aggiornamento',
    sections: [
      {
        h: 'Titolare del trattamento',
        p: [
          'Il titolare dei tuoi dati personali è Richard Coufal — CRdesign, Horova 54, 616 00 Brno, Repubblica Ceca, [IČO / VAT ID]. E-mail: coufalcr@centrum.cz, telefono +420 603 772 780.',
        ],
      },
      {
        h: 'Quali dati trattiamo e perché',
        p: [
          'Quando invii una richiesta trattiamo i dati inseriti — nome e azienda, e-mail, paese di consegna, descrizione, quantità, data e file allegati — solo per rispondere e, in caso di ordine, per eseguirlo (art. 6, par. 1, lett. b GDPR).',
          'Non usiamo i tuoi dati per marketing e non li cediamo a terzi per loro finalità.',
        ],
      },
      {
        h: 'Responsabili del trattamento',
        p: [
          'Il sito funziona su Cloudflare (hosting, protezione antispam Cloudflare Turnstile e archiviazione dei file caricati). La richiesta arriva al laboratorio via e-mail tramite Make.com. Questi fornitori agiscono come responsabili del trattamento.',
        ],
      },
      { h: 'Conservazione', p: ['Le richieste che non portano a un ordine vengono cancellate dopo [retention period — to be confirmed]. Gli ordini sono conservati per il tempo richiesto dalle norme contabili e fiscali.'] },
      {
        h: 'Cookie e tracciamento',
        p: [
          'Questo sito non usa cookie analitici o pubblicitari. I font sono serviti dal nostro server. Cloudflare Turnstile può impostare un cookie strettamente necessario all’invio del modulo.',
        ],
      },
      {
        h: 'I tuoi diritti',
        p: [
          'Hai diritto di accesso, rettifica, cancellazione, limitazione, opposizione e portabilità. Scrivi a coufalcr@centrum.cz. Puoi anche presentare reclamo all’autorità ceca (Úřad pro ochranu osobních údajů, www.uoou.cz) o al Garante privacy.',
        ],
      },
    ],
  },
  notFound: { title: 'Non trovato', text: 'Questa pagina non esiste — forse è stata spostata durante il restyling.', back: 'Torna alla home' },
};

export const UI_STRINGS: Record<Lang, UI> = { en, de, cs, pl, fr, it };
export const t = (lang: Lang) => UI_STRINGS[lang];
