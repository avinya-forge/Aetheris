import * as assert from 'assert';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { GhostCard } from '../src/components/ui/ghost-card';

try {
  const html = renderToStaticMarkup(<GhostCard event={{title: 'Warning', likelihood: 0.8}} />);
  assert.ok(html.includes('Warning'), 'GhostCard should render title');
  assert.ok(html.includes('80%'), 'GhostCard should render likelihood properly');

  // Test missing event prop
  const emptyHtml = renderToStaticMarkup(<GhostCard />);
  assert.ok(emptyHtml.includes('Unknown Event'), 'GhostCard should render default title');
  assert.ok(emptyHtml.includes('50%'), 'GhostCard should render default likelihood properly');

  // Test interpolated badge
  const interpolatedHtml = renderToStaticMarkup(<GhostCard event={{title: 'Old Event', likelihood: 0.2, interpolated: true}} />);
  assert.ok(interpolatedHtml.includes('Estimated'), 'GhostCard should render Estimated badge for interpolated events');

  console.log('PASS - ghost-card.test.tsx');
} catch (e: any) {
  console.error('ghost-card.test.tsx failed:', e.message);
  process.exit(1);
}
