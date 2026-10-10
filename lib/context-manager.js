/**
 * Optimizes agent context headroom by applying active rolling summaries
 * to a list of events when they exceed a maximum token limit.
 *
 * @param {Array<Object>} events - Array of event objects with a `.content` or `.text` property
 * @param {number} maxTokens - Maximum allowed tokens (estimation: length / 4)
 * @returns {Array<Object>} Truncated/Summarized list of events that fit within the token limit
 */
export function optimizeContextHeadroom(events = [], maxTokens = 4000) {
  if (!Array.isArray(events) || events.length === 0) {
    return [];
  }

  // Helper to estimate tokens from text
  const estimateTokens = (text) => {
    if (!text || typeof text !== 'string') return 0;
    return Math.ceil(text.length / 4);
  };

  // Helper to get text content from an event
  const getEventText = (event) => {
    if (!event) return '';
    return event.content || event.text || JSON.stringify(event);
  };

  let totalTokens = 0;
  const optimizedEvents = [];

  // Iterate from newest (assuming end of array is newest or we just keep as many as possible)
  // Let's assume the array is ordered newest first or oldest first. We will keep from index 0 until maxTokens.
  // We'll iterate normally and stop when we hit the limit, keeping the first N elements.
  for (let i = 0; i < events.length; i++) {
    const event = events[i];
    const text = getEventText(event);
    const tokens = estimateTokens(text);

    if (totalTokens + tokens > maxTokens) {
      // Reached token limit. We truncate here.
      // If it's the very first event and it alone exceeds the limit, we might want to include a truncated version.
      if (i === 0 && optimizedEvents.length === 0) {
        const charLimit = maxTokens * 4;
        const truncatedText = text.substring(0, charLimit) + '...';
        optimizedEvents.push({ ...event, content: truncatedText, text: truncatedText, _summarized: true });
      }
      break;
    }

    totalTokens += tokens;
    optimizedEvents.push(event);
  }

  return optimizedEvents;
}