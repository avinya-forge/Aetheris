const CACHE_NAME = 'aetheris-v1';
const URLS_TO_CACHE = ['/', '/index.html', '/src/assets/glyphs/index.svg'];

function handleInstall(event, cachesObj = caches) {
  event.waitUntil(
    cachesObj.open(CACHE_NAME).then((cache) => {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
}

function handleFetch(event, cachesObj = caches) {
  const url = new URL(event.request.url);
  const isApiCall = url.pathname.startsWith('/api/');

  event.respondWith(
    (async () => {
      const fetchRequest = event.request.clone ? event.request.clone() : event.request;

      if (!isApiCall) {
        // Cache-First Strategy for static assets
        const cachedResponse = await cachesObj.match(event.request);
        if (cachedResponse) {
          return cachedResponse;
        }
        try {
          const networkResponse = await fetch(fetchRequest);
          if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
            const responseToCache = networkResponse.clone ? networkResponse.clone() : networkResponse;
            const cache = await cachesObj.open(CACHE_NAME);
            cache.put(event.request, responseToCache);
          }
          return networkResponse;
        } catch (_err) {
          throw _err;
        }
      } else {
        // Network-First Strategy for API calls
        try {
          const networkResponse = await fetch(fetchRequest);
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone ? networkResponse.clone() : networkResponse;
            const cache = await cachesObj.open(CACHE_NAME);
            cache.put(event.request, responseToCache);
          }
          return networkResponse;
        } catch (_err) {
          const cachedResponse = await cachesObj.match(event.request);
          if (cachedResponse) {
            return cachedResponse;
          }
          // Ultimate fallback for API if not cached: return empty array so UI doesn't break
          return new Response(JSON.stringify([]), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          });
        }
      }
    })()
  );
}

function handleSync(event) {
  if (event.tag === 'aetheris-sync') {
    event.waitUntil(Promise.resolve());
  }
}

// In a real browser environment, we attach event listeners.
// In Node.js, these are undefined, so we guard against it.
if (typeof self !== 'undefined') {
  self.addEventListener('install', (event) => handleInstall(event));
  self.addEventListener('fetch', (event) => handleFetch(event));
  self.addEventListener('sync', (event) => handleSync(event));
}

// Export for Node.js testing environment
if (typeof module !== 'undefined') {
  module.exports = {
    handleInstall,
    handleFetch,
    handleSync
  };
}
