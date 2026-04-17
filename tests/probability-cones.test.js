const assert = require('assert');
const { generateGhostCards } = require('../lib/timeline/probability-cones.js');

// `matchHistoricalPattern` is imported by `probability-cones.js` from `../lib/data/pattern-matcher.js`.
// In a unit test, we usually mock, but since this project uses native 'assert' and no mocking library,
// we just rely on the actual implementation of `matchHistoricalPattern` which we verified exists and works.
const forecasts = [
  { eventType: 'Heatwave', location: 'Paris', patternMatchId: 'H123', speculative: false },
  { eventType: 'Storm', location: 'London', speculative: true }, // Should be excluded based on matchHistoricalPattern
  { eventType: 'Aurora', location: 'Iceland', patternMatchId: 'A456', speculative: false }
];

const result = generateGhostCards(forecasts);

assert.strictEqual(Array.isArray(result), true, 'Must match expected value');
assert.strictEqual(result.length, 2, 'Must match expected value');

const firstCard = result[0];
assert.strictEqual(firstCard.likelihood >= 0 && firstCard.likelihood <= 100, true, 'Must match expected value');
assert.strictEqual(firstCard.speculative, false, 'Must match expected value');
assert.strictEqual(firstCard.eventDetails.eventType, 'Heatwave', 'Must match expected value');
assert.strictEqual(firstCard.eventDetails.location, 'Paris', 'Must match expected value');

console.log('PASS - probability-cones.test.js');
