import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import assert from 'assert';
import { populateMissingDocs, updatePulseTable } from '../lib/generator';
import { parseDocsState } from '../lib/parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const testDir = path.join(__dirname, '..', 'tmp-docs');
if (!fs.existsSync(testDir)) {
  fs.mkdirSync(testDir, { recursive: true });
}

const requiredDocs = [
  'docs/test_backlog.md',
  'docs/test_design.md'
];

const mockState = parseDocsState(testDir, requiredDocs);
assert.strictEqual(mockState[0].exists, false, 'generator.test.js: initial state check failed');
assert.strictEqual(mockState[1].exists, false, 'generator.test.js: initial state check failed');

populateMissingDocs(testDir, mockState);

const newState = parseDocsState(testDir, requiredDocs);
assert.strictEqual(newState[0].exists, true, 'generator.test.js: file should exist after populate');
assert.strictEqual(newState[1].exists, true, 'generator.test.js: file should exist after populate');

const backlogContent = fs.readFileSync(path.join(testDir, 'docs/test_backlog.md'), 'utf8');
assert.strictEqual(backlogContent.trim(), '# test_backlog.md', 'generator.test.js: backlog content mismatch');

// Test updatePulseTable
const mockReadme = `## Pulse Table
| Milestone | Ver | Phase | Status | Debt% |
| :--- | :--- | :--- | :--- | :--- |
| Alpha Launch | 0.1.7 | 1-Strategy | Active Focus | 33% |

## Next Section`;

const stats = { version: '0.1.8', phase: '2-Data', status: 'Done', debt: '10%' };
const updatedReadme = updatePulseTable(mockReadme, stats);
assert.ok(updatedReadme.includes('| Alpha Launch | 0.1.8 | 2-Data | Done | 10% |'), 'generator.test.js: updatePulseTable failed to update row');
assert.ok(!updatedReadme.includes('0.1.7'), 'generator.test.js: updatePulseTable failed to replace old row');

// cleanup
fs.rmSync(testDir, { recursive: true, force: true });

console.log('PASS - generator.test.js');

export {};
