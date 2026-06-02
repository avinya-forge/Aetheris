const nowcastSchema = {
  type: 'object',
  properties: {
    timestamp: { type: 'string' },
    data: { type: 'object' }
  }
};

export { nowcastSchema };

export {};
