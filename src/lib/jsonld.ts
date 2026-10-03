import type { Lang } from '../i18n/locales';
import { t } from '../i18n/ui';
import { company, SITE_URL } from './site';

export const ORG_ID = `${SITE_URL}/#org`;

export function orgJsonLd(lang: Lang, url: string) {
  const a = company.address;
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness'],
    '@id': ORG_ID,
    name: company.name,
    legalName: `${company.owner} — ${company.name}`,
    founder: { '@type': 'Person', name: company.owner },
    foundingDate: String(company.founded),
    url,
    logo: `${SITE_URL}/og/logo.png`,
    image: `${SITE_URL}/og/default.jpg`,
    telephone: company.phone.replace(/\s+/g, ''),
    email: company.email,
    description: t(lang).meta.homeDesc,
    address: {
      '@type': 'PostalAddress',
      streetAddress: a.street,
      addressLocality: a.city,
      postalCode: a.zip,
      addressCountry: a.country,
    },
    areaServed: 'Europe',
    knowsAbout: ['spin casting', 'tin casting', 'zinc casting', 'medals', 'badges', 'belt buckles'],
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: SITE_URL + it.url })),
  };
}
