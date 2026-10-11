import { generateGhostCards } from './probability-cones.js';
import { identifyHorizonImpacts } from './cluster-identifier.js';
import { matchHistoricalPattern } from './pattern-matcher.js';

/**
 * Agentic Scenario Simulation
 * Integrates cross-verifying scenario impact strictly conforming to logic-based Probability Cones.
 *
 * @param {Array<Object>} existingEvents - Current baseline events
 * @param {Array<Object>} forecasts - Array of predicted scenarios
 * @returns {Object} Simulated scenario outcome containing generated ghost cards and combined impacts
 */
export function simulateScenarios(existingEvents, forecasts) {
  if (!Array.isArray(forecasts)) return { simulatedCards: [], impacts: [] };

  // 1. Cross-verify forecasts strictly conforming to historical logic
  const verifiedForecasts = forecasts.filter(f => matchHistoricalPattern(f));

  // 2. Generate probability cones (Ghost Cards) for these verified scenarios
  const simulatedCards = generateGhostCards(verifiedForecasts);

  // 3. Calculate combined impact over the causal chains using the cluster identifier
  // Horizon impacts expect events with a patternMatchId and isSpeculative: false
  // Since we use the simulatedCards, we need to map them back to match expected format
  // or use the verifiedForecasts directly if they have impactScore. Let's use verified forecasts.

  // For simulation, let's inject any custom simulation properties and group them
  const impacts = identifyHorizonImpacts(verifiedForecasts.map(f => {
    // If the forecast doesn't have an impact score, attempt to estimate based on related events
    let estimatedImpact = f.impactScore || 5;

    // Cross-verify with existing events if they share similar locations or topics
    if (Array.isArray(existingEvents) && existingEvents.length > 0) {
      const related = existingEvents.filter(e =>
        e.topic === f.topic || e.location === f.location
      );
      if (related.length > 0) {
        // Boost impact if there are compounding existing events (e.g. drought + heatwave)
        estimatedImpact += related.length;
      }
    }

    return {
      ...f,
      impactScore: Math.min(estimatedImpact, 10),
      isSpeculative: false // explicitly ensure false since it matched historical pattern
    };
  }));

  return {
    simulatedCards,
    impacts
  };
}
