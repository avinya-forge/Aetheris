import React, { useState, useEffect, useMemo } from 'react';
import { Timeline } from './timeline';
import { GhostCard } from '../ui/ghost-card';

// Node-safe mock
const MapMock = ({ children, style }) => (
  <div data-testid="map-mock" style={style}>
    {children}
  </div>
);

const Atlas = ({ events = [], ghostCards = [], kpIndex = 0 }) => {
  const [viewState, setViewState] = useState({
    longitude: -20,
    latitude: 30,
    zoom: 1.5
  });

  const [MapComponents, setMapComponents] = useState(null);
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    if (typeof window !== 'undefined') {
      Promise.all([
        import('react-map-gl/mapbox'),
        import('mapbox-gl/dist/mapbox-gl.css')
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
  }, []);

  const getAtmosphereColor = (kp) => {
    if (kp >= 8) return '#4b0082';
    if (kp >= 6) return '#8a2be2';
    if (kp >= 5) return '#483d8b';
    return '#1a1a1a';
  };

  const MAPBOX_TOKEN = 'pk.eyJ1Ijoiam1hcnRpbmV6LWp1bGVzIiwiYSI6ImNtNzV0em1zazBjNG4ycW9rbTNyYWh6NHoifQ.X90_n8_3_5_2_1_0_0_0';

  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', background: getAtmosphereColor(kpIndex), overflow: 'hidden' }} data-testid="atlas-container">
      {mapError ? (
        <MapMock style={{ width: '100%', height: '100%' }}>
           <div style={{ color: 'red', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
             Map failed to load.
           </div>
        </MapMock>
      ) : MapComponents ? (
        <MapComponents.Map
          {...viewState}
          onMove={evt => setViewState(evt.viewState)}
          onError={() => setMapError(true)}
          style={{ width: '100%', height: '100%' }}
          mapStyle="mapbox://styles/mapbox/dark-v11"
          mapboxAccessToken={MAPBOX_TOKEN}
        >
          <MapComponents.NavigationControl position="top-right" />

          {events.map(event => (
            <MapComponents.Marker
              key={event.id}
              longitude={event.lng}
              latitude={event.lat}
              anchor="bottom"
              onClick={e => {
                e.originalEvent.stopPropagation();
                setSelectedEvent(event);
              }}
            >
              <div style={{
                width: '20px',
                height: '20px',
                background: event.impact === 'HIGH' ? '#ff4b2b' : '#ffb400',
                borderRadius: '50%',
                border: '2px solid white',
                cursor: 'pointer',
                boxShadow: '0 0 10px rgba(0,0,0,0.5)'
              }} />
            </MapComponents.Marker>
          ))}

          {selectedEvent && (
            <MapComponents.Popup
              longitude={selectedEvent.lng}
              latitude={selectedEvent.lat}
              anchor="top"
              onClose={() => setSelectedEvent(null)}
              closeOnClick={false}
            >
              <div style={{ color: '#333', padding: '5px' }}>
                <strong style={{ display: 'block' }}>{selectedEvent.title}</strong>
                <span>Impact: {selectedEvent.impact}</span>
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
        {ghostCards.map(gc => (
          <GhostCard key={gc.id} event={gc} />
        ))}
      </div>

      <Timeline events={events} />
    </div>
  );
};

export { Atlas };
