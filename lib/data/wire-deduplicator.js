function deduplicateWires(wires) {
  if (!Array.isArray(wires)) {
    return [];
  }

  const seenText = new Set();
  const deduped = [];

  for (const wire of wires) {
    if (!wire || !wire.text) continue;
    const text = wire.text.trim().toLowerCase();

    if (!seenText.has(text)) {
      seenText.add(text);
      deduped.push(wire);
    }
  }

  return deduped;
}

module.exports = deduplicateWires;
