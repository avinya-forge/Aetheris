/**
 * Edge Proxy Handler
 * Simulates an edge-computed response wrapper.
 */
function processRequest(data) {
  if (!data || typeof data !== 'object' || Array.isArray(data) || data.payload === undefined) {
    return {
      status: 400,
      body: 'Bad Request'
    };
  }

  return {
    status: 200,
    body: data.payload,
    edgeComputed: true
  };
}

module.exports = {
  processRequest
};
