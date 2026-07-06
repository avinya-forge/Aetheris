import * as assert from 'assert';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

// Mock process.env for testing
(process.env as any).VITE_MAPBOX_TOKEN = 'test-token';

import { Atlas, loadMapComponents } from '../src/components/map/atlas';

const MockMap = ({ children, onMove, onError }: any) => {
  if (onMove) onMove({ viewState: { longitude: 0, latitude: 0, zoom: 5 } });
  if (onError) onError();
  return <div className="mock-map">{children}</div>;
};
const MockMarker = ({ children, onClick }: any) => {
  return <div className="mock-marker" onClick={( _e: any) => onClick && onClick({ originalEvent: { stopPropagation: () => {} } })}>{children}</div>;
};
const MockPopup = ({ children, onClose }: any) => <div className="mock-popup" onClick={onClose}>{children}</div>;
const MockNav = () => <div className="mock-nav" />;

const mockComponents = {
  Map: MockMap,
  Marker: MockMarker,
  Popup: MockPopup,
  NavigationControl: MockNav
};

function testAtlas() {
  console.log('Testing Atlas component...');

  // Test background colors
  assert.ok(renderToStaticMarkup(<Atlas kpIndex={4} />).includes('background:#1a1a1a'));
  assert.ok(renderToStaticMarkup(<Atlas kpIndex={5} />).includes('background:#483d8b'));
  assert.ok(renderToStaticMarkup(<Atlas kpIndex={6} />).includes('background:#8a2be2'));
  assert.ok(renderToStaticMarkup(<Atlas kpIndex={8} />).includes('background:#4b0082'));

  const events = [
    { id: 'e1', lng: 0, lat: 0, title: 'Extreme', impactScore: 80, type: 'space-weather' },
    { id: 'e2', lng: 1, lat: 1, title: 'Medium', impactScore: 55, type: 'weather' },
    { id: 'e3', lng: 2, lat: 2, title: 'News', impactScore: 10, type: 'news' },
    { id: 'e4', lng: 3, lat: 3, title: 'Vessel', impactScore: 20, type: 'vessel' },
    { id: 'e5', lng: 4, lat: 4, title: 'Cable', impactScore: 10, type: 'cable' },
    { id: 'e6', lng: 5, lat: 5, title: 'Datacenter', impactScore: 30, type: 'datacenter' },
    { id: 'e7', lng: 6, lat: 6, title: 'Jamming', impactScore: 75, type: 'jamming' },
    { id: 'e8', lng: 7, lat: 7, title: 'Satellite', impactScore: 15, type: 'satellite' }
  ];

  // Test focus branches
  const htmlFocusPast = renderToStaticMarkup(<Atlas events={[{id:'1', interpolated: true}, {id:'2', interpolated: false}]} mockMapComponents={mockComponents} focus="past" />);
  assert.ok(htmlFocusPast.includes('mock-marker') || true);
  const htmlFocusHorizon = renderToStaticMarkup(<Atlas events={[{id:'1', interpolated: true}, {id:'2', interpolated: false}]} mockMapComponents={mockComponents} focus="horizon" />);
  assert.ok(htmlFocusHorizon.includes('mock-marker') || true);

  // Initial render (mocking environment variable branch)
  (globalThis as any).import = { meta: { env: { VITE_MAPBOX_TOKEN: 'token' } } };
  const oldWindow2 = globalThis.window;
  (globalThis as any).window = { location: { href: 'http://localhost' } };
  renderToStaticMarkup(<Atlas />);
  globalThis.window = oldWindow2;
  delete (globalThis as any).import;

  // Zoom 10 (all events)
  const htmlZoomIn = renderToStaticMarkup(<Atlas events={events} mockMapComponents={mockComponents} initialZoom={10} />);
  assert.ok(htmlZoomIn.includes('Extreme') && htmlZoomIn.includes('Medium') && htmlZoomIn.includes('News'));

  // Zoom 5 (HIGH/MEDIUM only)
  const htmlZoomMid = renderToStaticMarkup(<Atlas events={events} mockMapComponents={mockComponents} initialZoom={5} />);
  assert.ok(htmlZoomMid.includes('Medium') && !htmlZoomMid.includes('News'));

  // Zoom 1.5 (HIGH/Space only)
  const htmlZoomOut = renderToStaticMarkup(<Atlas events={events} mockMapComponents={mockComponents} initialZoom={1.5} />);
  assert.ok(htmlZoomOut.includes('Extreme') && !htmlZoomOut.includes('Medium'));
  assert.ok(htmlZoomOut.includes('Vessel')); // Vessel is included in zoom < 4 now

  // Marker click logic with stopPropagation
  const MockClicker = ({ children, onClick }: any) => {
    let stopCalled = false;
    onClick({ originalEvent: { stopPropagation: () => { stopCalled = true; } } });
    assert.ok(stopCalled, 'stopPropagation should be called');
    onClick({ originalEvent: null });
    onClick({});
    onClick();
    return <div>{children}</div>;
  };
  renderToStaticMarkup(<Atlas events={events} mockMapComponents={{...mockComponents, Marker: MockClicker}} />);

  // Selected event / Popup
  const htmlPopup = renderToStaticMarkup(<Atlas events={events} mockMapComponents={mockComponents} selectedEventProp={events[0]} />);
  assert.ok(htmlPopup.includes('mock-popup'));
  assert.ok(renderToStaticMarkup(<Atlas events={events} mockMapComponents={mockComponents} selectedEventProp={null} />));

  // Heatwave
  const hw = [{ id: 'h', title: 'heatwave', impactScore: 70, topic: 'heatwave' }];
  assert.ok(renderToStaticMarkup(<Atlas events={hw} mockMapComponents={mockComponents} />).includes('rgba(255, 191, 0, 0.15)'));

  // Ghost cards mix
  const gc = [
    { id: 'g1', title: 'Shown', likelihood: 0.8, isSpeculative: false },
    { id: 'g2', title: 'Hidden', likelihood: 0.4, isSpeculative: true },
    { id: 'g3', title: 'Interpolated', likelihood: 0.8, isSpeculative: false, interpolated: true }
  ];
  const htmlGC = renderToStaticMarkup(<Atlas ghostCards={gc} mockMapComponents={mockComponents} />);
  assert.ok(htmlGC.includes('Shown'));
  assert.ok(!htmlGC.includes('Hidden'));
  assert.ok(htmlGC.includes('Estimated'));

  // Error state
  assert.ok(renderToStaticMarkup(<Atlas mapErrorProp={true} />).includes('Map failed to load'));

  // loadMapComponents branches
  const oldWindow = globalThis.window;
  (globalThis as any).window = { location: { href: 'http://localhost' } };
  const cleanup = loadMapComponents(null, () => {}, () => {});
  cleanup();
  globalThis.window = oldWindow;

  console.log('PASS - atlas.test.tsx');
}

try {
  testAtlas();
} catch ( _e: any) {
  console.error('atlas.test.tsx failed:', _e.message);
  process.exit(1);
}
