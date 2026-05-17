import React, { useEffect, useRef } from 'react';

/**
 * Atlas Component
 * Initializes Mapbox GL (Mocked for now since we are in a sandbox)
 */
const Atlas = ({ zoom = 2, center = [0, 0] }) => {
  const mapContainer = useRef(null);

  useEffect(() => {
    console.log('Initializing Atlas Map at zoom:', zoom);
    // Real initialization would go here:
    // const map = new mapboxgl.Map({ container: mapContainer.current, ... });
  }, [zoom, center]);

  return (
    <div
      ref={mapContainer}
      style={{ width: '100%', height: '100vh', background: '#1a1a1a' }}
      data-testid="atlas-container"
    >
      <div style={{ color: 'white', padding: '20px' }}>Atlas Vector Engine Active</div>
    </div>
  );
};

export { Atlas };
