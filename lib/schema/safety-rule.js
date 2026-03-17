const SafetyRuleSchema = {
  type: "object",
  properties: {
    hazardType: { type: "string" },
    severity: { type: "string" },
    warningMessage: { type: "string" }
  }
};

module.exports = { SafetyRuleSchema };
