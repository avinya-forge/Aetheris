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
      this.putMap.set(request.url || request, response);
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
      if (request.url === 'http://localhost/') {
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
    // Test Fetch Handler - Network Success (Should cache)
    const fetchEventNetworkSuccess: any = {
      request: { url: 'http://localhost/network-first' },
      respondWith(promise: any) {
        this.promise = promise;
      }
    };

    global.fetch = ((_req: any) => {
      return Promise.resolve({
        status: 200,
        type: 'basic',
        body: `Fetched from network: ${_req.url}`,
        clone() { return this; }
      }) as any;
    }) as any;

    handleFetch(fetchEventNetworkSuccess, mockCaches);
    fetchEventNetworkSuccess.promise.then(response => {
      assert.strictEqual(response.status, 200, 'Should return fetched response');
      assert.strictEqual(response.body, 'Fetched from network: http://localhost/network-first', 'Should return fetched data');

      setTimeout(() => {
        assert.strictEqual(mockCache.putMap.has('http://localhost/network-first'), true, 'Should cache new fetched data effectively');
        runFetchFallbackTest();
      }, 50);
    }).catch(err => {
      console.error('Fetch handler network success test failed:', err);
      process.exit(1);
    });
  }

  function runFetchFallbackTest() {
    // Test Fetch Handler - Network Failure Fallback to Cache
    const fetchEventFallback: any = {
      request: { url: 'http://localhost/' },
      respondWith(promise: any) {
        this.promise = promise;
      }
    };

    global.fetch = ((_req: any) => {
      return Promise.reject(new Error('Network offline'));
    }) as any;

    handleFetch(fetchEventFallback, mockCaches);
    fetchEventFallback.promise.then(response => {
      assert.strictEqual(mockCaches.matchedRequest.url, 'http://localhost/', 'Should attempt to match the request in cache after failure');
      assert.strictEqual(response.status, 200, 'Should return cached response on network fallback');
      assert.strictEqual(response.body, 'Cached Data', 'Should return correct cached data');

      runApiFetchTest();
    }).catch(err => {
      console.error('Fetch handler fallback test failed:', err);
      process.exit(1);
    });
  }


  function runApiFetchTest() {
    const fetchEventApi: any = {
      request: { url: 'http://localhost/api/markets' },
      respondWith(promise: any) { this.promise = promise; }
    };
    global.fetch = (() => Promise.resolve({ status: 200, type: 'basic', clone: function() { return this; } })) as any;
    handleFetch(fetchEventApi, mockCaches);
    fetchEventApi.promise.then(() => {
        runApiFallbackCacheTest();
    });
  }


  function runApiFallbackCacheTest() {
    const fetchEventApiFallCache: any = {
      request: { url: 'http://localhost/api/markets-cache' },
      respondWith(promise: any) { this.promise = promise; }
    };
    mockCaches.match = (req) => {
        if (req.url === 'http://localhost/api/markets-cache') return Promise.resolve({status: 200, body: 'cached api'});
        return Promise.resolve(null);
    };
    global.fetch = (() => Promise.reject(new Error('off'))) as any;
    handleFetch(fetchEventApiFallCache, mockCaches);
    fetchEventApiFallCache.promise.then(res => {
        assert.strictEqual(res.body, 'cached api');
        runApiFallbackTest();
    });
  }

  function runApiFallbackTest() {
    const fetchEventApiFall: any = {
      request: { url: 'http://localhost/api/markets2' },
      respondWith(promise: any) { this.promise = promise; }
    };
    global.fetch = (() => Promise.reject(new Error('off'))) as any;
    handleFetch(fetchEventApiFall, mockCaches);
    fetchEventApiFall.promise.then(res => {
        assert.strictEqual(res.status, 200);
        runFetchMissTest();
    });
  }

  function runFetchMissTest() {
    // Test Fetch Handler - Network Failure & Cache Miss
    const fetchEventMiss: any = {
      request: { url: 'http://localhost/missing' },
      respondWith(promise: any) {
        this.promise = promise;
      }
    };

    global.fetch = ((_req: any) => {
      return Promise.reject(new Error('Network completely offline'));
    }) as any;

    handleFetch(fetchEventMiss, mockCaches);
    fetchEventMiss.promise.catch(err => {
      assert.strictEqual(err.message, 'Network completely offline', 'Should propagate error if both network and cache fail');
      delete global.fetch;
      console.log('PASS - sw.test.js');
    });
  }
}


  let addedEvents = [];
  global.self = {
      addEventListener: (type) => addedEvents.push(type)
  } as any;
  // re-require to execute global scope with self defined
  delete require.cache[require.resolve('../script/sw.js')];
  require('../script/sw.js');
  assert.ok(addedEvents.includes('install'));
  assert.ok(addedEvents.includes('fetch'));

  testServiceWorker();


export {};
