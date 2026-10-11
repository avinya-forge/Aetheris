export class ContextManager {
  constructor(maxTokens = 8000, synthesizer = null) {
    this.maxTokens = maxTokens;
    this.messages = [];
    this.synthesizer = synthesizer;
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

    // Check if we exceed 80% headroom
    if (this.getCurrentTokenCount() > this.maxTokens * 0.8) {
      await this.summarize();
    }
  }

  /**
   * Summarize older messages to free up headroom
   */
  async summarize() {
    if (this.messages.length <= 1) return;

    // Keep the most recent message, summarize the rest
    const toSummarize = this.messages.slice(0, -1);
    const recentMessage = this.messages[this.messages.length - 1];

    const combinedText = toSummarize.map(m => m.content).join('\n');
    let summaryText = 'Summary of previous events.';

    if (this.synthesizer) {
       try {
           summaryText = await this.synthesizer(combinedText);
       } catch (e) {
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
