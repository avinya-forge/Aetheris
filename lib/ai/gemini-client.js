// Gemini 1.5 Flash REST client — no SDK, pure globalThis.fetch (CF Workers compatible).
// Never throws; returns null on any error so callers can fall back to truncation.

const GEMINI_API_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

const MAX_WORDS = 30;
const SYSTEM_INSTRUCTION =
  `Summarize the following in ≤${MAX_WORDS} words. No speculation. Facts only. ` +
  'No hedge words (might, could, possibly, may). Present tense only.';

/**
 * Call Gemini 1.5 Flash with a text prompt.
 * Returns a ≤30-word factual brief, or null on any error.
 *
 * @param {string} text - Input text to summarize
 * @param {string} apiKey - Gemini API key
 * @param {Function} [fetcher] - injectable fetch for testing (default: globalThis.fetch)
 * @returns {Promise<string|null>}
 */
async function callGemini(text, apiKey, fetcher = globalThis.fetch) {
  if (!text || !apiKey) return null;

  const body = JSON.stringify({
    contents: [{ parts: [{ text: `${SYSTEM_INSTRUCTION}\n\n${text}` }] }],
    generationConfig: { maxOutputTokens: 60, temperature: 0 },
  });

  let response;
  try {
    response = await fetcher(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    });
  } catch (_) {
    return null; // network error
  }

  if (!response.ok) return null;

  let data;
  try {
    data = await response.json();
  } catch (_) {
    return null;
  }

  const output = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!output || typeof output !== 'string') return null;

  // Enforce hard 30-word cap regardless of model output
  const words = output.trim().split(/\s+/);
  if (words.length <= MAX_WORDS) return words.join(' ');
  return words.slice(0, MAX_WORDS).join(' ') + '...';
}

/**
 * Factory: returns a synthesizer pre-bound to apiKey + fetcher.
 * Returned function signature: (text: string) => Promise<string|null>
 *
 * @param {string} apiKey
 * @param {Function} [fetcher]
 * @returns {Function}
 */
function buildSynthesizer(apiKey, fetcher = globalThis.fetch) {
  return (text) => callGemini(text, apiKey, fetcher);
}

module.exports = { callGemini, buildSynthesizer, GEMINI_API_URL, MAX_WORDS };
