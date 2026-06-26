import assert from 'assert';
import { mapWeatherEvent } from '../lib/weather-mapper';

try {
  const loc = { id: 'london', lat: 51, lon: 0 };
  const raw = {
    current: { temperature_2m: 20, wind_speed_10m: 10, time: '2026-01-01' },
    hourly: { pm2_5: [10] }
  };

  const normal = mapWeatherEvent(raw, loc);
  assert.strictEqual(normal.impactScore, 5);

  const highAqi = mapWeatherEvent({
    current: { temperature_2m: 20, wind_speed_10m: 10, time: 't' },
    hourly: { pm2_5: [50] }
  }, loc);
  assert.strictEqual(highAqi.impactScore, 50);
  assert.strictEqual(highAqi.aqi.pm2_5, 50);

  console.log('PASS - weather-mapper.test.js');
} catch (e: any) {
  console.error('FAIL - weather-mapper.test.js:', e.message);
  process.exit(1);
}

export {};
