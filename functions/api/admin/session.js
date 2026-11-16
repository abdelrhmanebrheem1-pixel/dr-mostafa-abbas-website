import { verifySession, json } from "./_auth.js";

export async function onRequestGet({ request, env }) {
  if (!env.ADMIN_USERNAME || !env.SESSION_SECRET) return json({ authenticated: false }, 503);
  const authenticated = await verifySession(request, env.SESSION_SECRET, env.ADMIN_USERNAME);
  return json({ authenticated });
}
