import assert from 'assert';
import { fingerprintEvent, isNewEvent, markEventSeen, KV_PREFIX } from '../lib/event-fingerprint';

function makeMockKv() {
  const store = new Map();
  return {
    async get(key: string) { return store.has(key) ? store.get(key) : null; },
    async put(key: string, value: string, _opts?: any) { store.set(key, value); },
  };
}

(async () => {
  try {
    // --- fingerprintEvent ---
    assert.strictEqual(
      fingerprintEvent({ hash: 'abc123' }),
      KV_PREFIX + 'abc123',
      'fingerprintEvent: hash priority'
    );
    assert.strictEqual(
      fingerprintEvent({ id: 'event-42' }),
      KV_PREFIX + 'event-42',
      'fingerprintEvent: id fallback'
    );
    assert.strictEqual(
      fingerprintEvent({ text: '  Hello World  ' }),
      KV_PREFIX + 'hello world',
      'fingerprintEvent: text normalization'
    );
    assert.strictEqual(
      fingerprintEvent({ text: 'Breaking! News... with spaces    and punctuation???' }),
      KV_PREFIX + 'breaking news with spaces and punctuation',
      'fingerprintEvent: punctuation stripping'
    );
    const fp = fingerprintEvent({ text: 'x'.repeat(200) });
    assert.ok(fp && fp.length <= KV_PREFIX.length + 120, 'fingerprintEvent: text length cap');
    assert.strictEqual(fingerprintEvent(null), null, 'fingerprintEvent: null input');
    assert.strictEqual(fingerprintEvent({}), null, 'fingerprintEvent: empty input');

    // --- isNewEvent / markEventSeen ---
    const kv = makeMockKv();
    const event = { id: 'evt-1', text: 'Breaking news' };

    assert.strictEqual(await isNewEvent(kv, event), true, 'isNewEvent: unseen event');
    await markEventSeen(kv, event);
    assert.strictEqual(await isNewEvent(kv, event), false, 'isNewEvent: seen event');
    assert.strictEqual(await isNewEvent(kv, null), false, 'isNewEvent: null event');
    await markEventSeen(kv, {}); // must not throw

    console.log('PASS - event-fingerprint.test.js');
  } catch (err: any) {
    console.error('FAIL - event-fingerprint.test.js:', err.message);
    process.exit(1);
  }
})();

export {};
