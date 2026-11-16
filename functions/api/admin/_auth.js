const COOKIE_NAME = "__Host-dradmin";
const encoder = new TextEncoder();

function bytesToBase64Url(bytes) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function base64UrlToBytes(value) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(normalized + "=".repeat((4 - normalized.length % 4) % 4));
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

async function sign(value, secret) {
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return new Uint8Array(await crypto.subtle.sign("HMAC", key, encoder.encode(value)));
}

export async function createSession(username, secret) {
  const payload = bytesToBase64Url(encoder.encode(JSON.stringify({ sub: username, exp: Date.now() + 8 * 60 * 60 * 1000 })));
  const signature = bytesToBase64Url(await sign(payload, secret));
  return payload + "." + signature;
}

export async function verifySession(request, secret, expectedUsername) {
  const cookieHeader = request.headers.get("Cookie") || "";
  const cookie = cookieHeader.split(";").map((part) => part.trim()).find((part) => part.startsWith(COOKIE_NAME + "="));
  if (!cookie) return false;
  const token = cookie.slice(COOKIE_NAME.length + 1);
  const [payload, signature, extra] = token.split(".");
  if (!payload || !signature || extra) return false;
  try {
    const expected = await sign(payload, secret);
    const actual = base64UrlToBytes(signature);
    if (actual.length !== expected.length) return false;
    let mismatch = 0;
    for (let i = 0; i < expected.length; i++) mismatch |= expected[i] ^ actual[i];
    if (mismatch !== 0) return false;
    const data = JSON.parse(new TextDecoder().decode(base64UrlToBytes(payload)));
    return data.sub === expectedUsername && Number(data.exp) > Date.now();
  } catch {
    return false;
  }
}

export function sessionCookie(token) {
  return COOKIE_NAME + "=" + token + "; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=28800";
}
export function clearSessionCookie() {
  return COOKIE_NAME + "=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0";
}
export function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", ...headers } });
}
