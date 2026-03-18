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

assert.strictEqual(Array.isArray(result), true);
assert.strictEqual(result.length, 2);

const firstCard = result[0];
assert.strictEqual(firstCard.likelihood >= 0 && firstCard.likelihood <= 100, true);
assert.strictEqual(firstCard.speculative, false);
assert.strictEqual(firstCard.eventDetails.eventType, 'Heatwave');
assert.strictEqual(firstCard.eventDetails.location, 'Paris');

console.log('probability cones test passed');
