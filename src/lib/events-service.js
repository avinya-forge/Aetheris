/**
 * Events Service Hook Logic
 */
function fetchEvents(filters = {}, now = Date.now()) {
  // Mock fetching logic
  const events = [
    { id: 1, title: 'Solar Flare', impact: 'HIGH', timestamp: now },
    { id: 2, title: 'Geomagnetic Storm', impact: 'MEDIUM', timestamp: now }
  ];

  if (filters.impact) {
    return events.filter(e => e.impact === filters.impact);
  }
  return events;
}

module.exports = { fetchEvents };
