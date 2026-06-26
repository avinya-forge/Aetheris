import * as assert from 'assert';
import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import { runBugHunter } from '../script/bug-hunter.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function testBugHunter() {
  console.log('Testing Bug Hunter...');

  // Create temp dir for testing
  const tempLibDir = path.join(__dirname, 'temp_lib');
  const tempTestsDir = path.join(__dirname, 'temp_tests');

  if (!fs.existsSync(tempLibDir)) fs.mkdirSync(tempLibDir);
  if (!fs.existsSync(tempTestsDir)) fs.mkdirSync(tempTestsDir);

  // Test 1: Clean codebase
  fs.writeFileSync(path.join(tempLibDir, 'clean.js'), 'export const clean = true;');
  fs.writeFileSync(path.join(tempTestsDir, 'clean.test.js'), 'test();');

  let issues = runBugHunter(tempLibDir, tempTestsDir);
  assert.strictEqual(issues.length, 0, 'Should find 0 issues in clean codebase');

  // Test 2: Missing test
  fs.writeFileSync(path.join(tempLibDir, 'notest.js'), 'export const notest = true;');
  issues = runBugHunter(tempLibDir, tempTestsDir);
  assert.strictEqual(issues.length, 1, 'Should find 1 issue (missing test)');
  assert.ok(issues[0].includes('Missing test file'), 'Issue should mention missing test');

  // Test 3: Illegal export default
  fs.writeFileSync(path.join(tempLibDir, 'default.js'), 'export default function() {}');
  fs.writeFileSync(path.join(tempTestsDir, 'default.test.js'), 'test();');
  issues = runBugHunter(tempLibDir, tempTestsDir);
  assert.strictEqual(issues.length, 2, 'Should find 2 issues (missing test + export default)');
  assert.ok(issues.some(i => i.includes('export default')), 'Issue should mention export default');

  // Test 4: Hardcoded secret
  fs.writeFileSync(path.join(tempLibDir, 'secret.js'), 'const key = "sk-123456789";');
  fs.writeFileSync(path.join(tempTestsDir, 'secret.test.js'), 'test();');
  issues = runBugHunter(tempLibDir, tempTestsDir);
  assert.strictEqual(issues.length, 3, 'Should find 3 issues');
  assert.ok(issues.some(i => i.includes('hardcoded secret')), 'Issue should mention hardcoded secret');

  // Cleanup
  fs.rmSync(tempLibDir, { recursive: true, force: true });
  fs.rmSync(tempTestsDir, { recursive: true, force: true });

  console.log('PASS - bug-hunter.test.js');
}

try {
  testBugHunter();
} catch (e) {
  console.error('bug-hunter.test.js failed:', e.message);
  process.exit(1);
}
