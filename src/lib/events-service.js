/**
 * Events Service Hook Logic
 */
function fetchEvents(filters = {}, now = Date.now()) {
  const events = [
    { id: 1, title: 'Solar Flare', impact: 'HIGH', timestamp: now, lng: -45, lat: 0 },
    { id: 2, title: 'Geomagnetic Storm', impact: 'MEDIUM', timestamp: now, lng: 20, lat: 50 },
    { id: 3, title: 'Regional Heatwave', impact: 'HIGH', timestamp: now, lng: -122, lat: 37 }
  ];

  if (filters.impact) {
    return events.filter(e => e.impact === filters.impact);
  }
  return events;
}

module.exports = { fetchEvents };
