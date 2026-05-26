import * as assert from 'assert';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Atlas } from '../src/components/map/atlas';

try {
  const html = renderToStaticMarkup(<Atlas kpIndex={5} />);
  assert.ok(html.includes('Aetheris Atlas'), 'Atlas should render title correctly');
  assert.ok(html.includes('Kp Index:'), 'Atlas should render Kp label correctly');
  assert.ok(html.includes('5'), 'Atlas should render Kp value correctly');
  assert.ok(html.includes('Loading Atlas...'), 'Atlas should display mock/loading state safely in node');
  console.log('PASS - atlas.test.tsx');
} catch (e: any) {
  console.error('atlas.test.tsx failed:', e.message);
  process.exit(1);
}
