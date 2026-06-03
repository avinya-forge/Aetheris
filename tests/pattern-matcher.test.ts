import assert from 'assert';
import { matchHistoricalPattern } from '../lib/pattern-matcher';

assert.strictEqual(matchHistoricalPattern({ patternMatchId: '123' }), true, 'Should match if patternMatchId is present');
assert.strictEqual(matchHistoricalPattern({ patternMatchId: '123', speculative: false }), true, 'Should match if not speculative');
assert.strictEqual(matchHistoricalPattern({ patternMatchId: '123', speculative: true }), false, 'Should NOT match if speculative is true');
assert.strictEqual(matchHistoricalPattern({ patternMatchId: null }), false, 'Should NOT match if patternMatchId is null');
assert.strictEqual(matchHistoricalPattern({}), false, 'Should NOT match if empty object');
assert.strictEqual(matchHistoricalPattern({ speculative: false }), false, 'Should NOT match if missing patternMatchId');

console.log('PASS - pattern-matcher.test.js');

export {};
