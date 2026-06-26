import React, { useState, useEffect, useMemo } from 'react';
import { Timeline } from './timeline';
import { GhostCard } from '../ui/ghost-card';

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
        return (
          <>
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
          </>
        );
      case 'weather':
        return (
          <>
            <path d="M17.5 19a3.5 3.5 0 1 1-5.83-2.67 3.5 3.5 0 1 1-5.83-2.67 3.5 3.5 0 1 1 5.83-2.67 3.5 3.5 0 1 1 5.83 2.67Z" />
            <path d="m12 13-1-1m1 1 1-1" />
          </>
        );
      case 'news':
        return (
          <>
            <path d="M4 4h16v16H4zM8 8h8M8 12h8M8 16h5" />
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

const Atlas = ({ events = [], ghostCards = [], kpIndex = 0, mapErrorProp = false, mockMapComponents = null, selectedEventProp = null, initialZoom = 1.5, focus = 'present', onFocusChange = null }: any) => {
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
    return events.some((e: any) =>
      (e.impactScore || 0) >= 60 &&
      (e.title?.toLowerCase().includes('heatwave') || e.topic?.toLowerCase().includes('heatwave'))
    );
  }, [events]);

  const MAPBOX_TOKEN = (typeof process !== 'undefined' && process.env?.VITE_MAPBOX_TOKEN) ||
                       (typeof import.meta !== 'undefined' && import.meta.env?.VITE_MAPBOX_TOKEN) ||
                       '';

  const [selectedEvent, setSelectedEvent] = useState<any>(selectedEventProp);

  const handleMarkerClick = (event: any, e: any) => {
    if (e && e.originalEvent) e.originalEvent.stopPropagation();
    setSelectedEvent(event);
  };

  const filteredEvents = useMemo(() => {
    let zoomFiltered = events;
    if (viewState.zoom < 4) {
      zoomFiltered = events.filter((e: any) => (e.impactScore || 0) >= 60 || e.type === 'space-weather');
    } else if (viewState.zoom < 8) {
      zoomFiltered = events.filter((e: any) => (e.impactScore || 0) >= 50);
    }

    if (focus === 'past') return zoomFiltered.filter((e: any) => !e.interpolated);
    if (focus === 'horizon') return zoomFiltered.filter((e: any) => e.interpolated);
    return zoomFiltered;
  }, [events, viewState.zoom, focus]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', background: getAtmosphereColor(kpIndex), overflow: 'hidden' }} data-testid="atlas-container">
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
          transition: 'opacity 1s ease'
        }} />
      )}

      {mapError ? (
        <MapMock style={{ width: '100%', height: '100%' }}>
           <div style={{ color: 'red', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
             Map failed to load.
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
        >
          <MapComponents.NavigationControl position="top-right" />

          {filteredEvents.map((event: any) => (
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
                  transition: 'filter 0.5s ease'
                }}
              >
                <Glyph type={event.type || event.topic} color={(event.impactScore || 0) >= 60 ? '#ff4b2b' : '#ffb400'} />
              </div>
            </MapComponents.Marker>
          ))}

          {selectedEvent && (
            <MapComponents.Popup
              longitude={selectedEvent.lng || selectedEvent.longitude}
              latitude={selectedEvent.lat || selectedEvent.latitude}
              anchor="top"
              onClose={() => setSelectedEvent(null)}
              closeOnClick={false}
              maxWidth="300px"
            >
              <div style={{ color: '#333', padding: '12px', background: 'white', borderRadius: '8px' }} className="popup-content">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <strong style={{ fontSize: '1rem' }}>{selectedEvent.title}</strong>
                  <span style={{ fontSize: '0.7rem', padding: '2px 6px', background: '#eee', borderRadius: '4px' }}>
                    Score: {selectedEvent.impactScore}
                  </span>
                </div>

                {selectedEvent.clusterSummary ? (
                  <div style={{ fontSize: '0.85rem', lineHeight: '1.4', borderTop: '1px solid #eee', paddingTop: '8px', color: '#666' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '0.7rem', textTransform: 'uppercase', marginBottom: '4px', color: '#999' }}>AI Synthesis</div>
                    {selectedEvent.clusterSummary}
                  </div>
                ) : (
                  <p style={{ fontSize: '0.85rem', margin: 0, color: '#666' }}>{selectedEvent.description || 'No additional details available.'}</p>
                )}

                <div style={{ marginTop: '12px', fontSize: '0.7rem', opacity: 0.5 }}>
                   ID: {selectedEvent.id}
                </div>
              </div>
            </MapComponents.Popup>
          )}
        </MapComponents.Map>
      ) : (
        <MapMock style={{ width: '100%', height: '100%' }}>
           <div style={{ color: 'white', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
             Loading Atlas...
           </div>
        </MapMock>
      )}

      {/* Responsive Overlay UI */}
      <div style={{
        position: 'absolute',
        top: 20,
        left: 20,
        color: 'white',
        pointerEvents: 'none',
        zIndex: 10,
        textShadow: '0 2px 4px rgba(0,0,0,0.5)'
      }}>
        <h1 style={{ margin: 0, fontSize: 'clamp(1rem, 5vw, 1.8rem)' }}>Aetheris Atlas</h1>
        <div style={{
          display: 'inline-block',
          marginTop: '10px',
          padding: '4px 12px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '20px',
          fontSize: '0.8rem',
          backdropFilter: 'blur(5px)'
        }}>
          Kp Index: <span style={{ fontWeight: 'bold', color: kpIndex >= 5 ? '#ffb400' : '#00d2ff' }}>{kpIndex}</span>
        </div>
      </div>

      <div style={{
        position: 'absolute',
        top: 100,
        left: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        zIndex: 10,
        maxHeight: '40vh',
        overflowY: 'auto',
        paddingRight: '10px'
      }}>
        {ghostCards.filter((gc: any) => !gc.isSpeculative).map((gc: any) => (
          <GhostCard key={gc.id} event={gc} />
        ))}
      </div>

      <Timeline events={filteredEvents} focus={focus} onFocusChange={onFocusChange} />
    </div>
  );
};

export { Atlas };
