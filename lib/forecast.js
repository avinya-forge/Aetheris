const forecastSchema = {
  type: 'object',
  properties: {
    patternMatchId: { type: 'string' },
    isSpeculative: { type: 'boolean', const: false },
    likelihood: { type: 'number', maximum: 95 }
  },
  required: ['patternMatchId', 'isSpeculative']
};

export { forecastSchema };

export {};
