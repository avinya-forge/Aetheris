const { EnvironmentalSchema } = require('./environmental.js');
const { GeopoliticalSchema } = require('./geopolitical.js');

const SummarySchema = {
  type: "object",
  properties: {
    environmental: EnvironmentalSchema,
    geopolitical: GeopoliticalSchema,
    timestamp: { type: "string" }
  }
};

module.exports = { SummarySchema };
