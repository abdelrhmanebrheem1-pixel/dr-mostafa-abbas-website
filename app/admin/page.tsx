"use client";

import { FormEvent, useEffect, useState } from "react";

export default function AdminPage() {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/admin/session", { credentials: "same-origin", cache: "no-store" })
      .then((response) => response.json())
      .then((data) => setAuthenticated(Boolean(data.authenticated)))
      .catch(() => setMessage("تعذر الاتصال بخدمة تسجيل الدخول."))
      .finally(() => setLoading(false));
  }, []);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setMessage("");
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "تعذر تسجيل الدخول.");
      setAuthenticated(true);
      setPassword("");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "حدث خطأ غير متوقع.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST", credentials: "same-origin" });
    setAuthenticated(false);
    setPassword("");
    setMessage("");
  }

  return (
    <main className="admin-page" dir="rtl">
      <section className="admin-panel">
        <div className="admin-mark">د</div>
        <p className="admin-kicker">د. مصطفى عباس</p>
        <h1>{loading ? "جارٍ التحقق..." : authenticated ? "تم تسجيل الدخول" : "لوحة الإدارة"}</h1>
        {loading ? <p className="admin-subtitle">لحظة من فضلك</p> : authenticated ? (
          <>
            <p className="admin-subtitle">أنت داخل لوحة الإدارة بنجاح. سيتم إضافة أدوات تعديل بيانات الموقع في الخطوة التالية.</p>
            <button className="admin-button" onClick={handleLogout}>تسجيل الخروج</button>
          </>
        ) : (
          <form onSubmit={handleLogin}>
            <label htmlFor="admin-user">اسم المستخدم</label>
            <input id="admin-user" autoComplete="username" value={username} onChange={(event) => setUsername(event.target.value)} required />
            <label htmlFor="admin-password">كلمة المرور</label>
            <input id="admin-password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required />
            <button className="admin-button" type="submit" disabled={submitting}>{submitting ? "جارٍ الدخول..." : "تسجيل الدخول"}</button>
          </form>
        )}
        {message && <p className="admin-message" role="alert">{message}</p>}
        <a className="admin-home" href="/">العودة إلى الموقع</a>
      </section>
      <style jsx>{`
        .admin-page{min-height:100vh;display:grid;place-items:center;padding:24px;background:linear-gradient(145deg,#0c1427,#172b3e);font-family:Arial,Tahoma,sans-serif;color:#182338}
        .admin-panel{width:min(100%,420px);background:#fff;border-radius:22px;padding:38px;box-shadow:0 24px 80px #0004;text-align:center}
        .admin-mark{width:58px;height:58px;margin:0 auto 18px;border-radius:18px;background:#0c1427;color:#62d9ac;display:grid;place-items:center;font-size:30px;font-weight:bold}
        .admin-kicker{color:#0f8d65;font-size:13px;font-weight:bold;margin:0 0 8px}
        h1{font-size:25px;margin:0 0 10px;color:#0c1427}
        .admin-subtitle{font-size:13px;line-height:1.9;color:#6e7889;margin:0 0 24px}
        form{text-align:right}
        label{display:block;font-size:13px;font-weight:bold;margin:16px 0 7px}
        input{width:100%;padding:13px;border:1px solid #dce4e7;border-radius:10px;font:inherit;outline-color:#18a878}
        .admin-button{width:100%;border:0;border-radius:10px;padding:14px;background:#18a878;color:white;font-size:14px;font-weight:bold;margin-top:22px;cursor:pointer}
        .admin-button:disabled{opacity:.65;cursor:wait}
        .admin-message{font-size:12px;color:#b42318;margin:14px 0 0}
        .admin-home{display:inline-block;margin-top:24px;color:#0f8d65;font-size:12px;text-decoration:none}
        @media(max-width:480px){.admin-panel{padding:28px 22px}}
      `}</style>
    </main>
  );
}
