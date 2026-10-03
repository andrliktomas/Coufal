/** HMAC-SHA256 signatures for time-limited download links (no R2 public bucket needed). */
const enc = new TextEncoder();

async function key(secret: string) {
  return crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify']);
}

const b64url = (buf: ArrayBuffer) =>
  btoa(String.fromCharCode(...new Uint8Array(buf)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

export async function sign(secret: string, objectKey: string, exp: number) {
  const sig = await crypto.subtle.sign('HMAC', await key(secret), enc.encode(`${objectKey}\n${exp}`));
  return b64url(sig);
}

export async function verify(secret: string, objectKey: string, exp: number, sig: string) {
  if (!Number.isFinite(exp) || exp < Date.now() / 1000) return false;
  const expected = await sign(secret, objectKey, exp);
  if (expected.length !== sig.length) return false;
  let diff = 0;
  for (let i = 0; i < sig.length; i++) diff |= expected.charCodeAt(i) ^ sig.charCodeAt(i);
  return diff === 0;
}
