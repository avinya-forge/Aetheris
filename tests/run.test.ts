const assert = require('assert');
const { spawnSync } = require('child_process');
const path = require('path');

const scriptPath = path.join(__dirname, '..', 'script', 'run.sh');

// Execute script/run.sh --status
const result = spawnSync('bash', [scriptPath, '--status'], { encoding: 'utf-8' });

assert.strictEqual(result.status, 0, 'script/run.sh should exit with 0');
assert.ok(result.stdout.includes('Project Status:'), 'Output should contain Project Status');

console.log('PASS - run.test.js');

export {};
