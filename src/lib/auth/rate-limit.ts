import "server-only";

import { headers } from "next/headers";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;

type LoginBucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, LoginBucket>();

export async function getLoginRateLimitKey(identifier: string) {
  const requestHeaders = await headers();
  const forwardedFor = requestHeaders.get("x-forwarded-for");
  const ip =
    forwardedFor?.split(",")[0]?.trim() ||
    requestHeaders.get("x-real-ip") ||
    "local";

  return `${ip}:${identifier}`;
}

export function consumeLoginAttempt(key: string) {
  pruneExpiredBuckets();

  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true };
  }

  if (bucket.count >= MAX_ATTEMPTS) {
    return { allowed: false, resetAt: bucket.resetAt };
  }

  bucket.count += 1;
  return { allowed: true };
}

export function clearLoginAttempts(key: string) {
  buckets.delete(key);
}

function pruneExpiredBuckets() {
  const now = Date.now();

  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) {
      buckets.delete(key);
    }
  }
}
