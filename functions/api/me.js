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

function bytesFromBase64Url(input) {
  const b64 = String(input ?? "").replace(/-/g, "+").replace(/_/g, "/");
  const pad = b64.length % 4 === 0 ? "" : "=".repeat(4 - (b64.length % 4));
  const bin = atob(b64 + pad);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i += 1) out[i] = bin.charCodeAt(i);
  return out;
}

function stringFromBase64Url(input) {
  return new TextDecoder().decode(bytesFromBase64Url(input));
}

async function verifyToken(token, secret) {
  const parts = String(token ?? "").split(".");
  if (parts.length !== 2) return null;
  const [payloadPart, sigPart] = parts;
  if (!payloadPart || !sigPart) return null;

  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, [
    "verify",
  ]);
  const ok = await crypto.subtle.verify("HMAC", key, bytesFromBase64Url(sigPart), new TextEncoder().encode(payloadPart));
  if (!ok) return null;

  try {
    const payloadJson = stringFromBase64Url(payloadPart);
    return JSON.parse(payloadJson);
  } catch {
    return null;
  }
}

export async function onRequest({ request, env }) {
  if (!env.SESSION_SECRET) return new Response(JSON.stringify(null), { status: 200, headers: { "content-type": "application/json" } });

  const cookies = parseCookies(request.headers.get("Cookie"));
  const token = cookies.session;
  const payload = await verifyToken(token, env.SESSION_SECRET);
  if (!payload?.id) return new Response(JSON.stringify(null), { status: 200, headers: { "content-type": "application/json" } });

  const user = {
    id: String(payload.id),
    username: String(payload.username ?? ""),
    global_name: String(payload.global_name ?? ""),
    avatar: String(payload.avatar ?? ""),
  };

  return new Response(JSON.stringify(user), { status: 200, headers: { "content-type": "application/json" } });
}
