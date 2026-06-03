import * as assert from 'assert';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Atlas } from '../src/components/map/atlas';
import { Timeline } from '../src/components/map/timeline';

try {
  console.log('Visual audit: Smoke testing UI components...');

  const events = [{ id: 'e1', lng: 0, lat: 0, title: 'Test Event', impact: 'HIGH' }];

  const atlasHtml = renderToStaticMarkup(<Atlas events={events} kpIndex={9} />);
  assert.ok(atlasHtml.includes('background:#4b0082'), 'Extreme Kp should render indigo background');
  assert.ok(atlasHtml.includes('Aetheris Atlas'), 'Atlas title should be visible');

  const timelineHtml = renderToStaticMarkup(<Timeline events={events} mockSelectedIndex={0} />);
  assert.ok(timelineHtml.includes('timeline-tooltip'), 'Timeline tooltip should render when an event is selected');
  assert.ok(timelineHtml.includes('Test Event'), 'Timeline should display selected event title');

  console.log('PASS - visual_audit.test.tsx');
} catch (e: any) {
  console.error('visual_audit.test.tsx failed:', e.message);
  process.exit(1);
}
