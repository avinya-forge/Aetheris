import { MAX_WORDS } from './gemini-client.js';

/**
 * Maps raw Gemini response to a factual brief.
 * @param {Object} data
 * @returns {string|null}
 */
export function mapGeminiResponse(data) {
  const output = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!output || typeof output !== 'string') return null;

  const words = output.trim().split(/\s+/);
  if (words.length <= MAX_WORDS) return words.join(' ');

  const sliced = words.slice(0, MAX_WORDS);
  sliced[MAX_WORDS - 1] = sliced[MAX_WORDS - 1] + '...';
  return sliced.join(' ');
}
