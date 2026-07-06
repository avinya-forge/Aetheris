import assert from 'assert';
import { AISStreamClient } from '../src/lib/ais-stream';
import { propagateSGP4, generateInitialSatellites } from '../src/lib/sgp4';

function testAisStream() {
  console.log('Testing ais-stream...');

  // Mock WebSocket
  let sentData = null;
  globalThis.WebSocket = class MockWS {
    onopen: any;
    onmessage: any;
    constructor(url: string) {
      assert.strictEqual(url, 'wss://stream.aisstream.io/v0/stream');
      setTimeout(() => this.onopen && this.onopen(), 10);
    }
    send(data: string) {
      sentData = JSON.parse(data);
    }
    close() {}
  } as any;

  const client = new AISStreamClient('test-key');
  client.connect();
  client.connect(); // Should ignore second connect

  const unsubscribe = client.subscribe((event: any) => {
    assert.strictEqual(event.type, 'vessel');
    assert.strictEqual(event.id, 'vessel-12345');
  });

  setTimeout(() => {
    assert.ok(sentData);
    assert.strictEqual(sentData.Apikey, 'test-key');

    // Trigger message
    if (client.ws && client.ws.onmessage) {
      client.ws.onmessage({
        data: JSON.stringify({
          MessageType: 'PositionReport',
          Message: {
            PositionReport: {
              UserID: 12345,
              Longitude: -10,
              Latitude: 20
            }
          }
        })
      });

      // Ignore malformed
      client.ws.onmessage({ data: '{' });
    }

    unsubscribe();
    client.disconnect();
    client.disconnect(); // Ignore second disconnect
    delete (globalThis as any).WebSocket;
    console.log('PASS - ais-stream.test.ts');
  }, 50);
}

function testSgp4() {
  console.log('Testing sgp4...');
  // Force coverage of default inclinations
  const minimalSat = [{ id: 'test' }];
  const propagatedMin = propagateSGP4(minimalSat, 0);
  assert.strictEqual(propagatedMin[0].lat, 0);

  const initial = generateInitialSatellites(5);
  assert.strictEqual(initial.length, 5);
  assert.strictEqual(initial[0].type, 'satellite');

  const propagated = propagateSGP4(initial, Date.now());
  assert.strictEqual(propagated.length, 5);
  assert.ok(propagated[0].lng >= -180 && propagated[0].lng <= 180);
  assert.ok(propagated[0].lat >= -90 && propagated[0].lat <= 90);

  console.log('PASS - sgp4.test.ts');
}

try {
  testAisStream();
  testSgp4();
} catch (e: any) {
  console.error('Test failed:', e.message);
  process.exit(1);
}
