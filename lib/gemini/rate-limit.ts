/**
 * Minimal in-memory fixed-window rate limiter (research.md §2). Protects
 * the shared Gemini free-tier quota from a single visitor or a small burst
 * exhausting it for everyone else. Resets on redeploy/cold-start — an
 * accepted trade-off at this traffic scale; no new infrastructure
 * (database/Redis) is introduced for it (Constitution XI/XII).
 */

const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 5;

interface Bucket {
  count: number;
  windowStart: number;
}

const buckets = new Map<string, Bucket>();

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now - bucket.windowStart >= WINDOW_MS) {
    buckets.set(key, { count: 1, windowStart: now });
    return false;
  }

  if (bucket.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  bucket.count += 1;
  return false;
}
