const ClusterSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    keywords: {
      type: 'array',
      items: { type: 'string' }
    },
    events: {
      type: 'array',
      items: { type: 'object' }
    }
  }
};

module.exports = { ClusterSchema };
