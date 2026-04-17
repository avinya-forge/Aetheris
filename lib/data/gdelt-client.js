// GDELT Project API client — zero cost, no API key
// Updates every 15 minutes. Monitors global media in 100+ languages.
// Docs: https://blog.gdeltproject.org/gdelt-doc-2-0-api-debuts/

const GDELT_URL =
  'https://api.gdeltproject.org/api/v2/doc/doc' +
  '?mode=artlist&format=json&maxrecords=50&timespan=15min&sort=DateDesc';

/**
 * Fetch the latest GDELT articles from the past 15 minutes.
 * @param {Function} [fetcher] - injectable for tests (defaults to globalThis.fetch)
 * @returns {Promise<Array>}
 */
async function fetchGdelt(fetcher = globalThis.fetch) {
  const res = await fetcher(GDELT_URL);
  if (!res.ok) throw new Error(`GDELT fetch failed: ${res.status}`);
  const data = await res.json();
  return Array.isArray(data.articles) ? data.articles : [];
}

module.exports = { fetchGdelt, GDELT_URL };
