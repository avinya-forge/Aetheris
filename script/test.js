const { spawnSync } = require('child_process');

console.log('Running tests with coverage gate (95% lines)...');

const result = spawnSync('npx', [
  'c8',
  '--check-coverage',
  '--lines', '95',
  '--exclude', 'tests/**',
  '--exclude', 'script/**',
  '--exclude', 'functions/edge-proxy.js',
  'npx', 'tsx', 'script/test-runner.js'
], { stdio: 'inherit' });

process.exit(result.status === 0 ? 0 : 1);
