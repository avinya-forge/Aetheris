const { matchHistoricalPattern } = require('./pattern-matcher');

/**
 * Generates Ghost Cards representing Probability Cones for non-speculative forecasts.
 * Likelihood is a percentage-based logic value generated based on historical pattern matching.
 *
 * @param {Array<Object>} forecasts - Array of forecast data (as defined in ForecastSchema)
 * @returns {Array<Object>} Array of GhostCard objects
 */
function generateGhostCards(forecasts) {
  if (!Array.isArray(forecasts)) return [];

  // 1. Filter out speculative forecasts using the pattern matcher
  const verifiedForecasts = forecasts.filter(f => matchHistoricalPattern(f));

  // 2. Map to Ghost Cards
  return verifiedForecasts.map(forecast => {
    // In a real scenario, likelihood would be computed by a complex model.
    // For this engine, we generate a probability based on the presence of a pattern match.
    // Assuming a pattern match gives a base 70% confidence, plus some variability.
    const baseLikelihood = 70;

    // Deterministic logic based on pattern string length for testing consistency
    const variance = (forecast.patternMatchId ? forecast.patternMatchId.length : 0) * 5;
    let likelihood = baseLikelihood + variance;
    if (likelihood > 95) likelihood = 95; // Cap at 95% since predictions are never "certain"

    return {
      likelihood,
      speculative: forecast.speculative || false,
      eventDetails: {
        eventType: forecast.eventType,
        location: forecast.location,
        description: `Predicted ${forecast.eventType} in ${forecast.location}`
      }
    };
  });
}

module.exports = { generateGhostCards };

export {};
