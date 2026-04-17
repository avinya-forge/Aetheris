const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const testsDir = path.join(__dirname, '..', 'tests');
const files = fs.readdirSync(testsDir).filter(f => f.endsWith('.test.js'));

console.log(`Running ${files.length} tests...`);
let passed = 0;
let failed = 0;

files.forEach(file => {
  const result = spawnSync('node', [path.join(testsDir, file)], { stdio: 'inherit' });
  if (result.status === 0) {
    passed++;
  } else {
    failed++;
  }
});

console.log(`\nTests complete: ${passed} passed, ${failed} failed.`);
process.exit(failed > 0 ? 1 : 0);
