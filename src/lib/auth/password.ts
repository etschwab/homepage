import "server-only";

import { timingSafeEqual } from "node:crypto";
import { verify } from "@node-rs/argon2";

type CredentialResult =
  | { ok: true; username: string }
  | { ok: false; reason: "invalid" };

/** Zugang zu den geschützten Dokumenten (/login). */
export function verifyAdminCredentials(username: string, password: string) {
  return verifyCredentials(
    username,
    password,
    process.env.ADMIN_USERNAME,
    process.env.ADMIN_PASSWORD_HASH,
  );
}

/** Zugang zum Admin-Bereich (/admin/login). Bewusst eigene Zugangsdaten. */
export function verifyEditorCredentials(username: string, password: string) {
  return verifyCredentials(
    username,
    password,
    process.env.EDITOR_USERNAME,
    process.env.EDITOR_PASSWORD_HASH,
  );
}

async function verifyCredentials(
  username: string,
  password: string,
  configuredUsername: string | undefined,
  configuredPasswordHash: string | undefined,
): Promise<CredentialResult> {
  if (!configuredUsername || !configuredPasswordHash) {
    return { ok: false, reason: "invalid" };
  }

  const usernameMatches = safeEqual(username, configuredUsername);
  const passwordMatches = await verify(configuredPasswordHash, password).catch(
    () => false,
  );

  if (!usernameMatches || !passwordMatches) {
    return { ok: false, reason: "invalid" };
  }

  return { ok: true, username: configuredUsername };
}

function safeEqual(value: string, expected: string) {
  const valueBytes = Buffer.from(value);
  const expectedBytes = Buffer.from(expected);
  const length = Math.max(valueBytes.length, expectedBytes.length);
  const paddedValue = Buffer.alloc(length);
  const paddedExpected = Buffer.alloc(length);

  valueBytes.copy(paddedValue);
  expectedBytes.copy(paddedExpected);

  return (
    timingSafeEqual(paddedValue, paddedExpected) &&
    valueBytes.length === expectedBytes.length
  );
}
