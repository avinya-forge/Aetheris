/**
 * Timeline Traversal Logic
 * Handles transitions between different temporal focuses.
 */
function traverse(state, targetFocus) {
  return {
    ...state,
    currentFocus: targetFocus
  };
}

module.exports = {
  traverse
};

export {};
