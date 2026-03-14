function makeCookie(name, value, options = {}) {
  const parts = [`${name}=${value}`];
  if (options.maxAge != null) parts.push(`Max-Age=${options.maxAge}`);
  if (options.path) parts.push(`Path=${options.path}`);
  if (options.httpOnly) parts.push("HttpOnly");
  if (options.secure) parts.push("Secure");
  if (options.sameSite) parts.push(`SameSite=${options.sameSite}`);
  return parts.join("; ");
}

export async function onRequest({ request }) {
  const url = new URL(request.url);
  const headers = new Headers();
  headers.append("Set-Cookie", makeCookie("session", "", { path: "/", maxAge: 0, httpOnly: true, secure: true, sameSite: "Lax" }));

  if (request.method === "POST") {
    headers.set("content-type", "application/json");
    return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
  }

  headers.set("Location", `${url.origin}/`);
  return new Response(null, { status: 302, headers });
}
