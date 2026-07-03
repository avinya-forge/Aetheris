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
    const patternVariance = (forecast.patternMatchId ? forecast.patternMatchId.length : 0) * 2;

    // Add diversity bonus if multiple distinct sources reported the foundational events
    const sources = forecast.sources || (forecast.source ? [forecast.source] : []);
    const uniqueSources = new Set(sources);
    const diversityVariance = uniqueSources.size * 3;

    let likelihoodPercent = Math.min(baseLikelihood + patternVariance + diversityVariance, 95);

    return {
      id: forecast.id || `gc-${Math.random().toString(36).substr(2, 9)}`,
      title: forecast.title || `Predicted ${forecast.eventType}`,
      likelihood: likelihoodPercent / 100,
      isSpeculative: forecast.isSpeculative || false,
      eventDetails: {
        eventType: forecast.eventType,
        location: forecast.location,
        description: `Predicted ${forecast.eventType} in ${forecast.location}`
      }
    };
  });
}
