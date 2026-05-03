const assert = require('assert');
const { fetchLocation, fetchOpenMeteo, buildUrl, DEFAULT_LOCATIONS } = require('../lib/data/open-meteo-client.js');

function makeFetcher(current, status = 200) {
  return async () => ({ ok: status >= 200 && status < 300, status, json: async () => ({ current }) });
}

(async () => {
  try {
    const loc = { id: 'london', lat: 51.51, lon: -0.13 };

    // --- fetchLocation normal ---
    const normal = await fetchLocation(loc, makeFetcher({
      temperature_2m: 22, wind_speed_10m: 15, precipitation: 0,
      weather_code: 1, relative_humidity_2m: 60, apparent_temperature: 21, time: '2026-04-10T00:00',
    }));
    assert.strictEqual(normal.current.temperature_2m, 22, 'return raw json');

    // --- fetchOpenMeteo (multi-location) ---
    let fetchCount = 0;
    const countingFetcher = async () => {
      fetchCount++;
      return { ok: true, json: async () => ({ current: { temperature_2m: 20, wind_speed_10m: 10, time: 't' } }) };
    };
    const results = await fetchOpenMeteo(DEFAULT_LOCATIONS, countingFetcher);
    assert.strictEqual(fetchCount, DEFAULT_LOCATIONS.length, 'one fetch per location');
    assert.strictEqual(results.length, DEFAULT_LOCATIONS.length, 'result per location');
    assert.strictEqual(results[0].current.temperature_2m, 20, "open-meteo-client.test.js strictEqual failed");

    // Partial failure: one 404 → others succeed
    let call2 = 0;
    const partialFetcher = async () => {
      call2++;
      return {
        ok: call2 !== 2,
        status: call2 === 2 ? 404 : 200,
        json: async () => ({ current: { temperature_2m: 20, wind_speed_10m: 5, time: 't' } }),
      };
    };
    const partial = await fetchOpenMeteo(DEFAULT_LOCATIONS.slice(0, 3), partialFetcher);
    assert.strictEqual(partial.filter(Boolean).length, 2, 'one 404 → 2 of 3 succeed');

    // --- buildUrl ---
    const url = buildUrl(51.51, -0.13);
    assert.ok(url.includes('api.open-meteo.com'), 'URL must use open-meteo.com');
    assert.ok(url.includes('latitude=51.51'), 'lat param present');
    assert.ok(url.includes('wind_speed_unit=kmh'), 'km/h unit enforced');

    assert.strictEqual(DEFAULT_LOCATIONS.length, 6, '6 sentinel locations defined');

  } catch (err) {
    console.error('FAIL - open-meteo-client.test.js:', err.message);
    process.exit(1);
  }
})();
console.log('PASS - open-meteo-client.test.js');
