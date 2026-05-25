/**
 * Maps GDELT articles to Aetheris internal event format.
 */
function mapGdeltArticle(a) {
  return {
    id: a.url || a.seendate,
    source: 'gdelt',
    text: (a.title || '').trim(),
    url: a.url || null,
    publishedAt: a.seendate || null,
    // GDELT doesn't expose tone directly in artlist mode; baseline impact 5
    // Adjust upward if article appears in multiple sources (socialimage = viral)
    impactScore: a.socialimage ? 10 : 5,
    topic: (a.domain || '').split('.')[0] || 'world',
  };
}

module.exports = { mapGdeltArticle };

export {};
