const assert = require('assert');
const { matchHistoricalPattern } = require('../lib/data/pattern-matcher.js');

assert.strictEqual(matchHistoricalPattern({ patternMatchId: '123' }), true);
assert.strictEqual(matchHistoricalPattern({ patternMatchId: '123', speculative: false }), true);
assert.strictEqual(matchHistoricalPattern({ patternMatchId: '123', speculative: true }), false);
assert.strictEqual(matchHistoricalPattern({ patternMatchId: null }), false);
assert.strictEqual(matchHistoricalPattern({}), false);
assert.strictEqual(matchHistoricalPattern({ speculative: false }), false);
assert.strictEqual(matchHistoricalPattern({ speculative: true }), false);

console.log('pattern matcher test passed');
