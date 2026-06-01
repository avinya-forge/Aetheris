/**
 * Maps raw NOAA Kp-index data to Aetheris internal event format.
 * @param {Object} latest
 * @returns {Object}
 */
function mapKpIndex(latest) {
  if (!latest) return null;
  const kp = parseFloat(latest.kp_index ?? latest.estimated_kp ?? 0);

  return {
    id: `noaa-kp-${latest.time_tag}`,
    source: 'noaa-swpc',
    kpIndex: kp,
    estimated: !!latest.estimated_kp,
    timeTag: latest.time_tag,
    // Impact escalates sharply at geomagnetic storm thresholds (Kp 5 = G1 storm)
    impactScore: kp >= 8 ? 90 : kp >= 6 ? 60 : kp >= 5 ? 30 : 5,
    topic: 'space-weather',
  };
}

/**
 * Maps raw NOAA solar wind data to Aetheris internal event format.
 * @param {Object} latest
 * @returns {Object}
 */
function mapSolarWind(latest) {
  if (!latest) return null;
  return {
    id: `noaa-wind-${latest.time_tag}`,
    source: 'noaa-swpc',
    windSpeed: parseFloat(latest.proton_speed ?? 0),
    density: parseFloat(latest.density ?? 0),
    timeTag: latest.time_tag,
    impactScore: 5,
    topic: 'space-weather',
  };
}

/**
 * Maps NASA DONKI events to Aetheris internal event format.
 */
const DONKI_IMPACT_BY_TYPE = {
  CME: 40,
  FLR: 25,
  SEP: 35,
  MPC: 15,
};

function mapDonkiEvent(event, type) {
  return {
    id: event.messageID || event.activityID || `donki-${type}-${event.beginTime || event.startTime}`,
    source: 'nasa-donki',
    eventType: type,
    startTime: event.startTime || event.beginTime || null,
    endTime: event.endTime || null,
    note: (event.note || '').slice(0, 200),
    impactScore: DONKI_IMPACT_BY_TYPE[type] || 10,
    topic: 'space-weather',
  };
}

export { mapKpIndex, mapSolarWind, mapDonkiEvent, DONKI_IMPACT_BY_TYPE };

export {};
