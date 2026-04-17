const { runIngestCycle } = require('../functions/ingest-cycle.js');

async function main() {
  console.log('--- Manual Ingest Cycle Start ---');
  const env = {
    CACHE: {
      get: async (key) => {
        console.log(`[KV GET] ${key}`);
        return null;
      },
      put: async (key, val) => {
        console.log(`[KV PUT] ${key} (size: ${val.length} bytes)`);
      }
    },
    NASA_API_KEY: process.env.NASA_API_KEY || 'DEMO_KEY'
  };

  try {
    const result = await runIngestCycle(env);
    console.log('\nIngest Cycle Result:');
    console.log(JSON.stringify(result, null, 2));
    console.log('\n--- Manual Ingest Cycle Complete ---');
  } catch (err) {
    console.error('Fatal Error during ingest cycle:', err);
    process.exit(1);
  }
}

main();
