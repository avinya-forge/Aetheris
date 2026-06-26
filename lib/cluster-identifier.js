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
