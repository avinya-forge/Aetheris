import assert from 'assert';
import { getSystemHealth } from '../src/lib/health-service';

try {
  const health = getSystemHealth();
  assert.strictEqual(health.status, 'OK', 'System status should be OK');
  assert.strictEqual(health.version, '0.1.11', 'System version should match current release');
  assert.ok(health.uptime > 0, 'Uptime should be a positive number');

  console.log('PASS - health-service.test.js');
} catch (e: any) {
  console.error('health-service.test.js failed:', e.message);
  process.exit(1);
}

export {};
