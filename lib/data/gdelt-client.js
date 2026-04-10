// GDELT Project API client — zero cost, no API key
// Updates every 15 minutes. Monitors global media in 100+ languages.
// Docs: https://blog.gdeltproject.org/gdelt-doc-2-0-api-debuts/

const GDELT_URL =
  'https://api.gdeltproject.org/api/v2/doc/doc' +
  '?mode=artlist&format=json&maxrecords=50&timespan=15min&sort=DateDesc';

/**
 * Fetch the latest GDELT articles from the past 15 minutes.
 * @param {Function} [fetcher] - injectable for tests (defaults to globalThis.fetch)
 * @returns {Promise<Array<{ id, source, text, url, publishedAt, impactScore }>>}
 */
async function fetchGdelt(fetcher = globalThis.fetch) {
  const res = await fetcher(GDELT_URL);
  if (!res.ok) throw new Error(`GDELT fetch failed: ${res.status}`);
  const data = await res.json();
  const articles = Array.isArray(data.articles) ? data.articles : [];

  return articles.map(a => ({
    id: a.url || a.seendate,
    source: 'gdelt',
    text: (a.title || '').trim(),
    url: a.url || null,
    publishedAt: a.seendate || null,
    // GDELT doesn't expose tone directly in artlist mode; baseline impact 5
    // Adjust upward if article appears in multiple sources (socialimage = viral)
    impactScore: a.socialimage ? 10 : 5,
    topic: (a.domain || '').split('.')[0] || 'world',
  }));
}

module.exports = { fetchGdelt, GDELT_URL };
