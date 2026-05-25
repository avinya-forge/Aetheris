import * as assert from 'assert';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Atlas } from '../src/components/map/atlas';

try {
  const html = renderToStaticMarkup(<Atlas kpIndex={5} />);
  assert.ok(html.includes('Atlas Vector Engine Active', 'atlas.test.tsx: ok failure'), 'Atlas should render text correctly');
  console.log('PASS - atlas.test.tsx');
} catch (e: any) {
  console.error('atlas.test.tsx failed:', e.message);
  process.exit(1);
}
