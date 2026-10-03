import company from '../../content/company.json';
import products from '../../content/products.json';
import hero from '../../content/i18n.hero.json';
import type { Lang } from '../i18n/locales';
import type { CategoryId } from '../i18n/routes';

export { company };

export const SITE_URL = (import.meta.env.SITE as string | undefined)?.replace(/\/$/, '') ?? 'https://coufal.andrlikt.workers.dev';

export const PHONE_HREF = 'tel:' + company.phone.replace(/\s+/g, '');
export const MAILTO = 'mailto:' + company.email;

export interface Product {
  id: CategoryId;
  moq: number | null;
  oldCat: string;
}
export const PRODUCTS = products.products as unknown as Product[];
export const moqOf = (id: CategoryId) => PRODUCTS.find((p) => p.id === id)?.moq ?? null;

export type Hero = (typeof hero)['en'];
export const heroFor = (lang: Lang): Hero => hero[lang];

export { QUOTE_TYPES, QUOTE_MIN, type QuoteType } from './quote-config';

export const YEARS = new Date().getFullYear() - company.founded;
