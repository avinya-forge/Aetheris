import re

with open('docs/architecture/system_design.md', 'r') as f:
    content = f.read()

# Let's ensure the zero-cost architecture diagram is perfect
diagram = """## Zero-Cost Deployment Architecture

```
GitHub (source)
  │ push to main
  ▼
GitHub Actions (CI/CD — free public repo)
  │ npm run build (Vite → dist/)
  ▼
Cloudflare Pages (static hosting — free)
  │ serves: index.html, main.js, main.css, glyphs, sw.js
  ▼
Cloudflare Workers (edge compute — 100k req/day free)
  │ functions/edge-proxy.js
  │ binds: Cloudflare KV (AETHERIS_CACHE)
  ▼
Cloudflare KV (edge cache — 100k reads/day free)
  │ TTLs: weather 1h, space 15min, GDELT 15min
  ▼
Free Public APIs
  └── Open-Meteo · NOAA SWPC · GDELT · NASA DONKI
```
"""

content = re.sub(r"## Zero-Cost Deployment Architecture[\s\S]*?```\n\n### Cost Breakdown", diagram + "\n### Cost Breakdown", content)

with open('docs/architecture/system_design.md', 'w') as f:
    f.write(content)
