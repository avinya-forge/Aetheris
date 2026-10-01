import * as assert from 'assert';
import { execSync } from 'child_process';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

function testStatusScript() {
  console.log('Testing Status script...');
  const output = execSync(`node ${path.join(rootDir, 'script', 'status.js')}`, { encoding: 'utf-8' });
  assert.ok(output.includes('Project Status: Aetheris'), 'Should contain title');
  assert.ok(output.includes('Pending Tasks:'), 'Should count pending tasks');
  assert.ok(output.includes('Completed Tasks:'), 'Should count completed tasks');
  console.log('PASS - status.test.js');
}

try {
  testStatusScript();
} catch (e) {
  console.error('status.test.ts failed:', e);
  process.exit(1);
}
