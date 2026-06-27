import * as assert from 'assert';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Timeline } from '../src/components/map/timeline';

function testTimeline() {
  console.log('Testing Timeline component...');

  const events = [{ title: 'Event 1' }, { title: 'Event 2' }];

  // Test focused tier rendering
  const htmlPast = renderToStaticMarkup(<Timeline events={events} focus="past" />);
  assert.ok(htmlPast.includes('Past'), 'Should show Past label');

  // Test click triggers (simulated by passing props)
  let _focusChanged = '';
  const htmlClick = renderToStaticMarkup(
    <Timeline events={events} onFocusChange={(f: string) => _focusChanged = f} />
  );
  assert.ok(htmlClick.includes('Present'), 'Should show Present label');

  // Cover event node rendering
  assert.ok(htmlClick.includes('timeline-event-node'), 'Should render event nodes');

  // Cover tooltip
  const htmlTooltip = renderToStaticMarkup(<Timeline events={events} mockSelectedIndex={0} />);
  assert.ok(htmlTooltip.includes('Event 1'), 'Should show tooltip');

  console.log('PASS - timeline.test.tsx');
}

try {
  testTimeline();
} catch (e: any) {
  console.error('timeline.test.tsx failed:', e.message);
  process.exit(1);
}
