export class ContextManager {
  constructor(maxTokens = 8000, synthesizer = null) {
    this.maxTokens = maxTokens;
    this.messages = [];
    this.synthesizer = synthesizer;
    this.compressionRatio = 0.8;
  }

  /**
   * Naive token estimation: string length / 4
   */
  estimateTokens(text) {
    if (typeof text !== 'string') return 0;
    return Math.ceil(text.length / 4);
  }

  getCurrentTokenCount() {
    return this.messages.reduce((total, msg) => total + this.estimateTokens(msg.content), 0);
  }

  /**
   * Add a message and auto-summarize if threshold is exceeded
   */
  async add(message) {
    this.messages.push(message);

    // Check if we exceed adaptive headroom threshold
    let tokens = this.getCurrentTokenCount();
    if (tokens > this.maxTokens * this.compressionRatio) {
      await this.summarize();

      // Adaptive compression: if we are STILL above 70% of max tokens after summarizing,
      // we need to be more aggressive next time.
      if (this.getCurrentTokenCount() > this.maxTokens * 0.7) {
        this.compressionRatio = Math.max(0.5, this.compressionRatio - 0.1); // progressive backoff, max 50%
      } else {
        // We recovered enough space, we can relax the ratio a bit back towards 0.8
        this.compressionRatio = Math.min(0.8, this.compressionRatio + 0.05);
      }
    }
  }

  /**
   * Summarize older messages to free up headroom
   */
  async summarize() {
    if (this.messages.length <= 1) return;

    // We can be more aggressive and summarize multiple old summaries and messages
    // Let's keep the most recent message, and compress everything else into one system prompt.
    const toSummarize = this.messages.slice(0, -1);
    const recentMessage = this.messages[this.messages.length - 1];

    const combinedText = toSummarize.map(m => m.content).join('\n');
    let summaryText = 'Summary of previous events.';

    if (this.synthesizer) {
       try {
           summaryText = await this.synthesizer(combinedText);
       } catch (_e) {
           summaryText = `[Summarized ${toSummarize.length} old events to save tokens]`;
       }
    } else {
       summaryText = `[Summarized ${toSummarize.length} old events to save tokens]`;
    }

    this.messages = [
      { role: 'system', content: summaryText, isSummary: true },
      recentMessage
    ];
  }
}
