function parseKpIndex(data) {
  if (!data || typeof data !== 'object' || !data.kp_index) {
    return null;
  }

  const value = parseFloat(data.kp_index);
  if (isNaN(value)) {
    return null;
  }
  let severity = 'LOW';
  let alert = false;

  if (value >= 8) {
    severity = 'EXTREME';
    alert = true;
  } else if (value >= 6) {
    severity = 'HIGH';
    alert = true;
  } else if (value >= 5) {
    severity = 'MODERATE';
    alert = true;
  } else {
    severity = 'LOW';
    alert = false;
  }

  return { value, alert, severity };
}

export { parseKpIndex };

export {};
