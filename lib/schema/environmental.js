const EnvironmentalSchema = {
  type: "object",
  properties: {
    weather: {
      type: "object",
      properties: {
        source: { type: "string" },
        temperature: { type: "number" },
        condition: { type: "string" }
      }
    },
    spaceWeather: {
      type: "object",
      properties: {
        kpIndex: { type: "number" },
        auroraProbability: { type: "number" }
      }
    },
    climate: {
      type: "object",
      properties: {
        heatStress: { type: "string" }
      }
    }
  }
};

module.exports = { EnvironmentalSchema };
