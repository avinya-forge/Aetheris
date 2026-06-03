import assert from 'assert';
import path from 'path';
import { fileURLToPath } from 'url';
import { parseDocsState, parseBacklog } from '../lib/parser';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

// Test parseDocsState
const state = parseDocsState(rootDir);
assert.ok(Array.isArray(state), 'parser.test.ts: state must be an array');
const backlogDoc = state.find(doc => doc.path === 'docs/backlog.md');
assert.ok(backlogDoc, 'parser.test.ts: backlog doc must be present in state');
assert.strictEqual(backlogDoc.exists, true, 'parser.test.ts: docs/backlog.md should exist');

const requiredDocs = [
  'docs/backlog.md',
  'docs/roadmap.md',
  'docs/system_design.md',
  'docs/standards.md'
];
const state2 = parseDocsState(rootDir, requiredDocs);
assert.strictEqual(state2.length, requiredDocs.length, 'parser.test.ts: state2 length mismatch');

// Test parseBacklog (covers lines 33-52)
const mockBacklog = `
# Backlog
- [ ] TASK: task-pending | Target: path/pending | I/O: type | Assert: cond | LOC: 10
- [x] TASK: task-done | Target: path/done | I/O: type | Assert: cond | LOC: 20
- [ ] NOT A TASK
Some other line.
- [x] TASK: task-with-spaces | Target: src/lib/file.js | I/O: audit | Assert: clean | LOC: 5
`;

const tasks = parseBacklog(mockBacklog);
assert.strictEqual(tasks.length, 3, 'parser.test.ts: Should parse exactly 3 tasks');

assert.strictEqual(tasks[0].id, 'task-pending', 'parser.test.ts: Pending task ID');
assert.strictEqual(tasks[0].status, 'pending', 'parser.test.ts: Pending task status');
assert.strictEqual(tasks[0].target, 'path/pending', 'parser.test.ts: Pending task target');

assert.strictEqual(tasks[1].id, 'task-done', 'parser.test.ts: Done task ID');
assert.strictEqual(tasks[1].status, 'done', 'parser.test.ts: Done task status');
assert.strictEqual(tasks[1].target, 'path/done', 'parser.test.ts: Done task target');

assert.strictEqual(tasks[2].id, 'task-with-spaces', 'parser.test.ts: Spaced task ID');
assert.strictEqual(tasks[2].target, 'src/lib/file.js', 'parser.test.ts: Spaced task target');

console.log('PASS - parser.test.js');

export {};
