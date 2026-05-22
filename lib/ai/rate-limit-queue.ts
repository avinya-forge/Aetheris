// KV-backed 15 RPM rate limiter for Gemini API calls.
// Window key buckets on UTC minute boundaries; expires after 120s for clock skew.

const MAX_REQUESTS_PER_MINUTE = 15;
const KV_RATE_PREFIX = 'rl:gemini:';

/**
 * Returns the KV window key for the given timestamp's UTC minute.
 *
 * @param {number} [now] - timestamp ms (injectable for determinism)
 * @returns {string}
 */
function windowKey(now) {
  const minute = Math.floor(now / 60_000);
  return `${KV_RATE_PREFIX}${minute}`;
}

/**
 * Check current rate count and increment if under limit.
 * Returns true if the request is allowed, false if rate-limited.
 *
 * @param {{ get: Function, put: Function }} kv
 * @param {number} [now]
 * @returns {Promise<boolean>}
 */
async function checkAndIncrementRate(kv, now) {
  const key = windowKey(now);
  const raw = await kv.get(key);
  const count = raw !== null ? parseInt(raw, 10) : 0;

  if (count >= MAX_REQUESTS_PER_MINUTE) return false;

  await kv.put(key, String(count + 1), { expirationTtl: 120 });
  return true;
}

/**
 * Wraps any synthesizer with KV-backed per-minute rate limiting.
 * Returns null when the rate limit is hit — caller should fall back to truncation.
 *
 * @param {Function} synthesizer - (text: string) => Promise<string|null>
 * @param {{ get: Function, put: Function }} kv
 * @returns {Function} rate-limited synthesizer: (text, now?) => Promise<string|null>
 */
function createRateLimitedSynthesizer(synthesizer, kv) {
  return async function rateLimitedSynthesize(text, now) {
    const allowed = await checkAndIncrementRate(kv, now);
    if (!allowed) return null;
    return synthesizer(text);
  };
}

module.exports = {
  windowKey,
  checkAndIncrementRate,
  createRateLimitedSynthesizer,
  MAX_REQUESTS_PER_MINUTE,
  KV_RATE_PREFIX,
};

export {};
