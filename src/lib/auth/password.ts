import "server-only";

import { timingSafeEqual } from "node:crypto";
import { verify } from "@node-rs/argon2";

type CredentialResult =
  | { ok: true; username: string }
  | { ok: false; reason: "invalid" };

export async function verifyAdminCredentials(
  username: string,
  password: string,
): Promise<CredentialResult> {
  const configuredUsername = process.env.ADMIN_USERNAME;
  const configuredPasswordHash = process.env.ADMIN_PASSWORD_HASH;

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
