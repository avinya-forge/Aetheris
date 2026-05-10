const assert = require('assert');
const { mapKpIndex, mapSolarWind, mapDonkiEvent } = require('../lib/data/space-weather-mapper.js');

try {
  // Test Kp Index Mapping
  const rawKp = { kp_index: "5.333", time_tag: "2024-01-01T00:00:00" };
  const mappedKp = mapKpIndex(rawKp);
  assert.strictEqual(mappedKp.kpIndex, 5.333, 'space-weather-mapper.test.js: expected values to be strictly equal');
  assert.strictEqual(mappedKp.impactScore, 30, 'space-weather-mapper.test.js: expected values to be strictly equal');
  assert.strictEqual(mappedKp.source, 'noaa-swpc', 'space-weather-mapper.test.js: expected values to be strictly equal');

  // Test Solar Wind Mapping
  const rawWind = { proton_speed: "450.5", density: "5.2", time_tag: "2024-01-01T00:00:00" };
  const mappedWind = mapSolarWind(rawWind);
  assert.strictEqual(mappedWind.windSpeed, 450.5, 'space-weather-mapper.test.js: expected values to be strictly equal');
  assert.strictEqual(mappedWind.density, 5.2, 'space-weather-mapper.test.js: expected values to be strictly equal');
  assert.strictEqual(mappedWind.impactScore, 5, 'space-weather-mapper.test.js: expected values to be strictly equal');

  // Test DONKI Event Mapping
  const rawDonki = { activityID: "123", startTime: "2024-01-01T00:00:00", note: "Test CME" };
  const mappedDonki = mapDonkiEvent(rawDonki, 'CME');
  assert.strictEqual(mappedDonki.eventType, 'CME', 'space-weather-mapper.test.js: expected values to be strictly equal');
  assert.strictEqual(mappedDonki.impactScore, 40, 'space-weather-mapper.test.js: expected values to be strictly equal');

} catch (err) {
  console.error('FAIL - space-weather-mapper.test.js:', err);
  process.exit(1);
}
console.log('PASS - space-weather-mapper.test.js');
