import * as assert from 'assert';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Timeline } from '../src/components/map/timeline';

try {
  console.log('Testing Timeline component...');
  const events = [
    { title: 'Solar Flare' },
    { title: 'Geomagnetic Storm' }
  ];

  // Test basic rendering
  const html = renderToStaticMarkup(<Timeline events={events} />);
  assert.ok(html.includes('timeline-container'), 'Timeline should render container');
  assert.ok(html.includes('Solar Flare'), 'Timeline should render first event title');
  assert.ok(html.includes('Geomagnetic Storm'), 'Timeline should render second event title');

  // Test selectedIndex behavior via mock injection
  const htmlSelected = renderToStaticMarkup(<Timeline events={events} mockSelectedIndex={0} />);
  assert.ok(htmlSelected.includes('timeline-tooltip'), 'Should render tooltip when an event is selected');
  assert.ok(htmlSelected.includes('Solar Flare'), 'Tooltip should contain selected event title');
  assert.ok(htmlSelected.includes('background:#00d2ff'), 'Selected node should have highlight color');

  // Test empty events
  const htmlEmpty = renderToStaticMarkup(<Timeline />);
  assert.ok(htmlEmpty.includes('timeline-container'), 'Timeline should render container even with no events');

  console.log('PASS - timeline.test.tsx');
} catch (e: any) {
  console.error('timeline.test.tsx failed:', e.message);
  process.exit(1);
}
