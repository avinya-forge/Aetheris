import assert from 'assert';
import { mapKpIndex, mapSolarWind, mapDonkiEvent } from '../lib/space-weather-mapper';

try {
  // Test Kp Index Mapping
  const rawKp = [{ kp_index: '5.333', time_tag: '2024-01-01T00:00:00' }];
  const mappedKp = mapKpIndex(rawKp);
  assert.strictEqual(mappedKp.kpIndex, 5.333, 'space-weather-mapper.test.js: value mismatch');
  assert.strictEqual(mappedKp.impactScore, 30, 'space-weather-mapper.test.js: value mismatch');
  assert.strictEqual(mappedKp.source, 'noaa-swpc', 'space-weather-mapper.test.js: value mismatch');

  // Test Solar Wind Mapping
  const rawWind = [{ proton_speed: '450.5', density: '5.2', time_tag: '2024-01-01T00:00:00' }];
  const mappedWind = mapSolarWind(rawWind);
  assert.strictEqual(mappedWind.windSpeed, 450.5, 'space-weather-mapper.test.js: value mismatch');
  assert.strictEqual(mappedWind.density, 5.2, 'space-weather-mapper.test.js: value mismatch');
  assert.strictEqual(mappedWind.impactScore, 5, 'space-weather-mapper.test.js: value mismatch');

  // Test DONKI Event Mapping
  const rawDonki = { activityID: '123', startTime: '2024-01-01T00:00:00', note: 'Test CME' };
  const mappedDonki = mapDonkiEvent(rawDonki, 'CME');
  assert.strictEqual(mappedDonki.eventType, 'CME', 'space-weather-mapper.test.js: value mismatch');
  assert.strictEqual(mappedDonki.impactScore, 40, 'space-weather-mapper.test.js: value mismatch');

} catch (err) {
  console.error('FAIL - space-weather-mapper.test.js:', err);
  process.exit(1);
}
console.log('PASS - space-weather-mapper.test.js');

export {};
