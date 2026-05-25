import assert from 'assert';
import { generateGhostCards } from '../lib/probability-cones';

// `matchHistoricalPattern` is imported by `probability-cones.js` from `../lib/data/pattern-matcher.js`.
// In a unit test, we usually mock, but since this project uses native 'assert' and no mocking library,
// we just rely on the actual implementation of `matchHistoricalPattern` which we verified exists and works.
const forecasts = [
  { eventType: 'Heatwave', location: 'Paris', patternMatchId: 'H123', speculative: false },
  { eventType: 'Storm', location: 'London', speculative: true }, // Should be excluded based on matchHistoricalPattern
  { eventType: 'Aurora', location: 'Iceland', patternMatchId: 'A456', speculative: false }
];

const result = generateGhostCards(forecasts);

assert.strictEqual(Array.isArray(result, 'probability-cones.test.ts: strictEqual failure'), true, 'probability-cones.test.js: value mismatch');
assert.strictEqual(result.length, 2, 'probability-cones.test.js: value mismatch');

const firstCard = result[0];
assert.strictEqual(firstCard.likelihood >= 0 && firstCard.likelihood <= 100, true, 'probability-cones.test.js: value mismatch');
assert.strictEqual(firstCard.speculative, false, 'probability-cones.test.js: value mismatch');
assert.strictEqual(firstCard.eventDetails.eventType, 'Heatwave', 'probability-cones.test.js: value mismatch');
assert.strictEqual(firstCard.eventDetails.location, 'Paris', 'probability-cones.test.js: value mismatch');

console.log('PASS - probability-cones.test.js');

export {};
