import assert from 'assert';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Atlas } from '../src/components/map/atlas.tsx';

try {
  const html = renderToStaticMarkup(<Atlas kpIndex={5} />);
  assert.ok(html.includes('Atlas Vector Engine Active'), 'Atlas should render text correctly');
  console.log('PASS - atlas.test.tsx');
} catch (e: any) {
  console.error('atlas.test.tsx failed:', e.message);
  process.exit(1);
}
