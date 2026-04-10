// NASA DONKI (Space Weather Database Of Notifications, Knowledge, Information)
// Free API key required (1000 req/hr). DEMO_KEY works for low volume.
// Docs: https://api.nasa.gov/ → DONKI
// Events: CME (coronal mass ejection), FLR (solar flare), SEP (energetic particles), MPC (magnetopause crossing)

const BASE_URL = 'https://api.nasa.gov/DONKI';

// Impact scores by event type — space weather severity mapping
const IMPACT_BY_TYPE = {
  CME: 40,  // Earth-directed CMEs can cause G-class geomagnetic storms
  FLR: 25,  // X-class flares disrupt HF radio
  SEP: 35,  // Solar energetic particles — radiation hazard
  MPC: 15,  // Magnetopause crossing — moderate aurora activity
};

const EVENT_TYPES = Object.keys(IMPACT_BY_TYPE);

/**
 * Build NASA DONKI endpoint URL.
 * @param {string} type
 * @param {string} apiKey
 * @param {string} startDate - ISO date string (YYYY-MM-DD)
 * @returns {string}
 */
function buildUrl(type, apiKey, startDate) {
  return `${BASE_URL}/${type}?api_key=${encodeURIComponent(apiKey)}&startDate=${startDate}`;
}

/**
 * Fetch a single event type from NASA DONKI.
 * @param {string} type
 * @param {string} apiKey
 * @param {string} startDate
 * @param {Function} fetcher
 * @returns {Promise<Array>}
 */
async function fetchEventType(type, apiKey, startDate, fetcher) {
  const url = buildUrl(type, apiKey, startDate);
  const res = await fetcher(url);
  if (!res.ok) return []; // skip silently — NASA rate-limits DEMO_KEY
  const data = await res.json();
  if (!Array.isArray(data)) return [];

  return data.map(event => ({
    id: event.messageID || event.activityID || `donki-${type}-${event.beginTime || event.startTime}`,
    source: 'nasa-donki',
    eventType: type,
    startTime: event.startTime || event.beginTime || null,
    endTime: event.endTime || null,
    note: (event.note || '').slice(0, 200),
    impactScore: IMPACT_BY_TYPE[type] || 10,
    topic: 'space-weather',
  }));
}

/**
 * Fetch all NASA DONKI event types for the past 24 hours (sequential to respect rate limits).
 * @param {string} [apiKey]
 * @param {Function} [fetcher]
 * @returns {Promise<Array>}
 */
async function fetchNasaDonki(apiKey = 'DEMO_KEY', fetcher = globalThis.fetch) {
  const startDate = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10);
  const results = [];

  for (const type of EVENT_TYPES) {
    const events = await fetchEventType(type, apiKey, startDate, fetcher).catch(() => []);
    results.push(...events);
  }

  return results;
}

module.exports = { fetchNasaDonki, fetchEventType, buildUrl, EVENT_TYPES, IMPACT_BY_TYPE };
