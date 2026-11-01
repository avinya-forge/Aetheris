import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import assert from 'node:assert';
import { Atmosphere } from '../src/components/atmosphere';

const html1 = renderToStaticMarkup(<Atmosphere kpIndex={4} />);
assert.strictEqual(html1, '');

const html2 = renderToStaticMarkup(<Atmosphere kpIndex={5} />);
assert.ok(html2.includes('rgba(72, 61, 139, 0.2)'));
assert.ok(html2.includes('svg'));
assert.ok(html2.includes('aurora-blur'));

const html3 = renderToStaticMarkup(<Atmosphere kpIndex={7} />);
assert.ok(html3.includes('rgba(138, 43, 226, 0.3)'));

const html4 = renderToStaticMarkup(<Atmosphere kpIndex={9} />);
assert.ok(html4.includes('rgba(75, 0, 130, 0.4)'));

console.log('PASS - atmosphere.test.tsx');
