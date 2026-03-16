const InterestThresholdSchema = {
  type: "object",
  properties: {
    county: { type: "string" },
    interests: {
      type: "array",
      items: { type: "string" }
    },
    minImpactScore: { type: "number" }
  },
  required: ["minImpactScore"]
};

module.exports = { InterestThresholdSchema };
