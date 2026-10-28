import "server-only";

// Fixed-window rate limiter.
//
// If Upstash Redis REST credentials are set, the counters live in Redis (shared by every
// server / serverless instance). The Vercel Marketplace integration provides them as
// KV_REST_API_URL / KV_REST_API_TOKEN; a manual setup can use the UPSTASH_REDIS_REST_* names.
// Otherwise, or if Redis is unreachable, an in-memory counter is used, which only protects
// a single Node.js process (on Vercel each serverless instance has its own memory).

type RateLimitResult = { ok: boolean; retryAfter: number };

const redisUrl = (process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL)?.replace(
  /\/+$/,
  "",
);
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;

async function redisRateLimit(
  url: string,
  token: string,
  key: string,
  limit: number,
  windowMs: number,
): Promise<RateLimitResult> {
  const redisKey = `ratelimit:${key}`;
  const response = await fetch(`${url}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify([
      ["INCR", redisKey],
      ["PEXPIRE", redisKey, windowMs, "NX"],
      ["PTTL", redisKey],
    ]),
    cache: "no-store",
    signal: AbortSignal.timeout(2000),
  });
  if (!response.ok) throw new Error(`Upstash responded with ${response.status}`);

  const [count, , ttl] = (await response.json()) as { result: number }[];
  return {
    ok: count.result <= limit,
    retryAfter: Math.max(1, Math.ceil(ttl.result / 1000)),
  };
}

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();
const MAX_BUCKETS = 10_000;

function memoryRateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();

  if (buckets.size > MAX_BUCKETS) {
    for (const [k, bucket] of buckets) {
      if (bucket.resetAt <= now) buckets.delete(k);
    }
  }

  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfter: 0 };
  }

  bucket.count += 1;
  return {
    ok: bucket.count <= limit,
    retryAfter: Math.ceil((bucket.resetAt - now) / 1000),
  };
}

export async function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): Promise<RateLimitResult> {
  if (redisUrl && redisToken) {
    try {
      return await redisRateLimit(redisUrl, redisToken, key, limit, windowMs);
    } catch (error) {
      console.error("[rate-limit] Redis unavailable, falling back to memory:", error);
    }
  }
  return memoryRateLimit(key, limit, windowMs);
}
