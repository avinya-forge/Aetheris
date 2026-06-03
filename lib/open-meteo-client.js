// Open-Meteo API client — zero cost, no API key required
// Weather model updates hourly. Global coverage.
// Docs: https://open-meteo.com/en/docs

const BASE_URL = 'https://api.open-meteo.com/v1/forecast';

// Sentinel city grid — representative coverage of each continent
const DEFAULT_LOCATIONS = [
  { id: 'london',    lat: 51.51,  lon: -0.13  },
  { id: 'new-york',  lat: 40.71,  lon: -74.01 },
  { id: 'tokyo',     lat: 35.69,  lon: 139.69 },
  { id: 'cape-town', lat: -33.92, lon: 18.42  },
  { id: 'sydney',    lat: -33.87, lon: 151.21 },
  { id: 'mumbai',    lat: 19.08,  lon: 72.88  },
];

const CURRENT_FIELDS = [
  'temperature_2m',
  'wind_speed_10m',
  'precipitation',
  'weather_code',
  'relative_humidity_2m',
  'apparent_temperature',
].join(',');

const HOURLY_AQI_FIELDS = [
  'pm10',
  'pm2_5',
  'carbon_monoxide',
  'nitrogen_dioxide',
  'sulphur_dioxide',
  'ozone',
  'uv_index'
].join(',');

/**
 * Build the Open-Meteo forecast URL for a given coordinate.
 * @param {number} lat
 * @param {number} lon
 * @returns {string}
 */
function buildUrl(lat, lon) {
  return `${BASE_URL}?latitude=${lat}&longitude=${lon}&current=${CURRENT_FIELDS}&hourly=${HOURLY_AQI_FIELDS}&forecast_days=1&wind_speed_unit=kmh`;
}

/**
 * Fetch current weather for a single location.
 * @param {{ id: string, lat: number, lon: number }} location
 * @param {Function} [fetcher]
 * @returns {Promise<object|null>}
 */
async function fetchLocation(location, fetcher = globalThis.fetch) {
  const url = buildUrl(location.lat, location.lon);
  const res = await fetcher(url);
  if (!res.ok) throw new Error(`Open-Meteo fetch failed for ${location.id}: ${res.status}`);
  return res.json();
}

/**
 * Fetch weather for all sentinel locations (parallel).
 * @param {Array<{ id, lat, lon }>} [locations]
 * @param {Function} [fetcher]
 * @returns {Promise<Array>}
 */
async function fetchOpenMeteo(locations = DEFAULT_LOCATIONS, fetcher = globalThis.fetch) {
  const results = await Promise.allSettled(
    locations.map(loc => fetchLocation(loc, fetcher))
  );
  return results
    .map(r => r.status === 'fulfilled' ? r.value : null);
}

export { fetchOpenMeteo, fetchLocation, buildUrl, DEFAULT_LOCATIONS };

