import assert from 'assert';
import { filterSpeculativePredictions } from '../lib/prediction-filter';

const predictions = [
  { id: 1, patternMatchId: 'A', speculative: false },
  { id: 2, patternMatchId: 'B', speculative: true },
  { id: 3, patternMatchId: 'C' },
  { id: 4, speculative: false },
  { id: 5 }
];

const filtered = filterSpeculativePredictions(predictions);

assert.strictEqual(filtered.length, 2, 'prediction-filter.test.js: expected values to be strictly equal');
assert.deepStrictEqual(filtered, [
  { id: 1, patternMatchId: 'A', speculative: false },
  { id: 3, patternMatchId: 'C' }
], 'Must match expected');

console.log('PASS - prediction-filter.test.js');

export {};
