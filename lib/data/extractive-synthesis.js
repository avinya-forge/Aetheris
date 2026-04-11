/**
 * Synthesizes a factual brief from an array of source objects.
 * Uses an injectable synthesizer (e.g., Gemini) when provided;
 * falls back to deterministic word-truncation when the synthesizer
 * is absent, returns null, or throws.
 *
 * @param {Array<Object>} sources - Array of objects with a `.content` string field.
 * @param {Function|null} [synthesizer] - Optional async (text: string) => Promise<string|null>
 * @returns {Promise<string>} ≤30-word factual brief.
 */
async function synthesizeSources(sources, synthesizer = null) {
  if (!sources || !Array.isArray(sources) || sources.length === 0) return '';

  const combinedText = sources
    .filter(s => s && s.content)
    .map(s => s.content.trim())
    .join(' ');

  if (!combinedText) return '';

  // Attempt AI synthesis when a synthesizer is injected
  if (synthesizer) {
    try {
      const aiResult = await synthesizer(combinedText);
      if (aiResult && typeof aiResult === 'string' && aiResult.trim()) {
        return aiResult.trim();
      }
    } catch (_) {
      // fall through to truncation
    }
  }

  // Deterministic truncation fallback — always ≤30 words
  const words = combinedText.split(/\s+/);
  return words.length <= 30 ? words.join(' ') : words.slice(0, 30).join(' ') + '...';
}

module.exports = { synthesizeSources };
