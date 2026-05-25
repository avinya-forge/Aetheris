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
  event.respondWith(
    cachesObj.match(event.request).then((response) => {
      // Cache hit - return response
      if (response) {
        return response;
      }

      const fetchRequest = event.request.clone ? event.request.clone() : event.request;

      return fetch(fetchRequest).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }

        const responseToCache = networkResponse.clone ? networkResponse.clone() : networkResponse;

        cachesObj.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return networkResponse;
      });
    })
  );
}

// In a real browser environment, we attach event listeners.
// In Node.js, these are undefined, so we guard against it.
if (typeof self !== 'undefined') {
  self.addEventListener('install', (event) => handleInstall(event));
  self.addEventListener('fetch', (event) => handleFetch(event));
}

// Export for Node.js testing environment
if (typeof module !== 'undefined') {
  module.exports = {
    handleInstall,
    handleFetch
  };
}
