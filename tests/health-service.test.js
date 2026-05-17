const assert = require('assert');
const { getSystemHealth } = require('../src/lib/services/health-service.js');

try {
  const health = getSystemHealth();
  assert.strictEqual(health.status, 'OK', 'Status should be OK');
  assert.ok(health.version, 'Version should be present');
  console.log('PASS - health-service.test.js');
} catch (e) {
  console.error('health-service.test.js failed:', e.message);
  process.exit(1);
}
