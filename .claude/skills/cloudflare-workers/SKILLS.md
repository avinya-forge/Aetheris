---
name: cloudflare-workers
description: Instructions for Cloudflare Workers edge environment.
---
# Cloudflare Workers Rules
* **Exports:** Use `export default { fetch, scheduled }` exclusively for entrypoints (`functions/worker.js`).
* **KV Access:** Bind to `env.CACHE` for edge cache operations.
* **Speed:** Maximize cache hit rate with stale-while-revalidate patterns.
