function parseCookies(header) {
  const out = {};
  const raw = String(header ?? "");
  if (!raw) return out;
  for (const part of raw.split(";")) {
    const idx = part.indexOf("=");
    if (idx === -1) continue;
    const k = part.slice(0, idx).trim();
    const v = part.slice(idx + 1).trim();
    if (k) out[k] = v;
  }
  return out;
}

function makeCookie(name, value, options = {}) {
  const parts = [`${name}=${value}`];
  if (options.maxAge != null) parts.push(`Max-Age=${options.maxAge}`);
  if (options.path) parts.push(`Path=${options.path}`);
  if (options.httpOnly) parts.push("HttpOnly");
  if (options.secure) parts.push("Secure");
  if (options.sameSite) parts.push(`SameSite=${options.sameSite}`);
  return parts.join("; ");
}

function base64UrlFromBytes(bytes) {
  let str = "";
  for (const b of bytes) str += String.fromCharCode(b);
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlFromString(text) {
  return base64UrlFromBytes(new TextEncoder().encode(text));
}

async function signToken(payloadJson, secret) {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, [
    "sign",
  ]);
  const payloadPart = base64UrlFromString(payloadJson);
  const sigBuf = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payloadPart));
  const sigPart = base64UrlFromBytes(new Uint8Array(sigBuf));
  return `${payloadPart}.${sigPart}`;
}

export async function onRequest({ request, env }) {
  if (!env.DISCORD_CLIENT_ID) return new Response("DISCORD_CLIENT_ID ausente", { status: 500 });
  if (!env.DISCORD_CLIENT_SECRET) return new Response("DISCORD_CLIENT_SECRET ausente", { status: 500 });
  if (!env.SESSION_SECRET) return new Response("SESSION_SECRET ausente", { status: 500 });

  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const error = url.searchParams.get("error");

  if (error) return new Response(`Erro no login: ${error}`, { status: 400 });
  if (!code || !state) return new Response("Login inválido", { status: 400 });

  const cookies = parseCookies(request.headers.get("Cookie"));
  if (!cookies.oauth_state || cookies.oauth_state !== state) return new Response("State inválido", { status: 400 });

  const redirectUri = `${url.origin}/auth/discord/callback`;

  const form = new URLSearchParams();
  form.set("client_id", env.DISCORD_CLIENT_ID);
  form.set("client_secret", env.DISCORD_CLIENT_SECRET);
  form.set("grant_type", "authorization_code");
  form.set("code", code);
  form.set("redirect_uri", redirectUri);

  const tokenRes = await fetch("https://discord.com/api/oauth2/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: form,
  });

  if (!tokenRes.ok) return new Response("Falha ao trocar token", { status: 400 });
  const tokenJson = await tokenRes.json();
  const accessToken = String(tokenJson?.access_token ?? "");
  if (!accessToken) return new Response("Token inválido", { status: 400 });

  const userRes = await fetch("https://discord.com/api/users/@me", { headers: { authorization: `Bearer ${accessToken}` } });
  if (!userRes.ok) return new Response("Falha ao pegar usuário", { status: 400 });
  const user = await userRes.json();

  const payload = {
    id: String(user?.id ?? ""),
    username: String(user?.username ?? ""),
    global_name: String(user?.global_name ?? ""),
    avatar: String(user?.avatar ?? ""),
    iat: Date.now(),
  };

  if (!payload.id) return new Response("Usuário inválido", { status: 400 });

  const sessionToken = await signToken(JSON.stringify(payload), env.SESSION_SECRET);

  const displayName = payload.global_name || payload.username || payload.id;
  const webhookUrl = String(env.DISCORD_WEBHOOK_URL ?? "").trim();
  if (webhookUrl) {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ content: `🟢 ${displayName} entrou no site.` }),
    });
  }

  const headers = new Headers();
  headers.set("Location", `${url.origin}/?login=1`);
  headers.append("Set-Cookie", makeCookie("oauth_state", "", { path: "/", maxAge: 0, httpOnly: true, secure: true, sameSite: "Lax" }));
  headers.append(
    "Set-Cookie",
    makeCookie("session", sessionToken, { path: "/", maxAge: 7 * 24 * 60 * 60, httpOnly: true, secure: true, sameSite: "Lax" })
  );

  return new Response(null, { status: 302, headers });
}
