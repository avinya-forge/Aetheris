import React, { useState, useEffect, useMemo } from 'react';
import { Timeline } from './timeline';
import { GhostCard } from '../ui/ghost-card';
import { AISStreamClient } from '../../lib/ais-stream';
import { generateInitialSatellites, propagateSGP4 } from '../../lib/sgp4';

// Node-safe mock
const MapMock = ({ children, style }: any) => (
  <div data-testid="map-mock" style={style}>
    {children}
  </div>
);

const Glyph = ({ type, color }: { type: string, color: string }) => {
  const getPaths = () => {
    switch (type) {
      case 'space-weather':
      case 'aurora':
        return (
          <>
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
          </>
        );
      case 'weather':
      case 'heatwave':
      case 'regional':
        return (
          <>
            <path d="M17.5 19a3.5 3.5 0 1 1-5.83-2.67 3.5 3.5 0 1 1-5.83-2.67 3.5 3.5 0 1 1 5.83-2.67 3.5 3.5 0 1 1 5.83 2.67Z" />
            <path d="m12 13-1-1m1 1 1-1" />
          </>
        );
      case 'news':
      case 'trade':
      case 'legislative':
        return (
          <>
            <path d="M4 4h16v16H4zM8 8h8M8 12h8M8 16h5" />
          </>
        );
      case 'vessel':
        return (
          <>
            <path d="M2 12h20l-3 7H5zM12 12V3m-4 5h8" />
          </>
        );
      case 'cable':
        return (
          <>
            <path d="M4 12q4 -8 8 0 t8 0" />
          </>
        );
      case 'datacenter':
        return (
          <>
            <rect x="4" y="2" width="16" height="20" rx="2" />
            <path d="M4 8h16M4 16h16M8 5h2M8 12h2M8 19h2" />
          </>
        );
      case 'jamming':
        return (
          <>
            <circle cx="12" cy="12" r="10" />
            <path d="M8 8l8 8M16 8l-8 8" />
          </>
        );
      case 'satellite':
        return (
          <>
            <path d="M12 2v20M2 12h20M12 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
          </>
        );
      default:
        return (
          <>
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8v4l3 2" />
          </>
        );
    }
  };

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%' }}>
      {getPaths()}
    </svg>
  );
};

export const loadMapComponents = (mockMapComponents: any, setMapComponents: any, setMapError: any) => {
  let isMounted = true;
  if (typeof window !== 'undefined' && !mockMapComponents) {
    const loadCss = import('mapbox-gl/dist/mapbox-gl.css').catch(() => {});
    Promise.all([
      import('react-map-gl/mapbox'),
      loadCss
    ]).then(([mod]) => {
      if (isMounted) {
        setMapComponents({
          Map: mod.default,
          Marker: mod.Marker,
          Popup: mod.Popup,
          NavigationControl: mod.NavigationControl
        });
      }
    }).catch(err => {
      console.error('Failed to load react-map-gl', err);
      if (isMounted) setMapError(true);
    });
  }
  return () => {
    isMounted = false;
  };
};

export const loadDynamicLayers = (mockMapComponents: any, setExtraLayers: any) => {
    let isMounted = true;
    let aisClient: AISStreamClient | null = null;
    let satInterval: any = null;

    const initialSatellites = generateInitialSatellites(100);

    const generateStaticLayers = () => {
      const generated: any[] = [];
      for (let i = 0; i < 86; i++) {
        generated.push({ id: `c${i}`, type: 'cable', lng: Math.random() * 360 - 180, lat: Math.random() * 140 - 70, title: `Subsea Cable ${i}`, impactScore: Math.floor(Math.random() * 20) });
      }
      for (let i = 0; i < 313; i++) {
        generated.push({ id: `d${i}`, type: 'datacenter', lng: Math.random() * 360 - 180, lat: Math.random() * 140 - 70, title: `AI Datacenter ${i}`, impactScore: Math.floor(Math.random() * 40) });
      }
      for (let i = 0; i < 20; i++) {
        generated.push({ id: `j${i}`, type: 'jamming', lng: Math.random() * 360 - 180, lat: Math.random() * 140 - 70, title: `GPS Jamming Zone ${i}`, impactScore: Math.floor(50 + Math.random() * 50) });
      }
      return generated;
    };

    const staticLayers = generateStaticLayers();

    const updateDynamicLayers = () => {
       if (!isMounted) return;
       const propagated = propagateSGP4(initialSatellites, Date.now());
       setExtraLayers((prev: any[]) => {
          const vessels = prev.filter(p => p.type === 'vessel'); // retain vessels
          return [...staticLayers, ...propagated, ...vessels];
       });
    };

    if (typeof window !== 'undefined' && !mockMapComponents) {
      const token = (typeof process !== 'undefined' && process.env?.VITE_AIS_TOKEN) || (typeof import.meta !== 'undefined' && import.meta.env?.VITE_AIS_TOKEN) || 'DEMO';
      aisClient = new AISStreamClient(token);
      aisClient.connect();

      aisClient.subscribe((vessel: any) => {
         if (!isMounted) return;
         setExtraLayers((prev: any[]) => {
            const others = prev.filter(p => p.id !== vessel.id);
            const newVessels = [...others.filter(p => p.type === 'vessel'), vessel].slice(-100);
            return [...others.filter(p => p.type !== 'vessel'), ...newVessels];
         });
      });

      satInterval = setInterval(updateDynamicLayers, 5000);
    }

    updateDynamicLayers();

    return () => {
      isMounted = false;
      if (aisClient) aisClient.disconnect();
      if (satInterval) clearInterval(satInterval);
    };
};

const Atlas = ({ events = [], ghostCards = [], kpIndex = 0, mapErrorProp = false, mockMapComponents = null, selectedEventProp = null, initialZoom = 1.5, focus = 'present', onFocusChange = null, lensProp = 'World' }: any) => {
  const [extraLayers, setExtraLayers] = useState<any[]>([]);

  useEffect(() => {
    return loadDynamicLayers(mockMapComponents, setExtraLayers);
  }, [mockMapComponents]);

  const combinedEvents = useMemo(() => [...events, ...extraLayers], [events, extraLayers]);

  const [viewState, setViewState] = useState({
    longitude: -20,
    latitude: 30,
    zoom: initialZoom
  });

  const [MapComponents, setMapComponents] = useState<any>(mockMapComponents);
  const [mapError, setMapError] = useState(mapErrorProp);

  useEffect(() => {
    return loadMapComponents(mockMapComponents, setMapComponents, setMapError);
  }, [mockMapComponents]);

  const getAtmosphereColor = (kp: number) => {
    if (kp >= 8) return '#4b0082';
    if (kp >= 6) return '#8a2be2';
    if (kp >= 5) return '#483d8b';
    return '#1a1a1a';
  };

  const hasHeatwave = useMemo(() => {
    return combinedEvents.some((e: any) =>
      ((e.temperature && e.temperature >= 40) || (e.impactScore || 0) >= 60) &&
      (e.title?.toLowerCase().includes('heatwave') || e.topic?.toLowerCase().includes('heatwave'))
    );
  }, [combinedEvents]);

  const MAPBOX_TOKEN = (typeof process !== 'undefined' && process.env?.VITE_MAPBOX_TOKEN) ||
                       (typeof import.meta !== 'undefined' && import.meta.env?.VITE_MAPBOX_TOKEN) ||
                       '';

  const showFallback = mapError || !MAPBOX_TOKEN;

  const [selectedEvent, setSelectedEvent] = useState<any>(selectedEventProp);

  const handleMarkerClick = (event: any, e: any) => {
    if (e && e.originalEvent) e.originalEvent.stopPropagation();
    setSelectedEvent(event);
  };

  const filteredEvents = useMemo(() => {
    let zoomFiltered = combinedEvents;
    if (viewState.zoom < 4) {
      zoomFiltered = combinedEvents.filter((e: any) =>
        e.type === 'space-weather' ||
        (e.impactScore || 0) >= 60 ||
        ['conflict', 'trade', 'aurora', 'space-weather', 'vessel', 'cable', 'datacenter', 'jamming', 'satellite'].includes(e.type?.toLowerCase()) ||
        ['conflict', 'trade', 'aurora', 'space-weather'].includes(e.topic?.toLowerCase())
      );
    } else if (viewState.zoom < 8) {
      zoomFiltered = combinedEvents.filter((e: any) =>
        (e.impactScore || 0) >= 50 ||
        ['legislative', 'regional', 'weather-front', 'vessel', 'cable', 'datacenter', 'jamming', 'satellite'].includes(e.type?.toLowerCase()) ||
        ['legislative', 'regional', 'weather-front'].includes(e.topic?.toLowerCase())
      );
    }

    if (focus === 'past') zoomFiltered = zoomFiltered.filter((e: any) => !e.interpolated);
    else if (focus === 'horizon') zoomFiltered = zoomFiltered.filter((e: any) => e.interpolated);

    if (lensProp === 'Tech') {
      zoomFiltered = zoomFiltered.filter((e: any) => ['datacenter', 'cable', 'satellite', 'jamming'].includes(e.type?.toLowerCase()));
    } else if (lensProp === 'Finance') {
      zoomFiltered = zoomFiltered.filter((e: any) => ['trade'].includes(e.topic?.toLowerCase()));
    } else if (lensProp === 'Commodity') {
      zoomFiltered = zoomFiltered.filter((e: any) => ['vessel'].includes(e.type?.toLowerCase()) || ['trade'].includes(e.topic?.toLowerCase()));
    } else if (lensProp === 'Energy') {
      zoomFiltered = zoomFiltered.filter((e: any) => ['cable'].includes(e.type?.toLowerCase()));
    }

    return zoomFiltered;
  }, [combinedEvents, viewState.zoom, focus, lensProp]);

  const renderedMarkers = useMemo(() => {
    if (!MapComponents || !MapComponents.Marker) return null;
    return filteredEvents.map((event: any) => (
      <MapComponents.Marker
        key={event.id}
        longitude={event.lng || event.longitude}
        latitude={event.lat || event.latitude}
        anchor="bottom"
        onClick={(e: any) => handleMarkerClick(event, e)}
      >
        <div
          className="event-marker"
          data-impact={event.impactScore}
          style={{
            width: '24px',
            height: '24px',
            cursor: 'pointer',
            filter: `drop-shadow(0 0 ${kpIndex > 5 ? kpIndex * 2 : 4}px ${(event.impactScore || 0) >= 60 ? '#ff4b2b' : '#ffb400'})`,
            transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), filter 0.5s ease',
          }}
          onMouseEnter={(e: any) => e.currentTarget.style.transform = 'scale(1.3)'}
          onMouseLeave={(e: any) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <Glyph type={event.type || event.topic} color={(event.impactScore || 0) >= 60 ? '#ff4b2b' : '#ffb400'} />
        </div>
      </MapComponents.Marker>
    ));
  }, [filteredEvents, MapComponents, kpIndex]);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        background: getAtmosphereColor(kpIndex),
        overflow: 'hidden',
        transition: 'background 2s ease-in-out'
      }}
      data-testid="atlas-container"
    >
      {hasHeatwave && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(255, 191, 0, 0.15)',
          pointerEvents: 'none',
          zIndex: 5,
          transition: 'opacity 2s ease-in-out'
        }} />
      )}

      {showFallback ? (
        <MapMock style={{ width: '100%', height: '100%' }}>
           <div style={{ color: 'white', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontFamily: 'monospace' }}>
             Static Map Fallback (Mapbox Token Missing or Error)
           </div>
        </MapMock>
      ) : MapComponents ? (
        <MapComponents.Map
          {...viewState}
          onMove={(evt: any) => setViewState(evt.viewState)}
          onError={() => setMapError(true)}
          style={{ width: '100%', height: '100%' }}
          mapStyle="mapbox://styles/mapbox/dark-v11"
          mapboxAccessToken={MAPBOX_TOKEN}
          transitionDuration={1000}
        >
          <MapComponents.NavigationControl position="top-right" />

          {renderedMarkers}

          {selectedEvent && (
            <MapComponents.Popup
              longitude={selectedEvent.lng || selectedEvent.longitude}
              latitude={selectedEvent.lat || selectedEvent.latitude}
              anchor="top"
              onClose={() => setSelectedEvent(null)}
              closeOnClick={false}
              maxWidth="320px"
              className="kinetic-popup"
            >
              <div style={{ color: '#eee', padding: '16px', background: '#222', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <strong style={{ fontSize: '1.1rem', letterSpacing: '-0.3px' }}>{selectedEvent.title}</strong>
                  <span style={{ fontSize: '0.7rem', padding: '2px 8px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', color: '#00d2ff', border: '1px solid rgba(0,210,255,0.3)' }}>
                    {selectedEvent.impactScore}%
                  </span>
                </div>

                {selectedEvent.clusterSummary ? (
                  <div style={{ fontSize: '0.9rem', lineHeight: '1.5', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '10px', color: '#ccc' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '0.65rem', textTransform: 'uppercase', marginBottom: '6px', color: '#666', letterSpacing: '1px' }}>AI Synthesis</div>
                    {selectedEvent.clusterSummary}
                  </div>
                ) : (
                  <p style={{ fontSize: '0.9rem', margin: 0, color: '#ccc' }}>{selectedEvent.description || 'No additional details available.'}</p>
                )}

                <div style={{ marginTop: '14px', fontSize: '0.65rem', opacity: 0.4, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                   Ref: {selectedEvent.id}
                </div>
              </div>
            </MapComponents.Popup>
          )}
        </MapComponents.Map>
      ) : (
        <MapMock style={{ width: '100%', height: '100%' }}>
           <div style={{ color: 'white', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontFamily: 'monospace', fontSize: '0.8rem', letterSpacing: '2px' }}>
             INITIALIZING ATLAS...
           </div>
        </MapMock>
      )}

      {/* Responsive Overlay UI */}
      <div style={{
        position: 'absolute',
        top: 30,
        left: 30,
        color: 'white',
        pointerEvents: 'none',
        zIndex: 10,
        textShadow: '0 2px 10px rgba(0,0,0,0.8)'
      }}>
        <h1 style={{ margin: 0, fontSize: 'clamp(1.2rem, 5vw, 2rem)', letterSpacing: '-1px', fontWeight: 800 }}>AETHERIS</h1>
        <div style={{
          display: 'inline-block',
          marginTop: '12px',
          padding: '6px 16px',
          background: 'rgba(0,0,0,0.4)',
          borderRadius: '20px',
          fontSize: '0.75rem',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.1)',
          letterSpacing: '0.5px'
        }}>
          KP INDEX: <span style={{ fontWeight: 'bold', color: kpIndex >= 5 ? '#ff4b2b' : '#00d2ff' }}>{kpIndex}</span>
        </div>
      </div>

      <div style={{
        position: 'absolute',
        top: 120,
        left: 30,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        zIndex: 10,
        maxHeight: '50vh',
        overflowY: 'auto',
        paddingRight: '10px',
        scrollbarWidth: 'none'
      }}>
        {ghostCards.filter((gc: any) => !gc.isSpeculative).map((gc: any) => (
          <GhostCard key={gc.id} event={gc} />
        ))}
      </div>

      <Timeline events={filteredEvents} focus={focus} onFocusChange={onFocusChange} />

      <style>{`
        .kinetic-popup .mapboxgl-popup-content {
          background: transparent !important;
          padding: 0 !important;
          box-shadow: none !important;
        }
        .kinetic-popup .mapboxgl-popup-tip {
          border-bottom-color: #222 !important;
        }
      `}</style>
    </div>
  );
};

export { Atlas };
