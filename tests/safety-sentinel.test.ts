import assert from 'assert';
import { injectSafetyWarning } from '../lib/safety-sentinel';

// Test with valid data causing warnings
const heatWarning = injectSafetyWarning({ temperature: 40 });
assert.strictEqual(
  heatWarning,
  'It is 40°C. Your internal cooling is failing. Seek shade now.',
  'injectSafetyWarning: should return heat warning for 40°C'
);

const stormWarning = injectSafetyWarning({ windSpeed: 100 });
assert.strictEqual(
  stormWarning,
  'Wind speeds at 100km/h detected. Severe storm incoming. Take cover.',
  'injectSafetyWarning: should return storm warning for 100km/h'
);

const coldWarning = injectSafetyWarning({ temperature: -15 });
assert.strictEqual(
  coldWarning,
  'It is -15°C. Hypothermia risk is high. Seek shelter.',
  'injectSafetyWarning: should return cold warning for -15°C'
);

// Test with no hazard
const safeCondition = injectSafetyWarning({ temperature: 25, windSpeed: 20 });
assert.strictEqual(safeCondition, '', 'injectSafetyWarning: should return empty string for safe conditions');

// Test with empty or invalid data
assert.strictEqual(injectSafetyWarning({}, 'safety-sentinel.test.ts: strictEqual failure'), '', 'injectSafetyWarning: should return empty string for empty input');
assert.strictEqual(injectSafetyWarning(null, 'safety-sentinel.test.ts: strictEqual failure'), '', 'injectSafetyWarning: should return empty string for null input');
assert.strictEqual(injectSafetyWarning([], 'safety-sentinel.test.ts: strictEqual failure'), '', 'injectSafetyWarning: should return empty string for array input');

console.log('PASS - safety-sentinel.test.js');

export {};
