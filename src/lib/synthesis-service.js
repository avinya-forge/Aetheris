/**
 * Synthesis Service Hook Logic
 */
function getSynthesis(clusterId) {
  return {
    id: clusterId,
    brief: 'A brief summary of the event cluster.',
    wordCount: 7
  };
}

export { getSynthesis };
