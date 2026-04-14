// NOAA Space Weather Prediction Center client — zero cost, public API
// Planetary Kp-index updates every 1 minute — fastest source in the pipeline.
// Docs: https://www.swpc.noaa.gov/products/planetary-k-index

const { mapKpIndex, mapSolarWind } = require('./space-weather-mapper.js');

const NOAA_KP_URL =
  'https://services.swpc.noaa.gov/json/planetary_k_index_1m.json';

const NOAA_SOLAR_WIND_URL =
  'https://services.swpc.noaa.gov/json/rtsw/rtsw_wind_1m.json';

/**
 * Fetch the latest Kp-index reading.
 * @param {Function} [fetcher]
 * @returns {Promise<Object|null>}
 */
async function fetchKpIndex(fetcher = globalThis.fetch) {
  const res = await fetcher(NOAA_KP_URL);
  if (!res.ok) throw new Error(`NOAA Kp fetch failed: ${res.status}`);
  const data = await res.json();
  if (!Array.isArray(data) || data.length === 0) return null;

  return mapKpIndex(data[data.length - 1]);
}

/**
 * Fetch real-time solar wind speed and density.
 * @param {Function} [fetcher]
 * @returns {Promise<Object|null>}
 */
async function fetchSolarWind(fetcher = globalThis.fetch) {
  const res = await fetcher(NOAA_SOLAR_WIND_URL);
  if (!res.ok) throw new Error(`NOAA solar wind fetch failed: ${res.status}`);
  const data = await res.json();
  if (!Array.isArray(data) || data.length === 0) return null;

  return mapSolarWind(data[data.length - 1]);
}

/**
 * Fetch all NOAA SWPC data in one call.
 * @param {Function} [fetcher]
 * @returns {Promise<Array>}
 */
async function fetchNoaaSwpc(fetcher = globalThis.fetch) {
  const [kp, wind] = await Promise.all([
    fetchKpIndex(fetcher).catch(() => null),
    fetchSolarWind(fetcher).catch(() => null),
  ]);
  return [kp, wind].filter(Boolean);
}

module.exports = { fetchNoaaSwpc, fetchKpIndex, fetchSolarWind, NOAA_KP_URL, NOAA_SOLAR_WIND_URL };
