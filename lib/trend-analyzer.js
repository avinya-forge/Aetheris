function analyzeTrends(clusters) {
  if (!Array.isArray(clusters) || clusters.length === 0) {
    return null;
  }

  // Return a new object that represents the cluster with the highest impactScore
  const sorted = [...clusters].sort((a, b) => {
    const scoreA = a.impactScore || 0;
    const scoreB = b.impactScore || 0;
    return scoreB - scoreA;
  });

  return sorted[0];
}

export { analyzeTrends };

