const assert = require('assert');
const { fetchKpIndex, fetchSolarWind, fetchNoaaSwpc, NOAA_KP_URL } = require('../lib/data/noaa-swpc-client.js');

function makeFetcher(body, status = 200) {
  return async () => ({ ok: status >= 200 && status < 300, status, json: async () => body });
}

(async () => {
  try {
    // --- fetchKpIndex ---
    const kp = await fetchKpIndex(makeFetcher([
      { time_tag: '2026-04-10T00:00:00Z', kp_index: 3 },
      { time_tag: '2026-04-10T00:01:00Z', kp_index: 7 },
    ]));
    assert.strictEqual(kp.kp_index, 7, 'must return raw last item');

    const nullResult = await fetchKpIndex(makeFetcher([]));
    assert.strictEqual(nullResult, null, 'empty NOAA response → null');

    // --- fetchSolarWind ---
    const wind = await fetchSolarWind(makeFetcher([
      { time_tag: '2026-04-10T00:01:00Z', proton_speed: 450, density: 12 },
    ]));
    assert.strictEqual(wind.proton_speed, 450, 'return raw last item');

    // --- fetchNoaaSwpc (combined) ---
    let callCount = 0;
    const dualFetcher = async (url) => {
      callCount++;
      if (url.includes('planetary_k_index')) {
        return { ok: true, json: async () => [{ time_tag: 't', kp_index: 5 }] };
      }
      return { ok: true, json: async () => [{ time_tag: 't', proton_speed: 400, density: 8 }] };
    };
    const combined = await fetchNoaaSwpc(dualFetcher);
    assert.strictEqual(combined.kp.kp_index, 5);
    assert.strictEqual(combined.wind.proton_speed, 400);
    assert.strictEqual(callCount, 2, 'must call both endpoints');

    assert.ok(NOAA_KP_URL.includes('swpc.noaa.gov'), 'URL must point to swpc.noaa.gov');

  } catch (err) {
    console.error('FAIL - noaa-swpc-client.test.js:', err.message);
    process.exit(1);
  }
})();
console.log('PASS - noaa-swpc-client.test.js');
