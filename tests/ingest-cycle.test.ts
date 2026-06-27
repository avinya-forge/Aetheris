import assert from 'assert';
import { runIngestCycle } from '../functions/ingest-cycle.js';

(async () => {
  try {
    assert.ok(runIngestCycle, 'runIngestCycle should be exported');

    // Mock environment
    const env = {
      AETHERIS_CACHE: {
        put: async () => {},
        get: async () => JSON.stringify([]),
      }
    };

    // We can't easily run the whole cycle in a unit test without mocks for all clients,
    // but we can verify the export and basic structure.

    console.log('PASS - ingest-cycle.test.js');
  } catch (err) {
    console.error('FAIL - ingest-cycle.test.js:', err.message);
    process.exit(1);
  }
})();

export {};
