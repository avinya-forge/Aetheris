/**
 * Aetheris — Cloudflare Workers Entry Point (ES Module format)
 *
 * Handles two roles:
 *   fetch     → serve processed events + health endpoint to the PWA
 *   scheduled → cron trigger (every 1 min) → runs the sniffer ingest cycle
 *
 * Business logic lives in functions/ingest-cycle.js and lib/ (CommonJS, testable).
 * This file is the thin CF-native wrapper only — no logic here.
 */

import { runIngestCycle } from './ingest-cycle.js';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...CORS_HEADERS,
      ...extraHeaders,
    },
  });
}

export default {
  /**
   * Fetch handler — serves the Aetheris REST API.
   *
   * GET /api/events         → latest processed events from KV
   * GET /api/events?since=N → events newer than unix timestamp N
   * GET /api/health         → liveness check + source meta snapshot
   */
  async fetch(request, env, _ctx) {
    const url = new URL(request.url);

    // Preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    if (url.pathname === '/api/events') {
      const raw = await env.CACHE.get('events:latest');
      let events = raw ? JSON.parse(raw) : [];

      const since = parseInt(url.searchParams.get('since') || '0', 10);
      if (since > 0) {
        events = events.filter(e => e.publishedAt && new Date(e.publishedAt).getTime() > since);
      }

      return json(events, 200, { 'Cache-Control': 'public, max-age=30' });
    }

    if (url.pathname === '/api/health') {
      const sources = ['noaa-swpc', 'gdelt', 'nasa-donki', 'open-meteo'];
      const metaEntries = await Promise.all(
        sources.map(async id => {
          const raw = await env.CACHE.get(`source:meta:${id}`);
          return [id, raw ? JSON.parse(raw) : { lastFetchedAt: 0 }];
        })
      );
      return json({
        ok: true,
        ts: Date.now(),
        sources: Object.fromEntries(metaEntries),
      });
    }

    return json({ error: 'Not Found' }, 404);
  },

  /**
   * Scheduled handler — Cloudflare Cron Trigger.
   * Fires every minute per wrangler.toml `crons = ["* * * * *"]`.
   * ctx.waitUntil keeps the Worker alive until ingest completes.
   */
  async scheduled(_event, env, ctx) {
    ctx.waitUntil(runIngestCycle(env));
  },
};
