import assert from 'assert';
import { evaluateHazard } from '../lib/hazard-evaluator';

// Test heatwave warning
assert.strictEqual(
  evaluateHazard({ temperature: 40 }, 'hazard-evaluator.test.ts: strictEqual failure'),
  "It is 40°C. Your internal cooling is failing. Seek shade now.",
  "evaluateHazard: should return heatwave warning for 40°C"
);
assert.strictEqual(
  evaluateHazard({ temperature: 45 }, 'hazard-evaluator.test.ts: strictEqual failure'),
  "It is 45°C. Your internal cooling is failing. Seek shade now.",
  "evaluateHazard: should return heatwave warning for 45°C"
);

// Test cold warning
assert.strictEqual(
  evaluateHazard({ temperature: -10 }, 'hazard-evaluator.test.ts: strictEqual failure'),
  "It is -10°C. Hypothermia risk is high. Seek shelter.",
  "evaluateHazard: should return cold warning for -10°C"
);

// Test storm warning
assert.strictEqual(
  evaluateHazard({ windSpeed: 100 }, 'hazard-evaluator.test.ts: strictEqual failure'),
  "Wind speeds at 100km/h detected. Severe storm incoming. Take cover.",
  "evaluateHazard: should return storm warning for 100km/h"
);

// Test safe conditions
assert.strictEqual(evaluateHazard({ temperature: 25, windSpeed: 20 }, 'hazard-evaluator.test.ts: strictEqual failure'), null, 'evaluateHazard: should return null for safe conditions');
assert.strictEqual(evaluateHazard({}, 'hazard-evaluator.test.ts: strictEqual failure'), null, 'evaluateHazard: should return null for empty input');

console.log('PASS - hazard-evaluator.test.js');

export {};
