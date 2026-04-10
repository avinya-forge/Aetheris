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
      `${KV_PREFIX}abc123`,
      'hash takes priority over id'
    );
    assert.strictEqual(
      fingerprintEvent({ id: 'event-42' }),
      `${KV_PREFIX}event-42`,
      'id used when no hash'
    );
    assert.strictEqual(
      fingerprintEvent({ text: '  Hello World  ' }),
      `${KV_PREFIX}hello world`,
      'text fallback: trimmed + lowercased'
    );
    const fp = fingerprintEvent({ text: 'x'.repeat(200) });
    assert.ok(fp.length <= KV_PREFIX.length + 120, 'text fingerprint capped at 120 chars');
    assert.strictEqual(fingerprintEvent(null), null, 'null event → null fingerprint');
    assert.strictEqual(fingerprintEvent({}), null, 'empty event → null fingerprint');

    // --- isNewEvent / markEventSeen ---
    const kv = makeMockKv();
    const event = { id: 'evt-1', text: 'Breaking news' };

    assert.strictEqual(await isNewEvent(kv, event), true, 'unseen event must be new');
    await markEventSeen(kv, event);
    assert.strictEqual(await isNewEvent(kv, event), false, 'seen event must not be new');
    assert.strictEqual(await isNewEvent(kv, null), false, 'null event isNewEvent → false');
    await markEventSeen(kv, {}); // must not throw

    console.log('PASS - event-fingerprint.test.js');
  } catch (err) {
    console.error('FAIL - event-fingerprint.test.js:', err.message);
    process.exit(1);
  }
})();
