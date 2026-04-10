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
    assert.strictEqual(normal.source, 'open-meteo', 'source must be open-meteo');
    assert.strictEqual(normal.locationId, 'london', 'locationId must match');
    assert.strictEqual(normal.temperature, 22, 'temperature parsed correctly');
    assert.strictEqual(normal.impactScore, 5, 'normal conditions → impactScore 5');
    assert.ok(normal.id.includes('london'), 'id must include locationId');

    // Heatwave (temp >= 40) → elevated impact
    const heatwave = await fetchLocation(loc, makeFetcher({
      temperature_2m: 42, wind_speed_10m: 10, precipitation: 0,
      weather_code: 2, relative_humidity_2m: 80, apparent_temperature: 48, time: 't',
    }));
    assert.strictEqual(heatwave.impactScore, 60, 'heatwave temp → impactScore 60');

    // Storm (wind >= 100) → elevated impact
    const storm = await fetchLocation(loc, makeFetcher({
      temperature_2m: 15, wind_speed_10m: 120, precipitation: 5,
      weather_code: 9, relative_humidity_2m: 95, apparent_temperature: 10, time: 't',
    }));
    assert.strictEqual(storm.impactScore, 70, 'storm wind → impactScore 70');

    // Combined extreme → max impact
    const extreme = await fetchLocation(loc, makeFetcher({
      temperature_2m: 45, wind_speed_10m: 110, precipitation: 0,
      weather_code: 9, relative_humidity_2m: 90, apparent_temperature: 52, time: 't',
    }));
    assert.strictEqual(extreme.impactScore, 70, 'combined extreme → max impactScore');

    // --- fetchOpenMeteo (multi-location) ---
    let fetchCount = 0;
    const countingFetcher = async () => {
      fetchCount++;
      return { ok: true, json: async () => ({ current: { temperature_2m: 20, wind_speed_10m: 10, time: 't' } }) };
    };
    const results = await fetchOpenMeteo(DEFAULT_LOCATIONS, countingFetcher);
    assert.strictEqual(fetchCount, DEFAULT_LOCATIONS.length, 'one fetch per location');
    assert.strictEqual(results.length, DEFAULT_LOCATIONS.length, 'result per location');

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
    assert.strictEqual(partial.length, 2, 'one 404 → 2 of 3 succeed');

    // --- buildUrl ---
    const url = buildUrl(51.51, -0.13);
    assert.ok(url.includes('api.open-meteo.com'), 'URL must use open-meteo.com');
    assert.ok(url.includes('latitude=51.51'), 'lat param present');
    assert.ok(url.includes('wind_speed_unit=kmh'), 'km/h unit enforced');

    assert.strictEqual(DEFAULT_LOCATIONS.length, 6, '6 sentinel locations defined');

    console.log('PASS - open-meteo-client.test.js');
  } catch (err) {
    console.error('FAIL - open-meteo-client.test.js:', err.message);
    process.exit(1);
  }
})();
