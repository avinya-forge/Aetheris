const fs = require('fs');
const path = require('path');
const assert = require('assert');
const { populateMissingDocs } = require('../lib/docs/generator.js');
const { parseDocsState } = require('../lib/docs/parser.js');

const testDir = path.join(__dirname, '..', 'tmp-docs');
if (!fs.existsSync(testDir)) {
  fs.mkdirSync(testDir, { recursive: true });
}

const requiredDocs = [
  'docs/planning/test_backlog.md',
  'docs/architecture/test_design.md'
];

const mockState = parseDocsState(testDir, requiredDocs);
assert.strictEqual(mockState[0].exists, false, 'generator.test.js: value mismatch');
assert.strictEqual(mockState[1].exists, false, 'generator.test.js: value mismatch');

populateMissingDocs(testDir, mockState);

const newState = parseDocsState(testDir, requiredDocs);
assert.strictEqual(newState[0].exists, true, 'generator.test.js: value mismatch');
assert.strictEqual(newState[1].exists, true, 'generator.test.js: value mismatch');

const backlogContent = fs.readFileSync(path.join(testDir, 'docs/planning/test_backlog.md'), 'utf8');
assert.strictEqual(backlogContent.trim(), '# test_backlog.md', 'generator.test.js: value mismatch');

// cleanup
fs.rmSync(testDir, { recursive: true, force: true });

console.log('PASS - generator.test.js');
