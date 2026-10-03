/**
 * Shared between the quote page and functions/api/quote.ts — keep it free of imports.
 * Minimum order quantities come from the old poptávka form.
 */
export const QUOTE_TYPES = ['medals', 'badges', 'buckles', 'key-fobs', 'figures', 'other'] as const;
export type QuoteType = (typeof QUOTE_TYPES)[number];
export const QUOTE_MIN: Record<QuoteType, number> = { medals: 20, badges: 20, buckles: 10, 'key-fobs': 20, figures: 30, other: 10 };

export const MAX_UPLOAD_BYTES = 20 * 1024 * 1024;
export const ALLOWED_EXT = ['pdf', 'ai', 'svg', 'png', 'jpg', 'jpeg'] as const;
export const ALLOWED_EXT_ATTR = '.pdf,.ai,.svg,.png,.jpg,.jpeg,application/pdf,image/svg+xml,image/png,image/jpeg';
