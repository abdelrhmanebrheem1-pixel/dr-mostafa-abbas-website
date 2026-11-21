import { verifySession, json } from "./admin/_auth.js";

function validatePosts(posts) {
  if (!Array.isArray(posts) || posts.length > 30) {
    return "عدد المنشورات غير صالح (الحد الأقصى 30).";
  }

  let mediaBytes = 0;
  for (const post of posts) {
    if (!post || typeof post.id !== "string" || typeof post.title !== "string" ||
        !["article", "photo", "video"].includes(post.type) ||
        typeof post.published !== "boolean") {
      return "راجع بيانات المقال أو الوسائط.";
    }

    if (post.type === "article" &&
        (typeof post.body !== "string" || !post.body.trim())) {
      return "اكتب نص المقال قبل الحفظ.";
    }

    if (post.type === "photo" &&
        (typeof post.image !== "string" ||
         !/^data:image\/(jpeg|png|webp);base64,/.test(post.image))) {
      return "ملف الصورة غير صالح.";
    }

    if (post.image) {
      if (typeof post.image !== "string" ||
          !/^data:image\/(jpeg|png|webp);base64,/.test(post.image)) {
        return "صيغة الصورة غير مدعومة.";
      }
      mediaBytes += post.image.length;
    }

    if (post.type === "video") {
      let host = "";
      try { host = new URL(post.videoUrl).hostname.toLowerCase(); } catch {}
      if (!["youtube.com", "www.youtube.com", "m.youtube.com", "youtu.be",
            "www.youtu.be", "vimeo.com", "www.vimeo.com", "player.vimeo.com"].includes(host)) {
        return "أضف رابط فيديو صحيح من YouTube أو Vimeo.";
      }
    }
  }

  if (mediaBytes > 18000000) {
    return "إجمالي حجم الصور كبير جدًا؛ قلل حجم الصور أو عددها.";
  }
  return "";
}

export async function onRequestGet({ env }) {
  if (!env.SITE_CONTENT) return json({ ok: false, message: "مساحة التخزين غير متاحة." }, 503);
  const posts = await env.SITE_CONTENT.get("site-posts", { type: "json" });
  return json({ posts: Array.isArray(posts) ? posts : [] });
}

export async function onRequestPut({ request, env }) {
  if (!env.SITE_CONTENT) return json({ ok: false, message: "مساحة التخزين غير متاحة." }, 503);
  if (!env.ADMIN_USERNAME || !env.SESSION_SECRET ||
      !(await verifySession(request, env.SESSION_SECRET, env.ADMIN_USERNAME))) {
    return json({ ok: false, message: "انتهت جلسة الدخول. سجّل الدخول مرة أخرى." }, 401);
  }

  let body;
  try { body = await request.json(); } catch {
    return json({ ok: false, message: "بيانات المقال غير صالحة." }, 400);
  }

  const posts = body?.posts;
  const validationError = validatePosts(posts);
  if (validationError) return json({ ok: false, message: validationError }, 400);

  const payload = JSON.stringify(posts);
  if (payload.length > 22 * 1024 * 1024) {
    return json({ ok: false, message: "حجم المحتوى كبير جدًا. قلل حجم الصور وحاول مرة أخرى." }, 413);
  }

  try {
    await env.SITE_CONTENT.put("site-posts", payload);
    return json({ ok: true, count: posts.length });
  } catch (error) {
    console.error("SITE_POSTS_SAVE_FAILED", error instanceof Error ? error.message : "unknown error");
    return json({ ok: false, message: "تعذر حفظ المقالات حاليًا. حاول مرة أخرى." }, 500);
  }
}
