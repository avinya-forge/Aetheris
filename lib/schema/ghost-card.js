const GhostCardSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    type: { type: 'string' },
    likelihood: { type: 'number' },
    speculative: { type: 'boolean' },
    eventDetails: { type: 'object' }
  }
};

module.exports = { GhostCardSchema };
