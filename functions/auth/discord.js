function base64UrlFromBytes(bytes) {
  let str = "";
  for (const b of bytes) str += String.fromCharCode(b);
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
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

export async function onRequest({ request, env }) {
  if (!env.DISCORD_CLIENT_ID) return new Response("DISCORD_CLIENT_ID ausente", { status: 500 });

  const url = new URL(request.url);
  const redirectUri = `${url.origin}/auth/discord/callback`;

  const stateBytes = new Uint8Array(16);
  crypto.getRandomValues(stateBytes);
  const state = base64UrlFromBytes(stateBytes);

  const authorize = new URL("https://discord.com/oauth2/authorize");
  authorize.searchParams.set("client_id", env.DISCORD_CLIENT_ID);
  authorize.searchParams.set("response_type", "code");
  authorize.searchParams.set("redirect_uri", redirectUri);
  authorize.searchParams.set("scope", "identify");
  authorize.searchParams.set("state", state);

  const headers = new Headers();
  headers.set("Location", authorize.toString());
  headers.append(
    "Set-Cookie",
    makeCookie("oauth_state", state, { httpOnly: true, secure: true, sameSite: "Lax", path: "/", maxAge: 10 * 60 })
  );

  return new Response(null, { status: 302, headers });
}
