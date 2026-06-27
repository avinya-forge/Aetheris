/**
 * Ghost Card Service Hook Logic
 */
async function getGhostCards() {
  try {
    const baseUrl = typeof window === 'undefined' ? 'http://localhost' : '';
    const response = await fetch(baseUrl + '/api/ghost-cards');
    if (response.ok) {
      return await response.json();
    }
  } catch (_err) {
    // console.error(err);
  }

  return [
    { id: 'g1', title: 'Predicted Flare', likelihood: 0.8, isSpeculative: false },
    { id: 'g2', title: 'Future Aurora', likelihood: 0.4, isSpeculative: false }
  ];
}

export { getGhostCards };
