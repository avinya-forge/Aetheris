import assert from 'assert';
import { getSystemHealth } from '../src/lib/health-service';

try {
  const health = getSystemHealth();
  assert.strictEqual(health.status, 'OK', 'Status should be OK');
  assert.ok(health.version, 'Version should be present');
  console.log('PASS - health-service.test.js');
} catch (e) {
  console.error('health-service.test.js failed:', e.message);
  process.exit(1);
}

export {};
