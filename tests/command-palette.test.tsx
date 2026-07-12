import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import assert from 'assert';
import { CommandPalette, handleCommandPaletteKeyDown, handleCommandSelect, loadCommandPaletteHooks } from '../src/components/ui/command-palette';

try {
  // Test 1: Initial state (closed)
  const initialHtml = renderToStaticMarkup(<CommandPalette />);
  assert.strictEqual(initialHtml, '', 'Command Palette should initially be closed (return null)');

  // Test 2: Test the keyboard handler separately to get 100% branch coverage on it
  let testIsOpen = false;
  const mockSetIsOpen = (updater: any) => {
    if (typeof updater === 'function') {
      testIsOpen = updater(testIsOpen);
    } else {
      testIsOpen = updater;
    }
  };

  // Test cmd+k
  handleCommandPaletteKeyDown({ metaKey: true, ctrlKey: false, key: 'k', preventDefault: () => {} }, mockSetIsOpen);
  assert.strictEqual(testIsOpen, true, 'Cmd+K should open the palette');

  // Test ctrl+k
  testIsOpen = false;
  handleCommandPaletteKeyDown({ metaKey: false, ctrlKey: true, key: 'k', preventDefault: () => {} }, mockSetIsOpen);
  assert.strictEqual(testIsOpen, true, 'Ctrl+K should open the palette');

  // Test Esc
  handleCommandPaletteKeyDown({ metaKey: false, ctrlKey: false, key: 'Escape', preventDefault: () => {} }, mockSetIsOpen);
  assert.strictEqual(testIsOpen, false, 'Escape should close the palette');

  const originalUseState = React.useState;

  // Create a mock that forces the first state (isOpen) to be true
  let stateIndex = 0;
  (React as any).useState = function(initial: any) {
    if (stateIndex === 0) { // isOpen
      stateIndex++;
      return [true, () => {}];
    }
    if (stateIndex === 1) { // query
      stateIndex++;
      return ['', () => {}];
    }
    return originalUseState(initial);
  };

  const openHtml = renderToStaticMarkup(<CommandPalette />);
  assert.ok(openHtml.includes('command-palette-overlay'), 'Should render the overlay when open');
  assert.ok(openHtml.includes('154 total commands'), 'Should display the total command count');

  // Test with query
  stateIndex = 0;
  (React as any).useState = function(initial: any) {
    if (stateIndex === 0) { // isOpen
      stateIndex++;
      return [true, () => {}];
    }
    if (stateIndex === 1) { // query
      stateIndex++;
      return ['Technology & Subsea', () => {}];
    }
    return originalUseState(initial);
  };

  const queriedHtml = renderToStaticMarkup(<CommandPalette />);
  assert.ok(queriedHtml.includes('Lens: Technology &amp; Subsea'), 'Should render filtered results');
  assert.ok(!queriedHtml.includes('Lens: Global Energy'), 'Should not render unfiltered results');

  // Test empty state
  stateIndex = 0;
  (React as any).useState = function(initial: any) {
    if (stateIndex === 0) { // isOpen
      stateIndex++;
      return [true, () => {}];
    }
    if (stateIndex === 1) { // query
      stateIndex++;
      return ['xxxxx non existent xxxxx', () => {}];
    }
    return originalUseState(initial);
  };

  const emptyHtml = renderToStaticMarkup(<CommandPalette />);
  assert.ok(emptyHtml.includes('No commands found.'), 'Should display no commands message');

  // Restore useState
  (React as any).useState = originalUseState;


  // Test handleCommandSelect
  let testQuery = 'test';
  let testOpen = true;
  handleCommandSelect({label: 'Test Cmd'}, (val: any) => testOpen = val, (val: any) => testQuery = val);
  assert.strictEqual(testOpen, false);
  assert.strictEqual(testQuery, '');



  // Test loadCommandPaletteHooks
  let added = false;
  let removed = false;

  const oldWindowCmd = globalThis.window;
  (globalThis as any).window = {
      addEventListener: (_evt: any, _cb: any) => added = true,
      removeEventListener: (_evt: any, _cb: any) => removed = true
  };

  const cleanupHooks = loadCommandPaletteHooks(() => {});
  assert.ok(added);
  cleanupHooks();
  assert.ok(removed);

  (globalThis as any).window = oldWindowCmd;



  // Cover the useEffect by overriding it
  let useEffCb = null;
  const originalUseEffect2 = React.useEffect;
  (React as any).useEffect = (cb: any) => {
      useEffCb = cb;
  };

  const oldWindowCmd2 = globalThis.window;
  (globalThis as any).window = {
      addEventListener: () => {},
      removeEventListener: () => {}
  };

  renderToStaticMarkup(<CommandPalette />);

  if (useEffCb) {
      const cleanup = (useEffCb as any)();
      if (cleanup) cleanup();
  }

  (React as any).useEffect = originalUseEffect2;
  (globalThis as any).window = oldWindowCmd2;

  console.log('PASS - command-palette.test.tsx');



  process.exit(0);

} catch (err) {
  console.error('FAIL - command-palette.test.tsx:', err.message);
  process.exit(1);
}
