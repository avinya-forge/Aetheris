/**
 * Events Service Hook Logic
 */
function fetchEvents(filters = {}) {
  // Mock fetching logic
  const events = [
    { id: 1, title: 'Solar Flare', impact: 'HIGH', timestamp: Date.now() },
    { id: 2, title: 'Geomagnetic Storm', impact: 'MEDIUM', timestamp: Date.now() }
  ];

  if (filters.impact) {
    return events.filter(e => e.impact === filters.impact);
  }
  return events;
}

module.exports = { fetchEvents };
