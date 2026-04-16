const assert = require('assert');
const { evaluateHazard } = require('../lib/data/hazard-evaluator.js');

// Test heatwave warning
assert.strictEqual(
  evaluateHazard({ temperature: 40 }),
  "It is 40°C. Your internal cooling is failing. Seek shade now."
);
assert.strictEqual(
  evaluateHazard({ temperature: 45 }),
  "It is 45°C. Your internal cooling is failing. Seek shade now."
);

// Test cold warning
assert.strictEqual(
  evaluateHazard({ temperature: -10 }),
  "It is -10°C. Hypothermia risk is high. Seek shelter."
);

// Test storm warning
assert.strictEqual(
  evaluateHazard({ windSpeed: 100 }),
  "Wind speeds at 100km/h detected. Severe storm incoming. Take cover."
);

// Test safe conditions
assert.strictEqual(evaluateHazard({ temperature: 25, windSpeed: 20 }), null, 'Expected null');
assert.strictEqual(evaluateHazard({}), null, 'Must match expected value');

console.log('PASS - hazard-evaluator.test.js');
