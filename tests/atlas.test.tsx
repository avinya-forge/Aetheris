import * as assert from 'assert';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

// Mock process.env for testing
(process.env as any).VITE_MAPBOX_TOKEN = 'test-token';

import { Atlas, loadMapComponents } from '../src/components/map/atlas';

const MockMap = ({ children, onMove, onError }: any) => {
  // Trigger callbacks to exercise lines
  if (onMove) onMove({ viewState: { longitude: 0, latitude: 0, zoom: 2 } });
  if (onError) onError();
  return <div className="mock-map">{children}</div>;
};
const MockMarker = ({ children, onClick }: any) => {
  return <div className="mock-marker" onClick={() => onClick({ originalEvent: { stopPropagation: () => {} } })}>{children}</div>;
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
  assert.ok(renderToStaticMarkup(<Atlas kpIndex={4} />).includes('background:#1a1a1a'), 'Kp 4 background');
  assert.ok(renderToStaticMarkup(<Atlas kpIndex={5} />).includes('background:#483d8b'), 'Kp 5 background');
  assert.ok(renderToStaticMarkup(<Atlas kpIndex={6} />).includes('background:#8a2be2'), 'Kp 6 background');
  assert.ok(renderToStaticMarkup(<Atlas kpIndex={8} />).includes('background:#4b0082'), 'Kp 8 background');

  // Test events with mock components
  const events = [
    { id: 'e1', lng: 0, lat: 0, title: 'Extreme Event', impact: 'HIGH', type: 'space-weather' },
    { id: 'e2', lng: 1, lat: 1, title: 'Medium Event', impact: 'MEDIUM', type: 'weather' }
  ];

  // At zoom 1.5 (default), Medium weather event should be filtered out
  const htmlZoomOut = renderToStaticMarkup(
    <Atlas events={events} mockMapComponents={mockComponents} />
  );
  assert.ok(htmlZoomOut.includes('Extreme Event'), 'HIGH impact should show at zoom 1.5');
  assert.ok(!htmlZoomOut.includes('Medium Event'), 'MEDIUM impact weather should NOT show at zoom 1.5');
  assert.ok(htmlZoomOut.includes('stroke="#ff4b2b"'), 'High impact marker should be red');

  // Test heatwave overlay
  const heatwaveEvents = [
    { id: 'h1', lng: 0, lat: 0, title: 'Extreme Heatwave', impact: 'HIGH', type: 'weather', topic: 'heatwave' }
  ];
  const htmlHeatwave = renderToStaticMarkup(<Atlas events={heatwaveEvents} mockMapComponents={mockComponents} />);
  assert.ok(htmlHeatwave.includes('background:rgba(255, 191, 0, 0.15)'), 'Should render heatwave amber overlay');

  // Test ghost cards
  const htmlGhostCards = renderToStaticMarkup(
    <Atlas
      events={events}
      ghostCards={[{ id: 'g1', title: 'Ghost Card Event', impact: 'LOW', likelihood: 0.8, isSpeculative: false }]}
      mockMapComponents={mockComponents}
    />
  );
  assert.ok(htmlGhostCards.includes('Ghost Card Event'), 'Should render ghost card content');
  assert.ok(htmlGhostCards.includes('80%'), 'Should show percentage');

  // Test error state
  assert.ok(renderToStaticMarkup(<Atlas mapErrorProp={true} />).includes('Map failed to load'), 'Error message');

  // Test loading state
  assert.ok(renderToStaticMarkup(<Atlas />).includes('Loading Atlas...'), 'Loading message');

  console.log('PASS - atlas.test.tsx');
}

try {
  testAtlas();
} catch (e: any) {
  console.error('atlas.test.tsx failed:', e.message);
  process.exit(1);
}
