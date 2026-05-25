import * as assert from 'assert';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { GhostCard } from '../src/components/ui/ghost-card';

try {
  const html = renderToStaticMarkup(<GhostCard event={{title: 'Warning', likelihood: 0.8}} />);
  assert.ok(html.includes('Warning'), 'GhostCard should render title');
  assert.ok(html.includes('80%'), 'GhostCard should render likelihood properly');
  console.log('PASS - ghost-card.test.tsx');
} catch (e: any) {
  console.error('ghost-card.test.tsx failed:', e.message);
  process.exit(1);
}
