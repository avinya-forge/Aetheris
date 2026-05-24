import assert from 'assert';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { GhostCard } from '../src/components/ui/ghost-card.tsx';

try {
  const html = renderToStaticMarkup(<GhostCard event={{title: 'Event 1', likelihood: 0.8}} />);
  assert.ok(html.includes('aria-label="Ghost Card for Event 1"'), 'GhostCard should include aria-label for accessibility');
  assert.ok(html.includes('role="article"'), 'GhostCard should have article role for accessibility');
  assert.ok(html.includes('Event 1'), 'GhostCard should render title');
  assert.ok(html.includes('80%'), 'GhostCard should render likelihood');

  console.log('PASS - ghost-card.test.tsx');
} catch (e) {
  console.error('ghost-card.test.tsx failed:', e.message);
  process.exit(1);
}

export {};
