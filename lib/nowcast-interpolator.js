import { isStale, STALE_THRESHOLD_MS } from './staleness-detector.js';

/**
 * Interpolates stale events using a synthesizer or fallback.
 * @param {Object} staleEvent
 * @param {Function} [synthesizer]
 * @param {number} [now]
 * @returns {Promise<Object|null>}
 */
export async function interpolateNowcast(staleEvent, synthesizer = null, now) {
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
      // fall through
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

export { isStale, STALE_THRESHOLD_MS };
