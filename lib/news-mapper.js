/**
 * Maps GDELT articles to Aetheris internal event format.
 */
function mapGdeltArticle(a) {
  const words = ((a.title || '') + ' ' + (a.domain || '')).trim().split(/\s+/);
  const brief = words.length <= 30 ? words.join(' ') : words.slice(0, 30).join(' ') + '...';

  let category = 'global';
  const domainLower = (a.domain || '').toLowerCase();
  const titleLower = (a.title || '').toLowerCase();

  if (domainLower.includes('market') || domainLower.includes('finance') || titleLower.includes('stock') || titleLower.includes('market')) {
    category = 'markets';
  } else if (titleLower.includes('storm') || titleLower.includes('earthquake') || titleLower.includes('fire') || titleLower.includes('weather')) {
    category = 'environment';
  } else if (titleLower.includes('city') || titleLower.includes('police') || titleLower.includes('council') || titleLower.includes('local')) {
    category = 'local';
  } else if (titleLower.includes('auto') || titleLower.includes('estate') || titleLower.includes('property') || titleLower.includes('sport')) {
    category = 'classifieds';
  }

  return {
    id: a.url || a.seendate,
    source: 'gdelt',
    text: (a.title || '').trim(),
    clusterSummary: brief,
    category,
    url: a.url || null,
    publishedAt: a.seendate || null,
    impactScore: a.socialimage ? 10 : 5,
    topic: (a.domain || '').split('.')[0] || 'world',
  };
}

export { mapGdeltArticle };

