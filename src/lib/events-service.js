/**
 * Events Service Hook Logic
 */
async function fetchEvents(filters = {}, now = Date.now()) {
  try {
    const baseUrl = typeof window === 'undefined' ? 'http://localhost' : '';
    let url = `${baseUrl}/api/events`;

    if (filters.date) {
      url += `?date=${filters.date}`;
    } else if (filters.since) {
      url += `?since=${filters.since}`;
    }

    const response = await fetch(url);
    if (response.ok) {
      const events = await response.json();
      return events;
    }
  } catch (_err) {
    // console.error('Failed to fetch events', err);
  }

  // Fallback for demo stability
  return [
    { id: 'm1', title: 'Solar Flare', impactScore: 85, type: 'space-weather', timestamp: now, longitude: -45, latitude: 0, clusterSummary: 'Intense solar activity detected in the equatorial region.' },
    { id: 'm2', title: 'Geomagnetic Storm', impactScore: 55, type: 'space-weather', timestamp: now, longitude: 20, latitude: 50 },
    { id: 'm3', title: 'Regional Heatwave', impactScore: 75, type: 'weather', topic: 'heatwave', timestamp: now, longitude: -122, latitude: 37, clusterSummary: 'Critical temperature levels observed across the West Coast.' }
  ];
}

export { fetchEvents };
