import assert from 'assert';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Atlas } from '../src/components/map/atlas.tsx';

try {
  const html = renderToStaticMarkup(<Atlas kpIndex={5} />);
  assert.ok(html.includes('Atlas Vector Engine Active (Kp: 5)'), 'Atlas should render text content with prop');
  assert.ok(html.includes('aria-label="Atlas Map"'), 'Atlas should have aria-label for accessibility');
  assert.ok(html.includes('id="atlas-map-container"'), 'Atlas should have id for container');

  console.log('PASS - atlas.test.tsx');
} catch (e) {
  console.error('atlas.test.tsx failed:', e.message);
  process.exit(1);
}

export {};
