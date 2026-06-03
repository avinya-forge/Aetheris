const { MAX_WORDS } = require('./gemini-client');

/**
 * Maps raw Gemini response to a ≤30-word factual brief.
 * @param {Object} data
 * @returns {string|null}
 */
function mapGeminiResponse(data) {
  const output = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!output || typeof output !== 'string') return null;

  // Enforce hard 30-word cap regardless of model output
  const words = output.trim().split(/\s+/);
  if (words.length <= MAX_WORDS) return words.join(' ');
  // If more than MAX_WORDS, take MAX_WORDS and add '...' (making it 30 words with ... attached to the last one)
  const sliced = words.slice(0, MAX_WORDS);
  sliced[MAX_WORDS - 1] = sliced[MAX_WORDS - 1] + '...';
  return sliced.join(' ');
}

export { mapGeminiResponse };

