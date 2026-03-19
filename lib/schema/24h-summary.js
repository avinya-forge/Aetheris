const { EnvironmentalSchema } = require('./environmental.js');
const { GeopoliticalSchema } = require('./geopolitical.js');

const TwentyFourHourSummarySchema = {
  type: "object",
  properties: {
    environmental: EnvironmentalSchema,
    geopolitical: GeopoliticalSchema,
    timestamp: { type: "string" },
    safetyWarnings: {
      type: "array",
      items: { type: "string" }
    }
  }
};

module.exports = { TwentyFourHourSummarySchema };
