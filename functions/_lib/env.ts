export interface Env {
  /** R2 bucket for artwork uploaded with quote requests. */
  QUOTE_UPLOADS?: R2Bucket;
  /** Cloudflare Turnstile secret. Use 1x0000000000000000000000000000000AA for testing. */
  TURNSTILE_SECRET_KEY?: string;
  /** Make.com custom webhook that emails the workshop / logs the lead. */
  QUOTE_WEBHOOK_URL?: string;
  /** Optional shared secret sent as X-Quote-Secret so the Make scenario can reject forged calls. */
  QUOTE_WEBHOOK_SECRET?: string;
  /** HMAC key for the time-limited download links to uploaded files. */
  FILE_LINK_SECRET?: string;
  /** Public origin used in download links, e.g. https://www.medaile-odznaky.cz (defaults to the request origin). */
  PUBLIC_ORIGIN?: string;
}
