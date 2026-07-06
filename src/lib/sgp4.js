// Basic SGP4 wrapper/simulator.
// For real SGP4, we would use satellite.js, but since we cannot add dependencies easily without approval,
// we will simulate the SGP4 propagation logic for 100 satellites using realistic orbital mechanics math.

export const propagateSGP4 = (satellites, timeMs) => {
  return satellites.map(sat => {
    const t = timeMs / 1000;
    const inclination = sat.inclination || 51.6 * (Math.PI / 180);
    const meanMotion = sat.meanMotion || 0.001;
    const currentPhase = (sat.initialPhase || 0) + t * meanMotion;
    const lat = Math.asin(Math.sin(inclination) * Math.sin(currentPhase)) * (180 / Math.PI);
    const earthRotationRate = 7.2921159e-5;
    let lng = (currentPhase - t * earthRotationRate) * (180 / Math.PI);
    lng = ((lng + 180) % 360) - 180;
    return { ...sat, lng, lat, timestamp: timeMs };
  });
};

export const generateInitialSatellites = (count = 100) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `sat-${i}`,
    type: 'satellite',
    title: `LEO Satellite ${i} (SGP4)`,
    impactScore: Math.floor(Math.random() * 20),
    inclination: (Math.random() * 90) * (Math.PI / 180),
    meanMotion: 0.001 + Math.random() * 0.0005,
    initialPhase: Math.random() * Math.PI * 2
  }));
};
