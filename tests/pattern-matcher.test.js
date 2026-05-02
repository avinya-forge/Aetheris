const assert = require('assert');
const { matchHistoricalPattern } = require('../lib/data/pattern-matcher.js');

assert.strictEqual(matchHistoricalPattern({ patternMatchId: '123' }), true, 'pattern-matcher.test.js assertion failed');
assert.strictEqual(matchHistoricalPattern({ patternMatchId: '123', speculative: false }), true, 'pattern-matcher.test.js must match');
assert.strictEqual(matchHistoricalPattern({ patternMatchId: '123', speculative: true }), false, 'pattern-matcher.test.js must match');
assert.strictEqual(matchHistoricalPattern({ patternMatchId: null }), false, 'pattern-matcher.test.js assertion failed');
assert.strictEqual(matchHistoricalPattern({}), false, 'pattern-matcher.test.js assertion failed');
assert.strictEqual(matchHistoricalPattern({ speculative: false }), false, 'pattern-matcher.test.js assertion failed');
assert.strictEqual(matchHistoricalPattern({ speculative: true }), false, 'pattern-matcher.test.js assertion failed');

console.log('PASS - pattern-matcher.test.js');
