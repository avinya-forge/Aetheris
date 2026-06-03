function filterByImpact(newsArray, threshold) {
  if (!newsArray || !Array.isArray(newsArray)) return [];
  if (!threshold) return newsArray;

  return newsArray.filter(item => {
    // 1. Check impact score (required)
    if (threshold.minImpactScore !== undefined && (item.impactScore === undefined || item.impactScore < threshold.minImpactScore)) {
      return false;
    }

    // 2. Check county (optional)
    if (threshold.county && item.county !== threshold.county) {
      return false;
    }

    // 3. Check interests (optional)
    if (threshold.interests && Array.isArray(threshold.interests) && threshold.interests.length > 0) {
      const itemInterests = [...(item.tags || []), ...(item.category ? [item.category] : [])];

      if (itemInterests.length > 0) {
        const hasMatch = itemInterests.some(interest => threshold.interests.includes(interest));
        if (!hasMatch) return false;
      } else {
        return false;
      }
    }

    return true;
  });
}

export { filterByImpact };

