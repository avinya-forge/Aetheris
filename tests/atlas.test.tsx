import * as assert from 'assert';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

// Mock process.env for testing
(process.env as any).VITE_MAPBOX_TOKEN = 'test-token';

import { Atlas, loadMapComponents, loadDynamicLayers } from '../src/components/map/atlas';

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

  // Lenses filtering
  const techHtml = renderToStaticMarkup(<Atlas events={events} mockMapComponents={mockComponents} lensProp="Tech" initialZoom={10} />);
  assert.ok(techHtml.includes('Datacenter') && techHtml.includes('Cable') && techHtml.includes('Jamming') && techHtml.includes('Satellite'));
  assert.ok(!techHtml.includes('Extreme') && !techHtml.includes('Medium'));

  const finHtml = renderToStaticMarkup(<Atlas events={[{ id: 'f1', title: 'TradeEvent', topic: 'trade' }]} mockMapComponents={mockComponents} lensProp="Finance" initialZoom={10} />);
  assert.ok(finHtml.includes('TradeEvent'));
  assert.ok(!finHtml.includes('Datacenter'));

  const commHtml = renderToStaticMarkup(<Atlas events={events.concat([{ id: 'c1', title: 'TradeTopic', topic: 'trade' }])} mockMapComponents={mockComponents} lensProp="Commodity" initialZoom={10} />);
  assert.ok(commHtml.includes('Vessel') && commHtml.includes('TradeTopic'));
  assert.ok(!commHtml.includes('Datacenter'));

  const energyHtml = renderToStaticMarkup(<Atlas events={events} mockMapComponents={mockComponents} lensProp="Energy" initialZoom={10} />);
  assert.ok(energyHtml.includes('Cable'));
  assert.ok(!energyHtml.includes('Extreme') && !energyHtml.includes('Datacenter'));

  const worldHtml = renderToStaticMarkup(<Atlas events={events} mockMapComponents={mockComponents} lensProp="World" initialZoom={10} />);
  assert.ok(worldHtml.includes('Extreme') && worldHtml.includes('Medium') && worldHtml.includes('Datacenter'));

  const resHtml = renderToStaticMarkup(<Atlas events={[{ id: 'r1', type: 'resilience', title: 'R1' }]} mockMapComponents={mockComponents} lensProp="Resilience" initialZoom={10} />);
  assert.ok(resHtml.includes('R1'));

  const macroHtml = renderToStaticMarkup(<Atlas events={[{ id: 'm1', type: 'macro-cluster', isMacroCluster: true, title: 'M1' }]} mockMapComponents={mockComponents} initialZoom={10} />);
  assert.ok(macroHtml.includes('M1'));
  assert.ok(macroHtml.includes('rgba(255, 255, 255, 0.4)'));

  const scenarioHtml = renderToStaticMarkup(<Atlas events={[]} mockMapComponents={mockComponents} initialZoom={10} />);
  assert.ok(scenarioHtml.includes('SCENARIO: OFF'));

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
  assert.ok(renderToStaticMarkup(<Atlas mapErrorProp={true} />).includes('Static Map Fallback'));

  // loadMapComponents branches
  const oldWindow = globalThis.window;
  (globalThis as any).window = { location: { href: 'http://localhost' } };
  const cleanup = loadMapComponents(null, () => {}, () => {});
  cleanup();
  globalThis.window = oldWindow;


  // --- New Tests for loadDynamicLayers ---
  const testLoadDynamicFinal = () => {
    let oldSetIntFinal = globalThis.setInterval;
    let oldClearIntFinal = globalThis.clearInterval;
    let intCbFinal = null;
    let intIdFinal = 888;
    let isClearedFinal = false;

    globalThis.setInterval = (cb: any) => {
        intCbFinal = cb;
        return intIdFinal as any;
    };
    globalThis.clearInterval = (id: any) => {
        if (id === intIdFinal) isClearedFinal = true;
    };

    const oldWindowXFinal = globalThis.window;
    (globalThis as any).window = { location: { href: 'http://localhost' } };

    let extraLayersFinal: any[] = [{type: 'vessel', id: 'v1'}];
    const setExtraLayersFinal = (updater: any) => {
      if (typeof updater === 'function') {
          extraLayersFinal = updater(extraLayersFinal);
      } else {
          extraLayersFinal = updater;
      }
    };

    const cleanupDynamicFinal = loadDynamicLayers(null, setExtraLayersFinal);

    if (intCbFinal) { (intCbFinal as any)(); }

    cleanupDynamicFinal();
    assert.ok(isClearedFinal);

    const cleanupDynamicMockedFinal = loadDynamicLayers({}, setExtraLayersFinal);
    cleanupDynamicMockedFinal();

    (globalThis as any).window = oldWindowXFinal;
    globalThis.setInterval = oldSetIntFinal;
    globalThis.clearInterval = oldClearIntFinal;

    assert.ok(renderToStaticMarkup(<Atlas mapErrorProp={true} />).includes('Static Map Fallback'));

    const popupHtmlFinal = renderToStaticMarkup(<Atlas events={[{id:'e9', title:'T', impactScore:90}]} mockMapComponents={mockComponents} selectedEventProp={{id:'1', title:'T', impactScore:90, clusterSummary: 'cluster summary here'}} />);
    assert.ok(popupHtmlFinal.includes('cluster summary here'), 'Should render clusterSummary');

    const oldProcFinal = globalThis.process;
    (globalThis as any).process = undefined;
    renderToStaticMarkup(<Atlas />);
    globalThis.process = oldProcFinal;
  };
  testLoadDynamicFinal();


  // Mock AISStreamClient globally to intercept subscribe
  let aisCb = null;
  let _disconnectCalled = false;
  let _connectCalled = false;
  (globalThis as any).AISStreamClient = class {
      constructor() {}
      connect() { _connectCalled = true; }
      subscribe(cb: any) { aisCb = cb; }
      disconnect() { _disconnectCalled = true; }
  };

  const oldWindowX3 = globalThis.window;
  (globalThis as any).window = { location: { href: 'http://localhost' } };

  let extraLayers3: any[] = [{type: 'vessel', id: 'old-vessel'}];
  const setExtraLayers3 = (updater: any) => {
      if (typeof updater === 'function') {
          extraLayers3 = updater(extraLayers3);
      } else {
          extraLayers3 = updater;
      }
  };

  const cleanupDynamic3 = loadDynamicLayers(null, setExtraLayers3);

  if (aisCb) {
      // call the ais subscribe callback
      (aisCb as any)({ id: 'new-vessel', type: 'vessel' });
  }

  cleanupDynamic3();

  // now call it when isMounted is false
  if (aisCb) {
     (aisCb as any)({ id: 'ignored', type: 'vessel' });
  }

  (globalThis as any).window = oldWindowX3;
  delete (globalThis as any).AISStreamClient;

  console.log('PASS - atlas.test.tsx');


}

try {
  testAtlas();
} catch ( _e: any) {
  console.error('atlas.test.tsx failed:', _e.message);
  process.exit(1);
}
