export class AISStreamClient {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.ws = null;
    this.subscribers = new Set();
  }

  connect(boundingBox = [[-90, -180], [90, 180]]) {
    if (this.ws) return;

    // Wait, in Node/browser, WebSocket is global
    if (typeof WebSocket === 'undefined') return;

    this.ws = new WebSocket('wss://stream.aisstream.io/v0/stream');

    this.ws.onopen = () => {
      const subscriptionMessage = {
        Apikey: this.apiKey,
        BoundingBoxes: [boundingBox],
        FiltersShipMMSI: [], // Option to filter
        FilterMessageTypes: ['PositionReport']
      };
      this.ws.send(JSON.stringify(subscriptionMessage));
    };

    this.ws.onmessage = (event) => {
      try {
        const aisMessage = JSON.parse(event.data);
        if (aisMessage.MessageType === 'PositionReport') {
          const { Message } = aisMessage;
          const pos = Message.PositionReport;
          const mappedEvent = {
            id: `vessel-${pos.UserID}`,
            type: 'vessel',
            lng: pos.Longitude,
            lat: pos.Latitude,
            title: `Vessel MMSI ${pos.UserID}`,
            impactScore: 10 + Math.random() * 10,
            timestamp: Date.now()
          };
          this.subscribers.forEach(cb => cb(mappedEvent));
        }
      } catch (_e) {
        return; // Ignore parsing errors
      }
    };
  }

  subscribe(callback) {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}
