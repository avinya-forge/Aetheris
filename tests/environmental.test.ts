import assert from 'assert';
import { environmentalSchema, evaluateAQI } from '../lib/environmental.js';

try {
  assert.strictEqual(typeof environmentalSchema, 'object', 'environmental.test.js: value mismatch');

  // Test valid AQI
  const validData = {
    hourly: {
      pm2_5: [55],
      pm10: [110]
    }
  };
  const event = evaluateAQI(validData, 'london');
  assert.ok(event, 'Should return event for high AQI');
  assert.strictEqual(event.severity, 'high');
  assert.strictEqual(event.impactScore, 7);

  // Test moderate AQI
  const moderateData = {
    hourly: {
      pm2_5: [30],
      pm10: [60]
    }
  };
  const eventMod = evaluateAQI(moderateData, 'paris');
  assert.ok(eventMod);
  assert.strictEqual(eventMod.severity, 'moderate');

  // Test low AQI
  const lowData = {
    hourly: {
      pm2_5: [10],
      pm10: [20]
    }
  };
  assert.strictEqual(evaluateAQI(lowData, 'tokyo'), null, 'Should return null for low AQI');

  // Test empty data
  assert.strictEqual(evaluateAQI(null, 'tokyo'), null);
  assert.strictEqual(evaluateAQI({}, 'tokyo'), null);
  assert.strictEqual(evaluateAQI({ hourly: {} }, 'tokyo'), null);

} catch (err: any) {
  console.error('FAIL - environmental.test.js:', err.message);
  process.exit(1);
}
console.log('PASS - environmental.test.js');
