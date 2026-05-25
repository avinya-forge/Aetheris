import assert from 'assert';
import { spawnSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const scriptPath = path.join(__dirname, '..', 'script', 'run.sh');

// Execute script/run.sh --status
const result = spawnSync('bash', [scriptPath, '--status'], { encoding: 'utf-8' });

if (result.status !== 0) {
  console.error('script/run.sh --status failed with exit code', result.status);
  console.error('STDOUT:', result.stdout);
  console.error('STDERR:', result.stderr);
}

assert.strictEqual(result.status, 0, 'script/run.sh should exit with 0');
assert.ok(result.stdout.includes('Project Status:'), 'Output should contain Project Status');

console.log('PASS - run.test.ts');

export {};
