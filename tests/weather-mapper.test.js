const assert = require('assert');
const { mapWeatherEvent } = require('../lib/data/weather-mapper.js');

(async () => {
  try {
    const loc = { id: 'london', lat: 51.51, lon: -0.13 };
    const rawData = {
      current: {
        temperature_2m: 22,
        wind_speed_10m: 15,
        precipitation: 0,
        weather_code: 1,
        relative_humidity_2m: 60,
        apparent_temperature: 21,
        time: '2026-04-10T00:00'
      }
    };

    const normal = mapWeatherEvent(rawData, loc);
    assert.strictEqual(normal.source, 'open-meteo', 'source must be open-meteo');
    assert.strictEqual(normal.locationId, 'london', 'locationId must match');
    assert.strictEqual(normal.temperature, 22, 'temperature parsed correctly');
    assert.strictEqual(normal.impactScore, 5, 'normal conditions → impactScore 5');
    assert.ok(normal.id.includes('london'), 'id must include locationId');

    // Heatwave (temp >= 40) → elevated impact
    const heatwave = mapWeatherEvent({
      current: { temperature_2m: 42, wind_speed_10m: 10, time: 't' }
    }, loc);
    assert.strictEqual(heatwave.impactScore, 60, 'heatwave temp → impactScore 60');

    // Storm (wind >= 100) → elevated impact
    const storm = mapWeatherEvent({
      current: { temperature_2m: 15, wind_speed_10m: 120, time: 't' }
    }, loc);
    assert.strictEqual(storm.impactScore, 70, 'storm wind → impactScore 70');

    console.log('PASS - weather-mapper.test.js');
  } catch (err) {
    console.error('FAIL - weather-mapper.test.js:', err.message);
    process.exit(1);
  }
})();
