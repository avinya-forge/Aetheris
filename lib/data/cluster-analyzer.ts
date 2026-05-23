function analyzeClusters(events) {
  if (!Array.isArray(events)) return [];

  const clusters = [];

  events.forEach(event => {
    const { keywords } = event;
    if (!keywords || !Array.isArray(keywords)) return;

    const overlappingIndexes = [];
    for (let i = 0; i < clusters.length; i++) {
      const cluster = clusters[i];
      const hasOverlap = keywords.some(kw => cluster.keywords.includes(kw));
      if (hasOverlap) {
        overlappingIndexes.push(i);
      }
    }

    if (overlappingIndexes.length === 0) {
      clusters.push({
        id: `cluster-${clusters.length + 1}`,
        keywords: [...keywords],
        events: [event]
      });
    } else {
      const firstClusterIndex = overlappingIndexes[0];
      const targetCluster = clusters[firstClusterIndex];

      targetCluster.events.push(event);
      targetCluster.keywords = [...new Set([...targetCluster.keywords, ...keywords])];

      // Merge other overlapping clusters into the first one
      for (let i = overlappingIndexes.length - 1; i > 0; i--) {
        const idxToMerge = overlappingIndexes[i];
        const clusterToMerge = clusters[idxToMerge];

        targetCluster.events.push(...clusterToMerge.events);
        targetCluster.keywords = [...new Set([...targetCluster.keywords, ...clusterToMerge.keywords])];

        // Remove the merged cluster
        clusters.splice(idxToMerge, 1);
      }
    }
  });

  return clusters;
}

module.exports = { analyzeClusters };

export {};
