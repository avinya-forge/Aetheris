/**
 * Temporal Intelligence Store
 * Manages the state of the timeline.
 */
function initStore() {
  return {
    currentFocus: 'present',
    events: [],
    horizon: null
  };
}

export {
  initStore
};

