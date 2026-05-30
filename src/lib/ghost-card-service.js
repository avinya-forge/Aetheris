/**
 * Ghost Card Service Hook Logic
 */
function getGhostCards() {
  return [
    { id: 'g1', title: 'Predicted Flare', likelihood: 0.8, isSpeculative: true },
    { id: 'g2', title: 'Future Aurora', likelihood: 0.4, isSpeculative: true }
  ];
}

export { getGhostCards };
