import assert from 'assert';
import { renderToStaticMarkup } from 'react-dom/server';
import React from 'react';
import { useTemporalStore } from '../src/lib/store.js';

let updateFn: any = null;

function TestComponent() {
  const { focus, updateFocus } = useTemporalStore();
  if (!updateFn) { updateFn = updateFocus; }
  return <div id="focus">{focus}</div>;
}

try {
  const html = renderToStaticMarkup(<TestComponent />);
  assert.ok(html.includes('present'));

  // Call updateFocus to cover it
  if (updateFn) {
      updateFn('past');
  }

  console.log('PASS - store.test.js');
} catch (e: any) {
  console.error('FAIL - store.test.js:', e.message);
  process.exit(1);
}

export {};
