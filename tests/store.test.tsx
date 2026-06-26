import assert from 'assert';
import { renderToStaticMarkup } from 'react-dom/server';
import React from 'react';
import { useTemporalStore } from '../src/lib/store.js';

function TestComponent() {
  const { focus } = useTemporalStore();
  return <div id="focus">{focus}</div>;
}

try {
  const html = renderToStaticMarkup(<TestComponent />);
  assert.ok(html.includes('present'));
  console.log('PASS - store.test.js');
} catch (e: any) {
  console.error('FAIL - store.test.js:', e.message);
  process.exit(1);
}

export {};
