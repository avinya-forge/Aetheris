import assert from 'assert';
import { matchHistoricalPattern } from '../lib/pattern-matcher';

assert.strictEqual(matchHistoricalPattern({ patternMatchId: '123' }, 'pattern-matcher.test.ts: strictEqual failure'), true, 'pattern-matcher.test.js: value mismatch');
assert.strictEqual(matchHistoricalPattern({ patternMatchId: '123', speculative: false }, 'pattern-matcher.test.ts: strictEqual failure'), true, 'pattern-matcher.test.js must match');
assert.strictEqual(matchHistoricalPattern({ patternMatchId: '123', speculative: true }, 'pattern-matcher.test.ts: strictEqual failure'), false, 'pattern-matcher.test.js must match');
assert.strictEqual(matchHistoricalPattern({ patternMatchId: null }, 'pattern-matcher.test.ts: strictEqual failure'), false, 'pattern-matcher.test.js: value mismatch');
assert.strictEqual(matchHistoricalPattern({}, 'pattern-matcher.test.ts: strictEqual failure'), false, 'pattern-matcher.test.js: value mismatch');
assert.strictEqual(matchHistoricalPattern({ speculative: false }, 'pattern-matcher.test.ts: strictEqual failure'), false, 'pattern-matcher.test.js: value mismatch');
assert.strictEqual(matchHistoricalPattern({ speculative: true }, 'pattern-matcher.test.ts: strictEqual failure'), false, 'pattern-matcher.test.js: value mismatch');

console.log('PASS - pattern-matcher.test.js');

export {};
