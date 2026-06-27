/**
 * Ghost Card Service Hook Logic
 */
async function getGhostCards() {
  try {
    const baseUrl = typeof window === 'undefined' ? 'http://localhost' : '';
    const response = await fetch(baseUrl + '/api/ghost-cards');
    if (response.ok) {
      return await response.json();
    }
  } catch (_err) {
    // console.error(err);
  }

  return [
    { id: 'g1', title: 'Solar Cycle Peak (Horizon)', likelihood: 0.95, isSpeculative: false },
    { id: 'g2', title: 'Subarctic Aurora Probability', likelihood: 0.72, isSpeculative: false },
    { id: 'g3', title: 'Pacific Cyclone Formation', likelihood: 0.65, isSpeculative: false },
    { id: 'g4', title: 'Trade Route Rerouting (Est.)', likelihood: 0.88, isSpeculative: false, interpolated: true }
  ];
}

export { getGhostCards };
