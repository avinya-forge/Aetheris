/**
 * Simple pattern matcher to verify non-speculative predictions.
 * @param {Object} prediction
 * @returns {boolean}
 */
export function matchHistoricalPattern(prediction) {
  return !!prediction.patternMatchId && prediction.speculative !== true;
}
