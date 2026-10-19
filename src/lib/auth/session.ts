import "server-only";

import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import { cookies } from "next/headers";

import {
  ADMIN_SESSION_DURATION_SECONDS,
  getAdminCookieName,
  getSessionCookieName,
  SESSION_DURATION_SECONDS,
} from "@/lib/auth/constants";

export type SessionUser = {
  userId: string;
  username: string;
  role: "admin";
};

export type AdminSessionUser = {
  username: string;
  role: "editor";
};

type SessionPayload = JWTPayload & {
  username?: string;
  role?: string;
};

const DEV_SESSION_SECRET =
  "bewerbung-local-session-secret-for-development-2026";

function getEncodedSecret() {
  const secret =
    process.env.SESSION_SECRET ||
    (process.env.NODE_ENV === "production" ? undefined : DEV_SESSION_SECRET);

  if (!secret || Buffer.byteLength(secret, "utf8") < 32) {
    throw new Error("SESSION_SECRET must be at least 32 bytes.");
  }

  return new TextEncoder().encode(secret);
}

async function setTokenCookie(
  name: string,
  claims: { username: string; role: string },
  subject: string,
  maxAge: number,
) {
  const token = await new SignJWT(claims)
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(subject)
    .setIssuedAt()
    .setExpirationTime(`${maxAge}s`)
    .sign(getEncodedSecret());

  const cookieStore = await cookies();
  cookieStore.set(name, token, {
    httpOnly: true,
    maxAge,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

async function verifyToken(token: string | undefined, subject: string, role: string) {
  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify<SessionPayload>(
      token,
      getEncodedSecret(),
      { algorithms: ["HS256"] },
    );

    if (
      payload.sub !== subject ||
      payload.role !== role ||
      typeof payload.username !== "string"
    ) {
      return null;
    }

    return { username: payload.username };
  } catch {
    return null;
  }
}

// Dokumenten-Login (/login): darf geschützte Dateien und Kontakt ansehen.

export async function createSession(username: string) {
  await setTokenCookie(
    getSessionCookieName(),
    { username, role: "admin" },
    "admin",
    SESSION_DURATION_SECONDS,
  );
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(getSessionCookieName());
}

export async function readSession() {
  const cookieStore = await cookies();
  return decryptSession(cookieStore.get(getSessionCookieName())?.value);
}

export async function decryptSession(token: string | undefined) {
  const verified = await verifyToken(token, "admin", "admin");
  if (!verified) return null;

  return {
    userId: "admin",
    username: verified.username,
    role: "admin",
  } satisfies SessionUser;
}

// Admin-Login (/admin/login): darf Inhalte und Dokumente bearbeiten.

export async function createAdminSession(username: string) {
  await setTokenCookie(
    getAdminCookieName(),
    { username, role: "editor" },
    "editor",
    ADMIN_SESSION_DURATION_SECONDS,
  );
}

export async function deleteAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(getAdminCookieName());
}

export async function readAdminSession(): Promise<AdminSessionUser | null> {
  const cookieStore = await cookies();
  const verified = await verifyToken(
    cookieStore.get(getAdminCookieName())?.value,
    "editor",
    "editor",
  );

  return verified ? { username: verified.username, role: "editor" } : null;
}
