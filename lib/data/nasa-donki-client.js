// NASA DONKI (Space Weather Database Of Notifications, Knowledge, Information)
// Free API key required (1000 req/hr). DEMO_KEY works for low volume.
// Docs: https://api.nasa.gov/ → DONKI

const { DONKI_IMPACT_BY_TYPE } = require('./space-weather-mapper.js');

const BASE_URL = 'https://api.nasa.gov/DONKI';
const EVENT_TYPES = Object.keys(DONKI_IMPACT_BY_TYPE);

/**
 * Build NASA DONKI endpoint URL.
 */
function buildUrl(type, apiKey, startDate) {
  return `${BASE_URL}/${type}?api_key=${encodeURIComponent(apiKey)}&startDate=${startDate}`;
}

/**
 * Fetch a single event type from NASA DONKI.
 */
async function fetchEventType(type, apiKey, startDate, fetcher) {
  const url = buildUrl(type, apiKey, startDate);
  const res = await fetcher(url);
  if (!res.ok) return []; // skip silently — NASA rate-limits DEMO_KEY
  const data = await res.json();
  if (!Array.isArray(data)) return [];

  return data;
}

/**
 * Fetch all NASA DONKI event types for the past 24 hours.
 */
async function fetchNasaDonki(apiKey = 'DEMO_KEY', fetcher = globalThis.fetch) {
  const startDate = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10);
  const results = {};

  for (const type of EVENT_TYPES) {
    const events = await fetchEventType(type, apiKey, startDate, fetcher).catch(() => []);
    results[type] = events;
  }

  return results;
}

module.exports = { fetchNasaDonki, fetchEventType, buildUrl, EVENT_TYPES };
