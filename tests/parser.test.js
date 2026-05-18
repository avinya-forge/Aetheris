const assert = require('assert');
const path = require('path');
const { parseDocsState } = require('../lib/docs/parser.js');

const rootDir = path.join(__dirname, '..');
const state = parseDocsState(rootDir);

assert.ok(Array.isArray(state), 'parser.test.js: missing value');
const index = state.find(doc => doc.path === 'docs/backlog.md');
assert.ok(index, 'parser.test.js: missing value');
assert.strictEqual(index.exists, true, 'parser.test.js: value mismatch');

const standards = state.find(doc => doc.path === 'docs/standards.md');
assert.ok(standards, 'parser.test.js: missing value');
// If run.sh --sync has not been run or it has been run, it might be true or false.

const nonExistent = state.find(doc => doc.path === 'docs/fake/non_existent.md');
assert.strictEqual(nonExistent, undefined, 'parser.test.js: value mismatch'); // We aren't testing missing items here unless we define required paths

// For the parser to work optimally, let's say it checks against a defined list of required docs
const requiredDocs = [
  'docs/backlog.md',
  'docs/roadmap.md',
  'docs/system_design.md',
  'docs/standards.md'
];

const state2 = parseDocsState(rootDir, requiredDocs);
assert.ok(Array.isArray(state2), 'parser.test.js: missing value');
assert.strictEqual(state2.length, requiredDocs.length, 'parser.test.js must match');
const index2 = state2.find(doc => doc.path === 'docs/backlog.md');
assert.ok(index2, 'parser.test.js: missing value');
assert.strictEqual(index2.exists, true, 'parser.test.js: value mismatch');

console.log('PASS - parser.test.js');
