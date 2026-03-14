const GeopoliticalSchema = {
  type: "object",
  properties: {
    events: {
      type: "array",
      items: {
        type: "object",
        properties: {
          source: { type: "string" },
          description: { type: "string" },
          impactScore: { type: "number" }
        }
      }
    }
  }
};

module.exports = { GeopoliticalSchema };
