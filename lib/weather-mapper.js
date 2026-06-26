/**
 * Maps Open-Meteo raw data to Aetheris internal event format.
 * @param {Object} data
 * @param {Object} location
 * @returns {Object}
 */
export function mapWeatherEvent(data, location) {
  if (!data || !location) return null;
  const c = data.current || {};
  const h = data.hourly || {};
  const temp = c.temperature_2m ?? null;
  const wind = c.wind_speed_10m ?? null;

  // AQI Logic (pm2_5 > 35 is UNHEALTHY per simplified standard)
  const pm25 = (h.pm2_5 && h.pm2_5.length > 0) ? h.pm2_5[0] : null;

  // Impact score: elevated for hazardous conditions
  let impactScore = 5;
  if (temp !== null && (temp >= 40 || temp <= -10)) impactScore = 60;
  if (wind !== null && wind >= 100) impactScore = Math.max(impactScore, 70);
  if (pm25 !== null && pm25 > 35) impactScore = Math.max(impactScore, 50);

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
    aqi: { pm2_5: pm25 }
  };
}
