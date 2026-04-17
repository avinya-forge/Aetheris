const assert = require('assert');
const { matchHistoricalPattern } = require('../lib/data/pattern-matcher.js');

assert.strictEqual(matchHistoricalPattern({ patternMatchId: '123' }), true, 'Must match expected value');
assert.strictEqual(matchHistoricalPattern({ patternMatchId: '123', speculative: false }), true, 'Must match');
assert.strictEqual(matchHistoricalPattern({ patternMatchId: '123', speculative: true }), false, 'Must match');
assert.strictEqual(matchHistoricalPattern({ patternMatchId: null }), false, 'Must match expected value');
assert.strictEqual(matchHistoricalPattern({}), false, 'Must match expected value');
assert.strictEqual(matchHistoricalPattern({ speculative: false }), false, 'Must match expected value');
assert.strictEqual(matchHistoricalPattern({ speculative: true }), false, 'Must match expected value');

console.log('PASS - pattern-matcher.test.js');
