const assert = require('assert');
const { evaluateHazard } = require('../lib/data/hazard-evaluator');

// Test heatwave warning
assert.strictEqual(
  evaluateHazard({ temperature: 40 }),
  "It is 40°C. Your internal cooling is failing. Seek shade now.",
  "evaluateHazard: should return heatwave warning for 40°C"
);
assert.strictEqual(
  evaluateHazard({ temperature: 45 }),
  "It is 45°C. Your internal cooling is failing. Seek shade now.",
  "evaluateHazard: should return heatwave warning for 45°C"
);

// Test cold warning
assert.strictEqual(
  evaluateHazard({ temperature: -10 }),
  "It is -10°C. Hypothermia risk is high. Seek shelter.",
  "evaluateHazard: should return cold warning for -10°C"
);

// Test storm warning
assert.strictEqual(
  evaluateHazard({ windSpeed: 100 }),
  "Wind speeds at 100km/h detected. Severe storm incoming. Take cover.",
  "evaluateHazard: should return storm warning for 100km/h"
);

// Test safe conditions
assert.strictEqual(evaluateHazard({ temperature: 25, windSpeed: 20 }), null, 'evaluateHazard: should return null for safe conditions');
assert.strictEqual(evaluateHazard({}), null, 'evaluateHazard: should return null for empty input');

console.log('PASS - hazard-evaluator.test.js');

export {};
