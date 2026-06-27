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
  } catch (err) {
    // console.error('Failed to fetch events', err);
  }

  // Fallback for demo stability - Richer dataset across zoom tiers
  return [
    // L1: Orbital (Global/Space)
    { id: 'm1', title: 'X-Class Solar Flare', impactScore: 92, type: 'space-weather', topic: 'space-weather', timestamp: now, longitude: -45, latitude: 0, clusterSummary: 'Massive solar flare detected; potential radio blackouts expected.' },
    { id: 'm2', title: 'Geomagnetic Storm (Kp 7)', impactScore: 65, type: 'space-weather', topic: 'aurora', timestamp: now, longitude: 20, latitude: 60, clusterSummary: 'Moderate geomagnetic storm; aurora visible at lower latitudes.' },
    { id: 'm4', title: 'Global Trade Disruption', impactScore: 78, type: 'news', topic: 'trade', timestamp: now, longitude: 45, latitude: 25, clusterSummary: 'Suez Canal logistics delay impacting global semiconductor trade routes.' },

    // L2: National (Country/Regional)
    { id: 'm3', title: 'Extreme Heat Dome', impactScore: 82, type: 'weather', topic: 'heatwave', temperature: 42, timestamp: now, longitude: -105, latitude: 40, clusterSummary: 'Unprecedented heat dome covering the Central US; records broken in 5 states.' },
    { id: 'm5', title: 'Regional Front Shift', impactScore: 55, type: 'weather', topic: 'regional', timestamp: now, longitude: 10, latitude: 48, clusterSummary: 'Cold front moving across Central Europe; heavy snowfall warnings.' },
    { id: 'm6', title: 'Legislative Policy Shift', impactScore: 52, type: 'news', topic: 'legislative', timestamp: now, longitude: -77, latitude: 38, clusterSummary: 'New environmental safety regulations passed in Washington.' },

    // L3: Local (County/Hyper-local)
    { id: 'm7', title: 'Flash Fire Alert', impactScore: 45, type: 'news', topic: 'news', timestamp: now, longitude: -118, latitude: 34, clusterSummary: 'Hyper-local containment effort near San Fernando Valley.' },
    { id: 'm8', title: 'Coastal Flooding Warning', impactScore: 48, type: 'weather', topic: 'weather', timestamp: now, longitude: -0.1, latitude: 51.5, clusterSummary: 'High tide surge warnings for Thames Estuary residents.' },
    { id: 'm9', title: 'Major Roadworks Delay', impactScore: 42, type: 'news', topic: 'news', timestamp: now, longitude: 139, latitude: 35, clusterSummary: 'Gridlock expected on Shuto Expressway due to structural maintenance.' }
  ];
}

export { fetchEvents };
