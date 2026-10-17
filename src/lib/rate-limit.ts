/**
 * In-memory rate limiter for serverless API routes.
 *
 * Lives in module scope so it persists across warm Lambda invocations on the
 * same instance. Not shared across multiple Vercel instances, but effective
 * against the vast majority of bot abuse on a small contractor site.
 *
 * Usage:
 *   const allowed = rateLimit(`quote:${ip}`, 5, 15 * 60 * 1000);
 *   if (!allowed) return NextResponse.json({ ok: false }, { status: 429 });
 */

interface Entry {
  count: number;
  resetAt: number;
}

const store = new Map<string, Entry>();

/** Periodically purge expired entries so the Map doesn't grow unbounded. */
function cleanup(now: number) {
  store.forEach((entry, key) => {
    if (entry.resetAt < now) store.delete(key);
  });
}

/**
 * Returns true if the request should be allowed, false if it should be blocked.
 *
 * @param key      Unique key per IP + endpoint, e.g. `quote:1.2.3.4`
 * @param max      Maximum requests allowed in the window
 * @param windowMs Window length in milliseconds
 */
export function rateLimit(key: string, max: number, windowMs: number): boolean {
  const now = Date.now();

  // ~5% chance of cleanup per call — keeps memory lean without blocking
  if (Math.random() < 0.05) cleanup(now);

  const entry = store.get(key);

  if (!entry || entry.resetAt < now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (entry.count >= max) return false;

  entry.count += 1;
  return true;
}

/** Extract the real client IP from Vercel / proxy headers. */
export function getIp(request: Request): string {
  const forwarded = (request.headers as Headers).get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() ?? "unknown";
}
