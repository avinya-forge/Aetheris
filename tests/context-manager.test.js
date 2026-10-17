import test from 'node:test';
import assert from 'node:assert';
import { ContextManager } from '../lib/context-manager.js';

test('ContextManager - initial state', () => {
  const manager = new ContextManager();
  assert.strictEqual(manager.maxTokens, 8000);
  assert.strictEqual(manager.messages.length, 0);
  assert.strictEqual(manager.getCurrentTokenCount(), 0);
});

test('ContextManager - estimateTokens', () => {
  const manager = new ContextManager();
  assert.strictEqual(manager.estimateTokens('1234'), 1);
  assert.strictEqual(manager.estimateTokens('12345'), 2);
  assert.strictEqual(manager.estimateTokens(null), 0);
});

test('ContextManager - add without threshold', async () => {
  const manager = new ContextManager(100);
  await manager.add({ role: 'user', content: 'hello' }); // ~2 tokens
  assert.strictEqual(manager.messages.length, 1);
  assert.strictEqual(manager.getCurrentTokenCount(), 2);
});

test('ContextManager - summarize on threshold exceeded', async () => {
  const manager = new ContextManager(10); // threshold is 8 tokens (10 * 0.8)

  // Adding message with 20 chars (5 tokens)
  await manager.add({ role: 'user', content: '12345678901234567890' });
  assert.strictEqual(manager.messages.length, 1);
  assert.strictEqual(manager.getCurrentTokenCount(), 5);

  // Adding another message with 20 chars (5 tokens). Total 10 tokens > 8. Summarize should trigger.
  await manager.add({ role: 'user', content: '12345678901234567890' });

  assert.strictEqual(manager.messages.length, 2);
  assert.strictEqual(manager.messages[0].isSummary, true);
  assert.strictEqual(manager.messages[0].content, '[Summarized 1 old events to save tokens]');
  assert.strictEqual(manager.messages[1].content, '12345678901234567890');
});

test('ContextManager - summarize does nothing if <=1 message', async () => {
  const manager = new ContextManager(10);
  manager.messages = [{ role: 'user', content: 'test' }];
  await manager.summarize();
  assert.strictEqual(manager.messages.length, 1);
  assert.strictEqual(manager.messages[0].content, 'test');
});

test('ContextManager - with custom synthesizer', async () => {
  const customSynthesizer = async (text) => `Custom summary: ${text.length} chars`;
  const manager = new ContextManager(10, customSynthesizer);

  await manager.add({ role: 'user', content: '12345678901234567890' });
  await manager.add({ role: 'user', content: '12345678901234567890' });

  assert.strictEqual(manager.messages.length, 2);
  assert.strictEqual(manager.messages[0].isSummary, true);
  assert.strictEqual(manager.messages[0].content, 'Custom summary: 20 chars');
});

test('ContextManager - synthesizer failure fallback', async () => {
  const failingSynthesizer = async (_text) => { throw new Error('API down'); };
  const manager = new ContextManager(10, failingSynthesizer);

  await manager.add({ role: 'user', content: '12345678901234567890' });
  await manager.add({ role: 'user', content: '12345678901234567890' });

  assert.strictEqual(manager.messages.length, 2);
  assert.strictEqual(manager.messages[0].isSummary, true);
  assert.strictEqual(manager.messages[0].content, '[Summarized 1 old events to save tokens]');
});

test('ContextManager - adaptive compression backoff', async () => {
  // Mock synthesizer that creates a large summary (simulating ineffective compression)
  const ineffectiveSynthesizer = async (text) => text;

  const manager = new ContextManager(10, ineffectiveSynthesizer);
  assert.strictEqual(manager.compressionRatio, 0.8);

  // 1st message: 5 tokens
  await manager.add({ role: 'user', content: '12345678901234567890' });
  // Total tokens: 5. maxTokens * 0.8 = 8. No compression.

  // 2nd message: 5 tokens
  await manager.add({ role: 'user', content: '12345678901234567890' });
  // Total tokens: 10. Exceeds 8. Triggers compression.
  // Ineffective synthesizer returns '12345678901234567890' (5 tokens).
  // Total tokens after compression: 5 (summary) + 5 (recent) = 10 tokens.
  // 10 > 10 * 0.7 (7). Triggers backoff.
  assert.strictEqual(Math.round(manager.compressionRatio * 10) / 10, 0.7);

  // 3rd message: 5 tokens
  await manager.add({ role: 'user', content: '12345678901234567890' });
  // Total tokens: 15. Exceeds 10 * 0.7 = 7. Triggers compression.
  // Ineffective synthesizer returns 10 tokens.
  // Total tokens after compression: 10 + 5 = 15.
  // 15 > 7. Triggers backoff again.
  // 0.7 - 0.1 = 0.6
  assert.strictEqual(Math.round(manager.compressionRatio * 10) / 10, 0.6);
});

test('ContextManager - adaptive compression recovery', async () => {
  // Effective synthesizer
  const effectiveSynthesizer = async (text) => 'short'; // 2 tokens

  const manager = new ContextManager(10, effectiveSynthesizer);

  // artificially set ratio low to simulate recovery
  manager.compressionRatio = 0.6;

  // 1st message: 5 tokens
  await manager.add({ role: 'user', content: '12345678901234567890' });

  // 2nd message: 5 tokens
  await manager.add({ role: 'user', content: '12345678901234567890' });
  // Exceeds 10 * 0.6 = 6. Triggers compression.
  // Effective summary = 2 tokens. Recent message = 5 tokens. Total = 7 tokens.
  // Wait, 7 > 7 (10 * 0.7), but wait, the threshold in recovery is 0.7.
  // 7 is NOT strictly greater than 7 (it is equal to 7), so it recovers!

  // It should recover by 0.05
  // manager.add triggers summarize. Total after: 'short' (2 tokens) + 5 = 7 tokens.
  // 7 > 10 * 0.7 is FALSE.
  // So it relaxes ratio: 0.6 + 0.05 = 0.65
  assert.strictEqual(manager.compressionRatio, 0.65);
});
