import "server-only";

import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import { cookies } from "next/headers";

import {
  getSessionCookieName,
  SESSION_DURATION_SECONDS,
} from "@/lib/auth/constants";

export type SessionUser = {
  userId: string;
  username: string;
  role: "admin";
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

export async function createSession(username: string) {
  const token = await new SignJWT({ username, role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject("admin")
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
    .sign(getEncodedSecret());

  const cookieStore = await cookies();
  cookieStore.set(getSessionCookieName(), token, {
    httpOnly: true,
    maxAge: SESSION_DURATION_SECONDS,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(getSessionCookieName());
}

export async function readSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(getSessionCookieName())?.value;

  return decryptSession(token);
}

export async function decryptSession(token: string | undefined) {
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
      payload.sub !== "admin" ||
      payload.role !== "admin" ||
      typeof payload.username !== "string"
    ) {
      return null;
    }

    return {
      userId: payload.sub,
      username: payload.username,
      role: "admin",
    } satisfies SessionUser;
  } catch {
    return null;
  }
}
