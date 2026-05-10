const assert = require('assert');
const { evaluateHazard } = require('../lib/data/hazard-evaluator.js');

// Test heatwave warning
assert.strictEqual(
  evaluateHazard({ temperature: 40 }),
  "It is 40°C. Your internal cooling is failing. Seek shade now.",
  "Assert failed in strictEqual"
);
assert.strictEqual(
  evaluateHazard({ temperature: 45 }),
  "It is 45°C. Your internal cooling is failing. Seek shade now.",
  "Assert failed in strictEqual"
);

// Test cold warning
assert.strictEqual(
  evaluateHazard({ temperature: -10 }),
  "It is -10°C. Hypothermia risk is high. Seek shelter.",
  "Assert failed in strictEqual"
);

// Test storm warning
assert.strictEqual(
  evaluateHazard({ windSpeed: 100 }),
  "Wind speeds at 100km/h detected. Severe storm incoming. Take cover.",
  "Assert failed in strictEqual"
);

// Test safe conditions
assert.strictEqual(evaluateHazard({ temperature: 25, windSpeed: 20 }), null, 'Expected null');
assert.strictEqual(evaluateHazard({}), null, 'hazard-evaluator.test.js: expected values to be strictly equal');

console.log('PASS - hazard-evaluator.test.js');
