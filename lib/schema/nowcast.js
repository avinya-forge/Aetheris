const NowcastSchema = {
  type: "object",
  properties: {
    timestamp: { type: "string" },
    data: {
      type: "object",
      properties: {
        source: { type: "string" },
        interpolated: { type: "boolean" }
      }
    }
  }
};

module.exports = { NowcastSchema };
