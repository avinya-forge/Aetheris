const interestThresholdSchema = {
  type: 'object',
  properties: {
    minImpactScore: { type: 'number' }
  }
};

module.exports = { interestThresholdSchema };
