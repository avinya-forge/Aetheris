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
    assert.strictEqual(kp.kpIndex, 7, 'must use last item in array');
    assert.strictEqual(kp.source, 'noaa-swpc', 'source must be noaa-swpc');
    assert.strictEqual(kp.impactScore, 60, 'kp=7 → impactScore 60 (HIGH)');
    assert.ok(kp.id.startsWith('noaa-kp-'), 'id must have noaa-kp- prefix');

    const extremeKp = await fetchKpIndex(makeFetcher([{ time_tag: 't', kp_index: 9 }]));
    assert.strictEqual(extremeKp.impactScore, 90, 'kp=9 → impactScore 90 (EXTREME)');

    const lowKp = await fetchKpIndex(makeFetcher([{ time_tag: 't', kp_index: 2 }]));
    assert.strictEqual(lowKp.impactScore, 5, 'kp=2 → impactScore 5 (LOW)');

    const nullResult = await fetchKpIndex(makeFetcher([]));
    assert.strictEqual(nullResult, null, 'empty NOAA response → null');

    // --- fetchSolarWind ---
    const wind = await fetchSolarWind(makeFetcher([
      { time_tag: '2026-04-10T00:01:00Z', proton_speed: 450, density: 12 },
    ]));
    assert.strictEqual(wind.windSpeed, 450, 'windSpeed from proton_speed');
    assert.strictEqual(wind.density, 12, 'density must be parsed');
    assert.strictEqual(wind.source, 'noaa-swpc', 'source must be noaa-swpc');

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
    assert.strictEqual(combined.length, 2, 'fetchNoaaSwpc returns both kp + wind');
    assert.strictEqual(callCount, 2, 'must call both endpoints');

    assert.ok(NOAA_KP_URL.includes('swpc.noaa.gov'), 'URL must point to swpc.noaa.gov');

    console.log('PASS - noaa-swpc-client.test.js');
  } catch (err) {
    console.error('FAIL - noaa-swpc-client.test.js:', err.message);
    process.exit(1);
  }
})();
