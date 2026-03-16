const ForecastSchema = {
  type: "object",
  properties: {
    eventType: { type: "string" },
    location: { type: "string" },
    patternMatchId: { type: "string" },
    speculative: { type: "boolean" }
  }
};

module.exports = { ForecastSchema };
