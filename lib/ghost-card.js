export const ghostCardSchema = { type: 'object', properties: { id: { type: 'string' }, type: { type: 'string' }, likelihood: { type: 'number', maximum: 95 }, speculative: { type: 'boolean', const: false }, eventDetails: { type: 'object' } } };

export const schema = { ghostCardSchema };
