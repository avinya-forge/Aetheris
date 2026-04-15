import re

with open('docs/architecture/system_design.md', 'r') as f:
    content = f.read()

# Let's ensure the zero-cost architecture table is perfect
cost_table = """### Cost Breakdown (Monthly at Beta Scale, ≤50 Users)
| Service | Free Limit | Projected Usage | Cost |
| :--- | :--- | :--- | :--- |
| Cloudflare Pages | Unlimited builds | ~30 builds | $0 |
| Cloudflare Workers | 100k req/day | ~5k req/day | $0 |
| Cloudflare KV | 100k reads/day | ~20k reads/day | $0 |
| Clerk (Auth) | 10,000 MAU | ≤50 users | $0 |
| Supabase / D1 | 500MB | ~10MB | $0 |
| Gemini 1.5 Flash | 15 RPM | ~2 RPM avg | $0 |
| GitHub Actions | 2000 min/mo | ~100 min/mo | $0 |
| Open-Meteo | Unlimited | ~500 req/day | $0 |
| NOAA SWPC | Unlimited | ~100 req/day | $0 |
| GDELT | Unlimited | ~200 req/day | $0 |
| NASA DONKI | 1000 req/hr | ~50 req/day | $0 |
| **Total** | | | **$0/month** |"""

content = re.sub(r"### Cost Breakdown \(Monthly at Beta Scale, ≤50 Users\)[\s\S]*?\*\*Total\*\* \| \| \| \*\*\$0\/month\*\*\ \|", cost_table, content)

with open('docs/architecture/system_design.md', 'w') as f:
    f.write(content)

print("Updated system_design.md")
