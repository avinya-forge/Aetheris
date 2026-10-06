import { test } from 'node:test';
import * as assert from 'node:assert';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { DeveloperBio } from '../src/components/ui/developer-bio.jsx';

test('DeveloperBio component renders without crashing', () => {
  const html = renderToStaticMarkup(<DeveloperBio />);
  assert.ok(html.includes('Developer Presence'));
  assert.ok(html.includes('LinkedIn Profile'));
  assert.ok(html.includes('GitHub Repository'));
});
