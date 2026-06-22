import { matchHistoricalPattern } from './pattern-matcher.js';

/**
 * Generates Ghost Cards representing Probability Cones for non-speculative forecasts.
 * Likelihood is capped at 95% per Standard 5.
 *
 * @param {Array<Object>} forecasts - Array of forecast data
 * @returns {Array<Object>} Array of GhostCard objects
 */
export function generateGhostCards(forecasts) {
  if (!Array.isArray(forecasts)) return [];

  // 1. Filter out speculative forecasts using the pattern matcher
  const verifiedForecasts = forecasts.filter(f => matchHistoricalPattern(f));

  // 2. Map to Ghost Cards
  return verifiedForecasts.map(forecast => {
    const baseLikelihood = 70;
    const variance = (forecast.patternMatchId ? forecast.patternMatchId.length : 0) * 5;
    let likelihood = Math.min(baseLikelihood + variance, 95);

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
