import "server-only";

import { timingSafeEqual } from "node:crypto";

type CredentialResult =
  | { ok: true; username: string }
  | { ok: false; reason: "invalid" };

const ADMIN_USERNAME = "eti";
const ADMIN_PASSWORD = "12345";

export async function verifyAdminCredentials(
  username: string,
  password: string,
): Promise<CredentialResult> {
  const usernameMatches = safeEqual(username, ADMIN_USERNAME);
  const passwordMatches = safeEqual(password, ADMIN_PASSWORD);

  if (!usernameMatches || !passwordMatches) {
    return { ok: false, reason: "invalid" };
  }

  return { ok: true, username: ADMIN_USERNAME };
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
