// NOAA Space Weather Prediction Center client — zero cost, public API
// Planetary Kp-index updates every 1 minute — fastest source in the pipeline.
// Docs: https://www.swpc.noaa.gov/products/planetary-k-index

const NOAA_KP_URL =
  'https://services.swpc.noaa.gov/json/planetary_k_index_1m.json';

const NOAA_SOLAR_WIND_URL =
  'https://services.swpc.noaa.gov/json/rtsw/rtsw_wind_1m.json';

/**
 * Fetch the latest Kp-index reading.
 * @param {Function} [fetcher]
 * @returns {Promise<{ id, source, kpIndex, estimated, timeTag, impactScore }|null>}
 */
async function fetchKpIndex(fetcher = globalThis.fetch) {
  const res = await fetcher(NOAA_KP_URL);
  if (!res.ok) throw new Error(`NOAA Kp fetch failed: ${res.status}`);
  const data = await res.json();
  if (!Array.isArray(data) || data.length === 0) return null;

  const latest = data[data.length - 1];
  const kp = parseFloat(latest.kp_index ?? latest.estimated_kp ?? 0);

  return {
    id: `noaa-kp-${latest.time_tag}`,
    source: 'noaa-swpc',
    kpIndex: kp,
    estimated: !!latest.estimated_kp,
    timeTag: latest.time_tag,
    // Impact escalates sharply at geomagnetic storm thresholds (Kp 5 = G1 storm)
    impactScore: kp >= 8 ? 90 : kp >= 6 ? 60 : kp >= 5 ? 30 : 5,
    topic: 'space-weather',
  };
}

/**
 * Fetch real-time solar wind speed and density (precursor to geomagnetic storms).
 * @param {Function} [fetcher]
 * @returns {Promise<{ id, source, windSpeed, density, timeTag }|null>}
 */
async function fetchSolarWind(fetcher = globalThis.fetch) {
  const res = await fetcher(NOAA_SOLAR_WIND_URL);
  if (!res.ok) throw new Error(`NOAA solar wind fetch failed: ${res.status}`);
  const data = await res.json();
  if (!Array.isArray(data) || data.length === 0) return null;

  const latest = data[data.length - 1];
  return {
    id: `noaa-wind-${latest.time_tag}`,
    source: 'noaa-swpc',
    windSpeed: parseFloat(latest.proton_speed ?? 0),
    density: parseFloat(latest.density ?? 0),
    timeTag: latest.time_tag,
    impactScore: 5,
    topic: 'space-weather',
  };
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
