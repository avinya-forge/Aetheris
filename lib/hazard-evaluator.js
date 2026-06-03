/**
 * Evaluates environmental data and returns a safety warning if a hazard is detected.
 *
 * @param {Object} data - Environmental data
 * @param {number} [data.temperature] - Temperature in Celsius
 * @param {number} [data.windSpeed] - Wind speed in km/h
 * @returns {string|null} The warning message or null if no hazard.
 */
function evaluateHazard(data) {
  if (!data) return null;

  if (typeof data.temperature === 'number') {
    if (data.temperature >= 40) {
      return `It is ${data.temperature}°C. Your internal cooling is failing. Seek shade now.`;
    }
    if (data.temperature <= -10) {
      return `It is ${data.temperature}°C. Hypothermia risk is high. Seek shelter.`;
    }
  }

  if (typeof data.windSpeed === 'number' && data.windSpeed >= 100) {
    return `Wind speeds at ${data.windSpeed}km/h detected. Severe storm incoming. Take cover.`;
  }

  return null;
}

export { evaluateHazard };

