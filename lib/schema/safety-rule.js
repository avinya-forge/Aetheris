const safetyRuleSchema = {
  type: 'object',
  properties: {
    ruleId: { type: 'string' },
    condition: { type: 'string' }
  }
};

module.exports = { safetyRuleSchema };
