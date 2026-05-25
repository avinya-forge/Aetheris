import * as assert from 'assert';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Timeline } from '../src/components/map/timeline';

try {
  const html = renderToStaticMarkup(<Timeline events={[{title: 'Solar Flare'}]} />);
  assert.ok(html.includes('timeline-container'), 'Timeline should render container');
  assert.ok(html.includes('Solar Flare'), 'Timeline should render event titles');
  console.log('PASS - timeline.test.tsx');
} catch (e: any) {
  console.error('timeline.test.tsx failed:', e.message);
  process.exit(1);
}
