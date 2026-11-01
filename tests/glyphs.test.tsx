
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import assert from 'node:assert';
import { ClusterBadge, Glyph } from '../src/components/map/glyphs';

const html = renderToStaticMarkup(<ClusterBadge count={5} />);
assert.ok(html.includes('5'));
assert.ok(html.includes('rgba(255, 75, 43, 0.9)'));

const cases = [
  'space-weather', 'macro-cluster', 'weather', 'news', 'vessel',
  'cable', 'resilience', 'datacenter', 'jamming', 'satellite', 'unknown'
];

cases.forEach(type => {
  const glyphHtml = renderToStaticMarkup(<Glyph type={type} color="#ff4b2b" />);
  assert.ok(glyphHtml.includes('svg'));
});

console.log('PASS - glyphs.test.tsx');
