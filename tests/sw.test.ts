import assert from 'assert';
const { handleInstall, handleFetch } = require('../script/sw.js');

function testServiceWorker() {

  // Mock Cache API
  const mockCache = {
    addedUrls: [],
    putMap: new Map(),
    addAll(urls) {
      this.addedUrls.push(...urls);
      return Promise.resolve();
    },
    put(request, response) {
      this.putMap.set(request, response);
      return Promise.resolve();
    }
  };

  const mockCaches = {
    openedCacheName: null,
    matchedRequest: null,
    open(cacheName) {
      this.openedCacheName = cacheName;
      return Promise.resolve(mockCache);
    },
    match(request) {
      this.matchedRequest = request;
      // Simulate cache hit if request is '/'
      if (request === '/') {
        return Promise.resolve({ status: 200, body: 'Cached Data' });
      }
      return Promise.resolve(null);
    }
  };

  // Test Install Handler
  const installEvent: any = {
    waitUntil(promise: any) {
      this.promise = promise;
    }
  };

  handleInstall(installEvent, mockCaches);

  installEvent.promise.then(() => {
    assert.strictEqual(mockCaches.openedCacheName, 'aetheris-v1', 'Should open cache named aetheris-v1');
    assert.deepStrictEqual(mockCache.addedUrls, ['/', '/index.html', '/src/assets/glyphs/index.svg'], 'Should cache root URL');

    runFetchHitTest();
  }).catch(err => {
    console.error('Install handler test failed:', err);
    process.exit(1);
  });

  function runFetchHitTest() {
    // Test Fetch Handler (Cache Hit)
    const fetchEventHit: any = {
      request: '/',
      respondWith(promise: any) {
        this.promise = promise;
      }
    };

    handleFetch(fetchEventHit, mockCaches);
    fetchEventHit.promise.then(response => {
      assert.strictEqual(mockCaches.matchedRequest, '/', 'Should attempt to match the request in cache');
      assert.strictEqual(response.status, 200, 'Should return cached response on hit');
      assert.strictEqual(response.body, 'Cached Data', 'Should return correct cached data');

      runFetchMissTest();
    }).catch(err => {
      console.error('Fetch handler (hit) test failed:', err);
      process.exit(1);
    });
  }

  function runFetchMissTest() {
    // Test Fetch Handler (Cache Miss)
    const fetchEventMiss: any = {
      request: '/missing',
      respondWith(promise: any) {
        this.promise = promise;
      }
    };

    // Mock global fetch for miss scenario
    global.fetch = ((req: any) => {
      return Promise.resolve({
        status: 200,
        type: 'basic',
        body: `Fetched from network: ${req}`,
        clone() { return this; }
      }) as any;
    }) as any;

    handleFetch(fetchEventMiss, mockCaches);
    fetchEventMiss.promise.then(response => {
      assert.strictEqual(mockCaches.matchedRequest, '/missing', 'Should attempt to match the request in cache');
      assert.strictEqual(response.status, 200, 'Should return fetched response on miss');
      assert.strictEqual(response.body, 'Fetched from network: /missing', 'Should return fetched data');

      // Delay briefly to allow asynchronous cache.put to execute
      setTimeout(() => {
        try {
          assert.strictEqual(mockCache.putMap.has('/missing', 'sw.test.ts: strictEqual failure'), true, 'Should cache new fetched data effectively');
          // Clean up mock fetch
          delete global.fetch;
          console.log('PASS - sw.test.js');
        } catch (e: any) {
          console.error('Fetch handler (miss) cache.put test failed:', e);
          process.exit(1);
        }
      }, 50);

    }).catch(err => {
      console.error('Fetch handler (miss) test failed:', err);
      delete global.fetch;
      process.exit(1);
    });
  }
}

testServiceWorker();

export {};
