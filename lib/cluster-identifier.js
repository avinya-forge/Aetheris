/**
 * Groups events by topic/theme and multi-day trends. (Level 2 Logic)
 */

export function identifyClusters(events) {
  if (!Array.isArray(events)) return [];

  const groups = {};

  for (const event of events) {
    if (!event || !event.topic) continue;
    const theme = event.topic;
    if (!groups[theme]) {
      groups[theme] = {
        clusterId: `cluster-${theme.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
        theme: theme,
        events: [],
        impactScore: 0,
        earliest: Infinity,
        latest: 0
      };
    }
    if (event.id) {
      groups[theme].events.push(event.id);
      groups[theme].impactScore += (event.impactScore || 5);
      const ts = event.timestamp || 0;
      if (ts < groups[theme].earliest) groups[theme].earliest = ts;
      if (ts > groups[theme].latest) groups[theme].latest = ts;
    }
  }

  return Object.values(groups);
}

/**
 * Identifies multi-day macro trends.
 */
export function identifyMacroClusters(clusters) {
  // Logic to group clusters into multi-day trends
  return clusters.filter(c => (c.latest - c.earliest) > 24 * 3600 * 1000);
}

/**
 * Groups predicted events by causal chain (patternMatchId).
 */
export function identifyHorizonImpacts(events) {
  if (!Array.isArray(events)) return [];

  const groups = {};

  for (const event of events) {
    if (!event || event.isSpeculative !== false || !event.patternMatchId) continue;

    const causalChainId = event.patternMatchId;
    if (!groups[causalChainId]) {
      groups[causalChainId] = {
        causalChainId,
        events: [],
        combinedImpact: 0,
        averageLikelihood: 0,
        _likelihoodSum: 0
      };
    }

    if (event.id) {
      groups[causalChainId].events.push(event.id);
      groups[causalChainId].combinedImpact += (event.impactScore || 0);
      groups[causalChainId]._likelihoodSum += (event.likelihood || 0);
    }
  }

  const results = Object.values(groups).map(g => {
    g.averageLikelihood = g.events.length > 0 ? (g._likelihoodSum / g.events.length) : 0;
    delete g._likelihoodSum;
    return g;
  });

  return results;
}
