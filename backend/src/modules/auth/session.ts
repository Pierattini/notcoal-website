import crypto from "crypto";

export const AUTH_COOKIE_NAME = "tncc_session";

type SessionPayload = {
  sub: string;
  email: string;
  name?: string | null;
  role: "ADMIN" | "CLIENT";
  exp: number;
};

const getSecret = () =>
  process.env.AUTH_SECRET ||
  process.env.JWT_SECRET ||
  "development-auth-secret-change-before-production";

const toBase64Url = (value: string | Buffer) =>
  Buffer.from(value)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

const sign = (payload: string) =>
  toBase64Url(
    crypto
      .createHmac("sha256", getSecret())
      .update(payload)
      .digest()
  );

export const createSessionToken = (
  user: Omit<SessionPayload, "exp">
) => {
  const payload: SessionPayload = {
    ...user,
    exp: Date.now() + 1000 * 60 * 60 * 24 * 7,
  };
  const encodedPayload = toBase64Url(JSON.stringify(payload));
  const signature = sign(encodedPayload);

  return `${encodedPayload}.${signature}`;
};

export const verifySessionToken = (
  token?: string
): SessionPayload | null => {
  if (!token) return null;

  const [encodedPayload, signature] = token.split(".");
  if (!encodedPayload || !signature) return null;

  const expectedSignature = sign(encodedPayload);
  const provided = Buffer.from(signature);
  const expected = Buffer.from(expectedSignature);

  if (
    provided.length !== expected.length ||
    !crypto.timingSafeEqual(provided, expected)
  ) {
    return null;
  }

  try {
    const payload = JSON.parse(
      Buffer.from(encodedPayload, "base64").toString("utf8")
    ) as SessionPayload;

    if (payload.exp < Date.now()) return null;

    return payload;
  } catch {
    return null;
  }
};

export const getCookieValue = (
  cookieHeader: string | undefined,
  name: string
) => {
  if (!cookieHeader) return undefined;

  return cookieHeader
    .split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(`${name}=`))
    ?.split("=")[1];
};
