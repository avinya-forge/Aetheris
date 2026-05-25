function filterByThreshold(event, threshold) {
  if (!event || !threshold || typeof event.impactScore !== 'number' || typeof threshold.minImpactScore !== 'number') {
    return false;
  }
  return event.impactScore >= threshold.minImpactScore;
}

module.exports = { filterByThreshold };

export {};
