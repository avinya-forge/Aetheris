// Event fingerprinting — ingest-layer deduplication
// First line of defence before the wire-deduplicator.
// Uses KV as a seen-event store with 24h TTL so cross-cycle dedup works.
// KV interface: { get(key), put(key, value, { expirationTtl }) }

const KV_PREFIX = 'fp:';
const DEFAULT_TTL_S = 86_400; // 24 hours

/**
 * Derive a stable fingerprint key from an event.
 * Preference order: hash → id → first 120 chars of text.
 * @param {{ hash?: string, id?: string, text?: string, url?: string }} event
 * @returns {string|null}
 */
function fingerprintEvent(event) {
  if (!event || typeof event !== 'object') return null;
  const raw = event.hash || event.id || event.url ||
    (typeof event.text === 'string' ? event.text.trim().toLowerCase().slice(0, 120) : null);
  return raw ? `${KV_PREFIX}${raw}` : null;
}

/**
 * Check if this event has been seen in the current 24h window.
 * @param {{ get: Function }} kv
 * @param {object} event
 * @returns {Promise<boolean>} true = new, false = already seen
 */
async function isNewEvent(kv, event) {
  const key = fingerprintEvent(event);
  if (!key) return false;
  const hit = await kv.get(key);
  return hit === null;
}

/**
 * Mark event as seen for the next 24h.
 * @param {{ put: Function }} kv
 * @param {object} event
 * @param {number} [ttlSeconds]
 */
async function markEventSeen(kv, event, ttlSeconds = DEFAULT_TTL_S) {
  const key = fingerprintEvent(event);
  if (!key) return;
  await kv.put(key, '1', { expirationTtl: ttlSeconds });
}

module.exports = { fingerprintEvent, isNewEvent, markEventSeen, KV_PREFIX };
