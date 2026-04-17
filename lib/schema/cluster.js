const clusterSchema = {
  type: 'object',
  properties: {
    clusterId: { type: 'string' },
    theme: { type: 'string' }
  }
};

module.exports = { clusterSchema };
