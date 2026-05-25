const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const testsDir = path.join(__dirname, '..', 'tests');
// Exclude .spec.js as they are Playwright E2E tests
const files = fs.readdirSync(testsDir).filter(f => f.endsWith('.test.ts') || f.endsWith('.test.tsx'));

let failedCount = 0;

files.forEach(file => {
  const result = spawnSync('npx', ['tsx', path.join(testsDir, file)], { stdio: 'inherit' });
  if (result.status !== 0) {
    failedCount++;
  }
});

process.exit(failedCount > 0 ? 1 : 0);
