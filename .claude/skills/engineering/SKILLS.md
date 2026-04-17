---
name: engineering
description: Technical design and implementation for Aetheris.
---
# Engineering Rules
* **Stack:** Vite, React, Cloudflare Workers, Cloudflare KV.
* **Data:** JSON Schema draft 7 in `lib/schema/`.
* **Git:** Pull main before work. Merge or rebase main before PR.
* **I/O Purity:** `lib/data/` functions must be pure transforms.
* **Standards:** Named exports only in CommonJS (`module.exports = { name };`).