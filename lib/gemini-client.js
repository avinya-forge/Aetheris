// Gemini 1.5 Flash REST client — no SDK, pure globalThis.fetch (CF Workers compatible).
// Returns raw JSON response from Gemini API.
// Standard: lib/data/*-client.js — API clients only. No transforms. Return raw JSON → caller transforms.

const GEMINI_API_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

const MAX_WORDS = 30;
const SYSTEM_INSTRUCTION =
  `Summarize the following in ≤${MAX_WORDS} words. No speculation. Facts only. ` +
  'No hedge words (might, could, possibly, may). Present tense only.';

/**
 * Call Gemini 1.5 Flash with a text prompt.
 * Returns raw JSON from Gemini API, or null on any error.
 *
 * @param {string} text - Input text to summarize
 * @param {string} apiKey - Gemini API key
 * @param {Function} [fetcher] - injectable fetch for testing (default: globalThis.fetch)
 * @returns {Promise<Object|null>}
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

  try {
    return await response.json();
  } catch (_) {
    return null;
  }
}

export { callGemini, GEMINI_API_URL, MAX_WORDS, SYSTEM_INSTRUCTION };

