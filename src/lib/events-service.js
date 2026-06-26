/**
 * Events Service Hook Logic
 */
async function fetchEvents(filters = {}, now = Date.now()) {
  try {
    // In Node/Tests, we need absolute URLs or mock fetch
    const baseUrl = typeof window === 'undefined' ? 'http://localhost' : '';
    const response = await fetch(baseUrl + '/api/events');
    if (response.ok) {
      const events = await response.json();
      if (filters.impact) {
        return events.filter(e => e.impact === filters.impact);
      }
      return events;
    }
  } catch (err) {
    // console.error('Failed to fetch events from API, falling back to mock data', err);
  }

  // Fallback / Mock data for development
  const events = [
    { id: 1, title: 'Solar Flare', impact: 'HIGH', type: 'space-weather', timestamp: now, lng: -45, lat: 0 },
    { id: 2, title: 'Geomagnetic Storm', impact: 'MEDIUM', type: 'space-weather', timestamp: now, lng: 20, lat: 50 },
    { id: 3, title: 'Regional Heatwave', impact: 'HIGH', type: 'weather', topic: 'heatwave', timestamp: now, lng: -122, lat: 37 }
  ];

  if (filters.impact) {
    return events.filter(e => e.impact === filters.impact);
  }
  return events;
}

export { fetchEvents };
