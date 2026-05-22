function identifyClusters(events) {
  if (!Array.isArray(events)) {
    return [];
  }

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
      groups[theme].impactScore += 5; // +5 score per event
    }
  }

  return Object.values(groups);
}

module.exports = { identifyClusters };

export {};
