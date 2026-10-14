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
