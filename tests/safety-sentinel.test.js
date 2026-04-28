const assert = require('assert');
const { injectSafetyWarning } = require('../lib/data/safety-sentinel.js');

// Test with valid data causing warnings
const heatWarning = injectSafetyWarning({ temperature: 40 });
assert.strictEqual(
  heatWarning,
  "It is 40°C. Your internal cooling is failing. Seek shade now.",
  "Assert failed in strictEqual"
);

const stormWarning = injectSafetyWarning({ windSpeed: 100 });
assert.strictEqual(
  stormWarning,
  "Wind speeds at 100km/h detected. Severe storm incoming. Take cover.",
  "Assert failed in strictEqual"
);

const coldWarning = injectSafetyWarning({ temperature: -15 });
assert.strictEqual(
  coldWarning,
  "It is -15°C. Hypothermia risk is high. Seek shelter.",
  "Assert failed in strictEqual"
);

// Test with no hazard
const safeCondition = injectSafetyWarning({ temperature: 25, windSpeed: 20 });
assert.strictEqual(safeCondition, "", "Assert failed in strictEqual");

// Test with empty or invalid data
assert.strictEqual(injectSafetyWarning({}), "", "Assert failed in strictEqual");
assert.strictEqual(injectSafetyWarning(null), "", "Assert failed in strictEqual");
assert.strictEqual(injectSafetyWarning([]), "", "Assert failed in strictEqual");

console.log('PASS - safety-sentinel.test.js');
