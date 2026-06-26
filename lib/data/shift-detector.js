/**
 * Identifies significant changes in geopolitical event intensity.
 */

export function detectGeopoliticalShifts(historicalEvents, currentEvents) {
  if (!historicalEvents || !currentEvents) return [];

  const historicalAvg = historicalEvents.length / 7; // simplified 1-week avg
  const currentCount = currentEvents.length;

  if (currentCount > historicalAvg * 2) {
    return [{
      type: 'GEOPOLITICAL_SHIFT',
      intensity: currentCount / historicalAvg,
      description: 'Significant spike in regional activity detected.'
    }];
  }

  return [];
}
