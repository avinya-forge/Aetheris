/**
 * Synthesizes a factual brief from an array of source objects.
 * It concatenates the content and truncates to a simulated 30-word summary.
 *
 * @param {Array<Object>} sources - Array of source objects containing `content`.
 * @returns {string} The simulated factual brief.
 */
function synthesizeSources(sources) {
  if (!sources || !Array.isArray(sources) || sources.length === 0) {
    return "";
  }

  const combinedText = sources
    .filter(source => source && source.content)
    .map(source => source.content.trim())
    .join(' ');

  if (!combinedText) return "";

  const words = combinedText.split(/\s+/);
  if (words.length <= 30) {
    return words.join(' ');
  }

  return words.slice(0, 30).join(' ') + '...';
}

module.exports = { synthesizeSources };
