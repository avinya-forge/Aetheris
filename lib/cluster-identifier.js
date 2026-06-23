/**
 * Groups events by topic/theme. (Level 2 Logic)
 * @param {Array} events
 * @returns {Array}
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
        impactScore: 0
      };
    }
    if (event.id) {
      groups[theme].events.push(event.id);
      groups[theme].impactScore += 5;
    }
  }

  return Object.values(groups);
}
