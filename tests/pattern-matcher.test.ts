import assert from 'assert';
import { matchHistoricalPattern } from '../lib/pattern-matcher';

assert.strictEqual(matchHistoricalPattern({ patternMatchId: '123', isSpeculative: false }), true, 'Should match if not speculative');
assert.strictEqual(matchHistoricalPattern({ patternMatchId: '123', isSpeculative: true }), false, 'Should NOT match if speculative is true');
assert.strictEqual(matchHistoricalPattern({ isSpeculative: false }), false, 'Should NOT match if missing patternMatchId');

console.log('PASS - pattern-matcher.test.js');

export {};
