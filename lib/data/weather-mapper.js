/**
 * Maps Open-Meteo raw data to Aetheris internal event format.
 * @param {Object} data
 * @param {Object} location
 * @returns {Object}
 */
function mapWeatherEvent(data, location) {
  if (!data || !location) return null;
  const c = data.current || {};
  const temp = c.temperature_2m ?? null;
  const wind = c.wind_speed_10m ?? null;

  // Impact score: elevated for hazardous conditions
  let impactScore = 5;
  if (temp !== null && (temp >= 40 || temp <= -10)) impactScore = 60;
  if (wind !== null && wind >= 100) impactScore = Math.max(impactScore, 70);

  return {
    id: `openmeteo-${location.id}-${c.time}`,
    source: 'open-meteo',
    locationId: location.id,
    latitude: location.lat,
    longitude: location.lon,
    temperature: temp,
    windSpeed: wind,
    precipitation: c.precipitation ?? null,
    weatherCode: c.weather_code ?? null,
    humidity: c.relative_humidity_2m ?? null,
    feelsLike: c.apparent_temperature ?? null,
    time: c.time || null,
    impactScore,
    topic: 'weather',
  };
}

module.exports = { mapWeatherEvent };
