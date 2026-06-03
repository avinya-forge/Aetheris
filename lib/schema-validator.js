function validateEvent(event) {
  if (!event || typeof event !== 'object') return false;
  if (!event.id || typeof event.id !== 'string') return false;
  if (!event.timestamp && !event.publishedAt) return false;
  return true;
}

export { validateEvent };

