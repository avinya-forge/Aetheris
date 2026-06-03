/**
 * Zoom-dependent layer visibility logic.
 */

const VISIBILITY_THRESHOLDS = {
  CLUSTERS: 2,
  EVENTS: 8,
  DETAILS: 14,
};

/**
 * Determines if a layer should be visible at a given zoom level.
 * @param {string} layerType - Type of layer (CLUSTERS, EVENTS, DETAILS)
 * @param {number} zoom - Current map zoom level
 * @returns {boolean}
 */
function isLayerVisible(layerType, zoom) {
  const threshold = VISIBILITY_THRESHOLDS[layerType];
  if (threshold === undefined) return false;
  return zoom >= threshold;
}

export { isLayerVisible, VISIBILITY_THRESHOLDS };
