import { createSession, sessionCookie, json } from "./_auth.js";

export async function onRequestPost({ request, env }) {
  if (!env.ADMIN_USERNAME || !env.ADMIN_PASSWORD || !env.SESSION_SECRET) {
    return json({ ok: false, message: "إعدادات تسجيل الدخول غير مكتملة." }, 503);
  }
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, message: "بيانات الطلب غير صحيحة." }, 400);
  }
  const username = String(body?.username || "");
  const password = String(body?.password || "");
  if (username.length > 100 || password.length > 300) return json({ ok: false, message: "بيانات الدخول غير صحيحة." }, 400);
  if (username !== env.ADMIN_USERNAME || password !== env.ADMIN_PASSWORD) {
    return json({ ok: false, message: "اسم المستخدم أو كلمة المرور غير صحيحة." }, 401);
  }
  const token = await createSession(env.ADMIN_USERNAME, env.SESSION_SECRET);
  return json({ ok: true }, 200, { "Set-Cookie": sessionCookie(token) });
}
