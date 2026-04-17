const nowcastSchema = {
  type: 'object',
  properties: {
    timestamp: { type: 'string' },
    data: { type: 'object' }
  }
};

module.exports = { nowcastSchema };
