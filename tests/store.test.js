import { test } from 'node:test';
import * as assert from 'node:assert';
import { initStore } from '../lib/store.js';

test('initStore initializes with correct default values', () => {
  const store = initStore();
  assert.deepStrictEqual(store, {
    currentFocus: 'present',
    events: [],
    horizon: null
  });
});
