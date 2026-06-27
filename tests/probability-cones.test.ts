import assert from 'assert';
import { generateGhostCards } from '../lib/probability-cones';

const forecasts = [
  { eventType: 'Heatwave', location: 'Paris', patternMatchId: 'H123', isSpeculative: false },
  { eventType: 'Storm', location: 'London', isSpeculative: true },
  { eventType: 'Aurora', location: 'Iceland', patternMatchId: 'A456', isSpeculative: false }
];

const result = generateGhostCards(forecasts);

assert.strictEqual(Array.isArray(result), true, 'probability-cones.test.ts: result must be an array');
assert.strictEqual(result.length, 2, 'probability-cones.test.ts: result length mismatch');

const firstCard = result[0];
assert.strictEqual(firstCard.likelihood >= 0 && firstCard.likelihood <= 0.95, true, 'probability-cones.test.ts: likelihood must be <= 0.95');
assert.strictEqual(firstCard.isSpeculative, false, 'probability-cones.test.ts: isSpeculative mismatch');
assert.strictEqual(firstCard.eventDetails.eventType, 'Heatwave', 'probability-cones.test.ts: eventType mismatch');
assert.strictEqual(firstCard.eventDetails.location, 'Paris', 'probability-cones.test.ts: location mismatch');

console.log('PASS - probability-cones.test.js');

export {};
