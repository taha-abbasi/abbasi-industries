// Session cookie for the runway PIN gate.
//
// The cookie carries an expiry plus an HMAC of that expiry, signed with
// RUNWAY_SECRET. It proves someone entered the PIN; it never contains the PIN.
// Uses Web Crypto so the same code runs in Edge middleware and in Node.

export const COOKIE = "runway_session";
export const SESSION_HOURS = 12;

const enc = new TextEncoder();

async function key(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw", enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]
  );
}

const toHex = (buf: ArrayBuffer) =>
  Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");

export async function signSession(expiresAt: number, secret: string): Promise<string> {
  const mac = await crypto.subtle.sign("HMAC", await key(secret), enc.encode(String(expiresAt)));
  return `${expiresAt}.${toHex(mac)}`;
}

export async function verifySession(token: string | undefined, secret: string): Promise<boolean> {
  if (!token || !secret) return false;
  const [expRaw, mac] = token.split(".");
  const expiresAt = Number(expRaw);
  if (!Number.isFinite(expiresAt) || !mac) return false;
  if (Date.now() > expiresAt) return false;
  const expected = await signSession(expiresAt, secret);
  return timingSafeEqual(expected, token);
}

/** Constant-time string compare — avoids leaking the signature byte by byte. */
export function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}
