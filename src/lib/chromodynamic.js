/**
 * Chromodynamic Visual System
 * Maps environmental states (like Kp-index) to visual atmosphere.
 */

const ATMOSPHERE_MODES = {
  CALM: { color: '#00ffcc', intensity: 0.2 },
  ACTIVE: { color: '#ffff00', intensity: 0.5 },
  STORM: { color: '#ff0000', intensity: 0.8 },
};

/**
 * Returns color specification based on Kp-index.
 * @param {number} kp - Kp-index (0-9)
 * @returns {Object}
 */
function getAtmosphereFromKp(kp) {
  if (kp < 4) return ATMOSPHERE_MODES.CALM;
  if (kp < 7) return ATMOSPHERE_MODES.ACTIVE;
  return ATMOSPHERE_MODES.STORM;
}

module.exports = { getAtmosphereFromKp, ATMOSPHERE_MODES };
