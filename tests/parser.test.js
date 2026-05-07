const assert = require('assert');
const path = require('path');
const { parseDocsState } = require('../lib/docs/parser.js');

const rootDir = path.join(__dirname, '..');
const state = parseDocsState(rootDir);

assert.ok(Array.isArray(state), 'Value must be present');
const index = state.find(doc => doc.path === 'docs/planning/backlog.md');
assert.ok(index, 'Value must be present');
assert.strictEqual(index.exists, true, 'parser.test.js assertion failed');

const standards = state.find(doc => doc.path === 'docs/rules/standards.md');
assert.ok(standards, 'Value must be present');
// If run.sh --sync has not been run or it has been run, it might be true or false.

const nonExistent = state.find(doc => doc.path === 'docs/fake/non_existent.md');
assert.strictEqual(nonExistent, undefined, 'parser.test.js assertion failed'); // We aren't testing missing items here unless we define required paths

// For the parser to work optimally, let's say it checks against a defined list of required docs
const requiredDocs = [
  'docs/planning/backlog.md',
  'docs/planning/roadmap.md',
  'docs/architecture/system_design.md',
  'docs/rules/standards.md'
];

const state2 = parseDocsState(rootDir, requiredDocs);
assert.ok(Array.isArray(state2), 'Value must be present');
assert.strictEqual(state2.length, requiredDocs.length, 'parser.test.js must match');
const index2 = state2.find(doc => doc.path === 'docs/planning/backlog.md');
assert.ok(index2, 'Value must be present');
assert.strictEqual(index2.exists, true, 'parser.test.js assertion failed');

console.log('PASS - parser.test.js');
