const STALE_THRESHOLD_MS = 6 * 60 * 60 * 1_000; // 6 hours in ms

/**
 * Returns true if the event's timestamp is at or older than STALE_THRESHOLD_MS.
 * Checks `timestamp` first, then `publishedAt`.
 *
 * @param {{ timestamp?: number, publishedAt?: number }|null} event
 * @param {number} [now]
 * @returns {boolean}
 */
function isStale(event, now = Date.now()) {
  if (!event || typeof event !== 'object') return false;
  const ts = event.timestamp || event.publishedAt || 0;
  if (!ts) return false;
  return (now - ts) >= STALE_THRESHOLD_MS;
}

module.exports = { isStale, STALE_THRESHOLD_MS };
