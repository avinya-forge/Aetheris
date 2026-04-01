const assert = require('assert');
const path = require('path');
const { parseDocsState } = require('../lib/docs/parser.js');

const rootDir = path.join(__dirname, '..');
const state = parseDocsState(rootDir);

assert.ok(Array.isArray(state));
const index = state.find(doc => doc.path === 'docs/backlog/index.md');
assert.ok(index);
assert.strictEqual(index.exists, true);

const conventions = state.find(doc => doc.path === 'docs/core/conventions.md');
assert.ok(conventions);
// If run.sh --sync has not been run or it has been run, it might be true or false.

const nonExistent = state.find(doc => doc.path === 'docs/fake/non_existent.md');
assert.strictEqual(nonExistent, undefined); // We aren't testing missing items here unless we define required paths

// For the parser to work optimally, let's say it checks against a defined list of required docs
const requiredDocs = [
  'docs/backlog/index.md',
  'docs/core/roadmap.md',
  'docs/core/system_design.md',
  'docs/core/conventions.md'
];

const state2 = parseDocsState(rootDir, requiredDocs);
assert.ok(Array.isArray(state2));
assert.strictEqual(state2.length, requiredDocs.length);
const index2 = state2.find(doc => doc.path === 'docs/backlog/index.md');
assert.ok(index2);
assert.strictEqual(index2.exists, true);

console.log('docs-parser test passed');
