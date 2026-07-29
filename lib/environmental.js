
export const environmentalSchema = { type: 'object', properties: { type: { type: 'string' } } };

/**
 * Replaces older CAMS API logic with Open-Meteo AQI parsing.
 * Evaluates AQI fields and returns an event if thresholds are exceeded.
 */
export function evaluateAQI(openMeteoData, locationId) {
  if (!openMeteoData || !openMeteoData.hourly) return null;

  const hourly = openMeteoData.hourly;
  // Get first hour's data as latest
  const pm25 = hourly.pm2_5 && hourly.pm2_5.length > 0 ? hourly.pm2_5[0] : 0;
  const pm10 = hourly.pm10 && hourly.pm10.length > 0 ? hourly.pm10[0] : 0;

  // Basic threshold
  let severity = 'low';
  let impactScore = 0;

  if (pm25 > 50 || pm10 > 100) {
    severity = 'high';
    impactScore = 7;
  } else if (pm25 > 25 || pm10 > 50) {
    severity = 'moderate';
    impactScore = 4;
  } else {
    // Only return event if AQI is noteworthy
    return null;
  }

  return {
    id: `aqi-${locationId}-${Date.now()}`,
    topic: 'environmental',
    type: 'aqi-alert',
    location: locationId,
    title: `Elevated AQI Warning for ${locationId}`,
    severity,
    impactScore,
    metrics: {
      pm2_5: pm25,
      pm10: pm10
    }
  };
}
