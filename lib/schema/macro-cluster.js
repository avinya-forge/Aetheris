const macroClusterSchema = {
  type: 'object',
  properties: {
    clusterId: { type: 'string' },
    theme: { type: 'string' },
    events: {
      type: 'array',
      items: { type: 'string' }
    },
    impactScore: { type: 'number' }
  }
};

module.exports = macroClusterSchema;
