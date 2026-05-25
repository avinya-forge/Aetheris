import React, { useEffect, useRef } from 'react';

/**
 * Atlas Component
 * Initializes Mapbox GL (Mocked for now since we are in a sandbox)
 * Implements chromodynamic atmosphere based on Kp index.
 */
const Atlas = ({ zoom = 2, center = [0, 0], kpIndex = 0 }) => {
  const mapContainer = useRef(null);

  // Chromodynamic atmosphere logic
  const getAtmosphereColor = (kp) => {
    if (kp >= 8) return '#4b0082'; // Deep purple (EXTREME)
    if (kp >= 6) return '#8a2be2'; // Electric violet (HIGH)
    if (kp >= 5) return '#483d8b'; // Indigo (MODERATE)
    return '#1a1a1a'; // Dark slate (Normal)
  };

  useEffect(() => {
    console.log('Initializing Atlas Map at zoom:', zoom, 'with Kp:', kpIndex);
  }, [zoom, center, kpIndex]);

  return (
    <div aria-label="Atlas Map"
      ref={mapContainer}
      style={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: getAtmosphereColor(kpIndex),
        transition: 'background 2s ease-in-out'
      }}
      data-testid="atlas-container"
    >
      <div style={{ color: 'white', padding: '20px', textAlign: 'center', maxWidth: '100%', boxSizing: 'border-box' }}>
        Atlas Vector Engine Active (Kp: {kpIndex})
      </div>
    </div>
  );
};

export { Atlas };
