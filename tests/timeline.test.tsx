import assert from 'assert';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Timeline } from '../src/components/map/timeline.tsx';

try {
  const html = renderToStaticMarkup(<Timeline events={[{title: 'Event 1'}]} />);
  assert.ok(html.includes('aria-label="Timeline Track"'), 'Timeline container should include aria-label for accessibility');
  assert.ok(html.includes('role="region"'), 'Timeline should have a region role for accessibility');
  assert.ok(html.includes('aria-label="Event 1"'), 'Timeline marker should have aria-label for accessibility');
  assert.ok(html.includes('title="Event 1"'), 'Timeline marker should have title');

  console.log('PASS - timeline.test.tsx');
} catch (e) {
  console.error('timeline.test.tsx failed:', e.message);
  process.exit(1);
}

export {};
