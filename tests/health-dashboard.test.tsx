import * as assert from 'assert';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { HealthDashboard } from '../src/components/ui/health-dashboard';

function testHealthDashboard() {
  console.log('Testing HealthDashboard component...');

  const metrics = { latency: 120, signalToNoise: 95 };
  const html = renderToStaticMarkup(<HealthDashboard metrics={metrics} />);

  assert.ok(html.includes('120ms'), 'Should show latency');
  assert.ok(html.includes('95%'), 'Should show signal to noise ratio');

  console.log('PASS - health-dashboard.test.js');
}

try {
  testHealthDashboard();
} catch (e: any) {
  console.error('health-dashboard.test.js failed:', e.message);
  process.exit(1);
}
