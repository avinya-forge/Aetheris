const GhostCardSchema = {
  type: "object",
  properties: {
    likelihood: { type: "number" }, // percentage
    speculative: { type: "boolean" },
    eventDetails: {
      type: "object",
      properties: {
        eventType: { type: "string" },
        location: { type: "string" },
        description: { type: "string" }
      }
    }
  }
};

module.exports = { GhostCardSchema };
