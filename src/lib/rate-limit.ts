/**
 * Best-effort edge-safe rate limiter (in-memory, per instance).
 *
 * Honest limitation: on multi-instance hosting each instance keeps its own
 * counters, so this blunts abuse rather than guaranteeing a global quota.
 * A shared store (e.g. Redis) is the documented upgrade path before launch.
 */

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

export interface RateLimit {
  allowed: boolean;
  remaining: number;
  resetAfterMs: number;
}

/** Test-only escape hatch. */
export function __clearRateLimitsForTests(): void {
  buckets.clear();
}

export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number,
  now: number = Date.now()
): RateLimit {
  const current = buckets.get(key);
  if (!current || now >= current.resetAt) {
    buckets.set(key, {count: 1, resetAt: now + windowMs});
    if (buckets.size > 5000) {
      for (const [k, v] of buckets) {
        if (now >= v.resetAt) buckets.delete(k);
        if (buckets.size <= 4000) break;
      }
    }
    return {allowed: true, remaining: limit - 1, resetAfterMs: windowMs};
  }
  if (current.count >= limit) {
    return {allowed: false, remaining: 0, resetAfterMs: current.resetAt - now};
  }
  current.count++;
  return {allowed: true, remaining: limit - current.count, resetAfterMs: current.resetAt - now};
}

/** Client identity: forwarded-for chain first, direct address last. */
export function clientIdentity(forwardedFor: string | null, fallback: string): string {
  const first = (forwardedFor ?? '').split(',')[0]?.trim();
  return first || fallback || 'unknown';
}
