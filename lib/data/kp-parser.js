function parseKpIndex(data) {
  if (!data || typeof data !== 'object' || !data.kp_index) {
    return null;
  }

  const value = parseFloat(data.kp_index);
  if (isNaN(value)) {
    return null;
  }

  return {
    value: value,
    alert: value >= 5
  };
}

module.exports = parseKpIndex;
