/**
 * Edge Proxy Handler
 * Simulates an edge-computed response wrapper.
 */

const tokenBuckets = new Map();

function checkTokenBucket(ip) {
  const now = Date.now();
  const maxTokens = 100;
  const refillRate = 1 / 600; // 100 tokens per minute -> 1 token per 600 ms

  const bucket = tokenBuckets.get(ip) || { tokens: maxTokens, lastRefill: now };

  const timePassed = now - bucket.lastRefill;
  bucket.tokens = Math.min(maxTokens, bucket.tokens + timePassed * refillRate);
  bucket.lastRefill = now;

  if (bucket.tokens >= 1) {
    bucket.tokens -= 1;
    tokenBuckets.set(ip, bucket);
    return true;
  }
  tokenBuckets.set(ip, bucket);
  return false;
}

function processRequest(data, ip = 'unknown') {
  if (!checkTokenBucket(ip)) {
    return {
      status: 429,
      body: 'Too Many Requests'
    };
  }

  if (!data || typeof data !== 'object' || Array.isArray(data) || data.payload === undefined) {
    return {
      status: 400,
      body: 'Bad Request'
    };
  }

  return {
    status: 200,
    body: data.payload,
    edgeComputed: true
  };
}

module.exports = {
  processRequest,
  tokenBuckets
};
