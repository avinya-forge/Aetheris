function deduplicateWires(wires) {
  if (!Array.isArray(wires)) return [];

  const seenHashes = new Set();
  const deduped = [];

  for (const wire of wires) {
    if (!wire) continue;

    let key = null;
    if (wire.hash) {
      key = wire.hash;
    } else if (wire.text) {
      key = wire.text.trim().toLowerCase();
    }

    if (!key) continue;

    if (!seenHashes.has(key)) {
      seenHashes.add(key);
      deduped.push(wire);
    }
  }

  return deduped;
}

module.exports = { deduplicateWires };

export {};
