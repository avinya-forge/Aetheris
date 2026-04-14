// Detects stale data (>6h gap) and interpolates gaps using an injectable synthesizer.
// Output ALWAYS has interpolated:true — never surface as "live" data.

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

/**
 * Interpolates a stale event using the synthesizer, or truncation fallback.
 * Always marks output with `interpolated: true` and preserves original content.
 *
 * @param {Object|null} staleEvent
 * @param {Function|null} [synthesizer] - async (text: string) => Promise<string|null>
 * @param {number} [now]
 * @returns {Promise<Object|null>} event with interpolated: true, or null if input is null
 */
async function interpolateNowcast(staleEvent, synthesizer = null, now = Date.now()) {
  if (!staleEvent || typeof staleEvent !== 'object') return null;

  const inputText = staleEvent.content || staleEvent.text || staleEvent.summary || '';

  let interpolatedContent = '';

  if (inputText && synthesizer) {
    try {
      const result = await synthesizer(inputText);
      if (result && typeof result === 'string' && result.trim()) {
        interpolatedContent = result.trim();
      }
    } catch (_) {
      // fall through to truncation
    }
  }

  if (!interpolatedContent) {
    const words = (inputText || '').split(/\s+/).filter(Boolean);
    interpolatedContent = words.length <= 30
      ? words.join(' ')
      : words.slice(0, 30).join(' ') + '...';
  }

  return {
    ...staleEvent,
    content: interpolatedContent,
    interpolated: true,
    interpolatedAt: now,
    original: staleEvent.content || staleEvent.text || '',
  };
}

module.exports = { isStale, interpolateNowcast, STALE_THRESHOLD_MS };
