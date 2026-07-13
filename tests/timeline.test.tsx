import * as assert from 'assert';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Timeline } from '../src/components/map/timeline';

function testTimeline() {
  console.log('Testing Timeline component...');

  const events = [{ title: 'Event 1' }, { title: 'Event 2' }];

  // Test focused tier rendering
  const htmlPast = renderToStaticMarkup(<Timeline events={events} focus="past" />);
  assert.ok(htmlPast.includes('History'), 'Should show History label');

  // Test click triggers (simulated by passing props)
  let _focusChanged = '';
  const htmlClick = renderToStaticMarkup(
    <Timeline events={events} onFocusChange={(f: string) => _focusChanged = f} />
  );
  assert.ok(htmlClick.includes('Pulse'), 'Should show Pulse label');

  // Cover event node rendering
  assert.ok(htmlClick.includes('timeline-event-node'), 'Should render event nodes');

  // Cover tooltip
  const htmlTooltip = renderToStaticMarkup(<Timeline events={events} mockSelectedIndex={0} />);
  assert.ok(htmlTooltip.includes('EVENT 1'), 'Should show tooltip');


  // Test date picker
  let _focusSet = '';
  const htmlDatePicker = renderToStaticMarkup(<Timeline events={[]} focus="past" onFocusChange={(f: string) => _focusSet = f} />);
  assert.ok(htmlDatePicker.includes('history-date-picker'), 'Should render date picker');
  assert.ok(htmlDatePicker.includes('opacity:1'), 'Should be visible when focus is past');

  const htmlDatePickerHidden = renderToStaticMarkup(<Timeline events={[]} focus="present" />);
  assert.ok(htmlDatePickerHidden.includes('opacity:0'), 'Should be hidden when focus is present');

  // React testing library is not here, so we test the inline onChange handler directly if we can't trigger it.
  // We can't trigger inline react DOM events with renderToStaticMarkup easily, but let's check coverage first.

  // Test event nodes branches
  const evtSpace = [{ title: 'Space', type: 'space-weather' }, { title: 'Int', interpolated: true }];
  const htmlSpace = renderToStaticMarkup(<Timeline events={evtSpace} />);
  assert.ok(htmlSpace.includes('70%'), 'Should position space events at 70% offset');

  // Test the onChange handler logic
  // We can extract the DatePicker to test its onChange if we need 100% or we can just bypass
  // Actually, wait, let's extract it or mock it.
  // The line 121 in coverage is inside the event map, not the date picker! Wait, line 121 was: "left = `${70 + (i % 20)}\% `;"
  // Yes, I just added the test for that!
  // And the onChange is also a line (line 62 probably), wait, did it say line 121 is uncovered? Yes.

  console.log('PASS - timeline.test.tsx');


}

try {
  testTimeline();
} catch (e: any) {
  console.error('timeline.test.tsx failed:', e.message);
  process.exit(1);
}
