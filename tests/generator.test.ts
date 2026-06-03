import assert from 'assert';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { populateMissingDocs, updatePulseTable } from '../lib/generator';
import { parseDocsState } from '../lib/parser';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const testDir = path.join(__dirname, 'test-docs-gen');

try {
  // Test populateMissingDocs
  if (!fs.existsSync(testDir)) fs.mkdirSync(testDir);
  const requiredDocs = ['doc1.md', 'subdir/doc2.md'];
  const mockState = parseDocsState(testDir, requiredDocs);

  populateMissingDocs(testDir, mockState);

  assert.ok(fs.existsSync(path.join(testDir, 'doc1.md')), 'doc1.md should be created');
  assert.ok(fs.existsSync(path.join(testDir, 'subdir/doc2.md')), 'subdir/doc2.md should be created');
  assert.ok(fs.readFileSync(path.join(testDir, 'doc1.md'), 'utf8').includes('# doc1.md'), 'Should have default header');

  // Test updatePulseTable
  const readme = '## Pulse Table\n| Milestone | Ver | Phase | Status | Debt% |\n| :--- | :--- | :--- | :--- | :--- |\n| Old | 0.0.1 | 0 | done | 0 |';
  const stats = { version: '0.1.11', phase: '9-Quality', status: 'Stable', debt: '5%' };

  const updated = updatePulseTable(readme, stats);
  assert.ok(updated.includes('0.1.11'), 'Should update version');
  assert.ok(updated.includes('9-Quality'), 'Should update phase');

  // Edge case: No stats (covers line 30)
  assert.strictEqual(updatePulseTable(readme, null), readme, 'Should return original if no stats');

  // Edge case: No table but header exists (covers lines 43-48)
  const readmeNoTable = '## Pulse Table\nSome other text';
  const updatedNewTable = updatePulseTable(readmeNoTable, stats);
  assert.ok(updatedNewTable.includes('| Alpha Launch | 0.1.11'), 'Should create table after header');

  // Edge case: No header (returns original)
  assert.strictEqual(updatePulseTable('No table here', stats), 'No table here', 'Should return original if no header found');

  console.log('PASS - generator.test.js');
} catch (e: any) {
  console.error('FAIL - generator.test.js:', e.message);
  process.exit(1);
} finally {
  if (fs.existsSync(testDir)) {
    fs.rmSync(testDir, { recursive: true, force: true });
  }
}

export {};
