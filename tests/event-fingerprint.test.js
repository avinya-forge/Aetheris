const assert = require('assert');
const { fingerprintEvent, isNewEvent, markEventSeen, KV_PREFIX } = require('../lib/data/event-fingerprint.js');

function makeMockKv() {
  const store = new Map();
  return {
    async get(key) { return store.has(key) ? store.get(key) : null; },
    async put(key, value, _opts) { store.set(key, value); },
  };
}

(async () => {
  try {
    // --- fingerprintEvent ---
    assert.strictEqual(
      fingerprintEvent({ hash: 'abc123' }),
      KV_PREFIX + 'abc123',
      'fingerprintEvent: hash takes priority over id'
    );
    assert.strictEqual(
      fingerprintEvent({ id: 'event-42' }),
      KV_PREFIX + 'event-42',
      'fingerprintEvent: id used when no hash'
    );
    assert.strictEqual(
      fingerprintEvent({ text: '  Hello World  ' }),
      KV_PREFIX + 'hello world',
      'fingerprintEvent: text fallback should be trimmed and lowercased'
    );
    assert.strictEqual(
      fingerprintEvent({ text: 'Breaking! News... with spaces    and punctuation???' }),
      KV_PREFIX + 'breaking news with spaces and punctuation',
      'fingerprintEvent: text fallback should strip punctuation and normalize spaces'
    );
    const fp = fingerprintEvent({ text: 'x'.repeat(200) });
    assert.ok(fp.length <= KV_PREFIX.length + 120, 'fingerprintEvent: text fingerprint capped at 120 chars');
    assert.strictEqual(fingerprintEvent(null), null, 'fingerprintEvent: null event should return null');
    assert.strictEqual(fingerprintEvent({}), null, 'fingerprintEvent: empty event should return null');

    // --- isNewEvent / markEventSeen ---
    const kv = makeMockKv();
    const event = { id: 'evt-1', text: 'Breaking news' };

    assert.strictEqual(await isNewEvent(kv, event), true, 'isNewEvent: unseen event must be new');
    await markEventSeen(kv, event);
    assert.strictEqual(await isNewEvent(kv, event), false, 'isNewEvent: seen event must not be new');
    assert.strictEqual(await isNewEvent(kv, null), false, 'isNewEvent: null event isNewEvent should be false');
    await markEventSeen(kv, {}); // must not throw

  } catch (err) {
    console.error('FAIL - event-fingerprint.test.js:', err.message);
    process.exit(1);
  }
})();
console.log('PASS - event-fingerprint.test.js');
