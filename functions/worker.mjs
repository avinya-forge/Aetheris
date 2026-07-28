/**
 * Aetheris — Cloudflare Workers Entry Point (ES Module format)
 */

import { runIngestCycle } from './ingest-cycle.js';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
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

const MCP_TOOLS = Array.from({ length: 39 }, (_, i) => ({
  name: `aetheris_tool_${i + 1}`,
  description: `Aetheris MCP Tool ${i + 1}`,
  inputSchema: {
    type: 'object',
    properties: {
      query: { type: 'string', description: 'Search query or parameter' },
    },
    required: ['query'],
  },
}));

export default {
  async fetch(request, env, _ctx) {
    try {
      const url = new URL(request.url);

      if (request.method === 'OPTIONS') {
        return new Response(null, { status: 204, headers: CORS_HEADERS });
      }

      if (url.pathname === '/api/events') {
        const dateParam = url.searchParams.get('date');
        let key = 'events:latest';
        if (dateParam && /^\d{4}-\d{2}-\d{2}$/.test(dateParam)) {
          key = `events:archive:${dateParam}`;
        }

        const raw = await env.CACHE.get(key);
        let events = raw ? JSON.parse(raw) : [];

        const since = parseInt(url.searchParams.get('since') || '0', 10);
        if (since > 0) {
          events = events.filter(e => e.timestamp > since);
        }

        return json(events, 200, { 'Cache-Control': 'public, max-age=30' });
      }

      if (url.pathname === '/api/ghost-cards') {
        const raw = await env.CACHE.get('ghost_cards:latest');
        const cards = raw ? JSON.parse(raw) : [];
        return json(cards, 200, { 'Cache-Control': 'public, max-age=30' });
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

      if (url.pathname === '/api/mcp') {
        if (request.method === 'GET') {
          return json({ tools: MCP_TOOLS }, 200, { 'Cache-Control': 'public, max-age=300' });
        } else if (request.method === 'POST') {
          try {
            const body = await request.json();
            const toolName = body.tool;
            const params = body.parameters || {};

            const toolExists = MCP_TOOLS.some(t => t.name === toolName);
            if (!toolExists) {
              return json({ error: `Tool ${toolName} not found` }, 404);
            }

            return json({
              success: true,
              tool: toolName,
              result: `Executed ${toolName} with query: ${params.query || 'none'}`,
            });
          } catch (_e) {
            return json({ error: 'Invalid JSON body' }, 400);
          }
        }
        return json({ error: 'Method Not Allowed' }, 405);
      }

      return json({ error: 'Not Found' }, 404);
    } catch (err) {
      console.error('Worker Fetch Error:', err);
      return json({ error: 'Internal Server Error', message: err.message }, 500);
    }
  },

  async scheduled(event, env, ctx) {
    const now = event && event.scheduledTime ? event.scheduledTime : Date.now();
    ctx.waitUntil(
      runIngestCycle(env, null, null, now).catch(err => {
        console.error('Worker Scheduled Error:', err);
      })
    );
  },
};
