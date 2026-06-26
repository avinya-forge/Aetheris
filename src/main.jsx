import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Atlas } from './components/map/atlas';
import { HealthDashboard } from './components/ui/health-dashboard';
import { fetchEvents } from './lib/events-service';
import { getGhostCards } from './lib/ghost-card-service';
import { useTemporalStore } from './lib/store';

const App = () => {
  const [events, setEvents] = useState([]);
  const [ghostCards, setGhostCards] = useState([]);
  const [kpIndex, setKpIndex] = useState(0);
  const { focus, updateFocus } = useTemporalStore();

  useEffect(() => {
    const loadInitialData = async () => {
      const evts = await fetchEvents();
      const cards = await getGhostCards();
      setEvents(evts);
      setGhostCards(cards);
    };

    loadInitialData();

    // Simulate real-time Kp shift for interactivity demo
    const interval = setInterval(() => {
      setKpIndex(prev => (prev + 1) % 9);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', margin: 0, padding: 0 }}>
      <Atlas
        events={events}
        ghostCards={ghostCards}
        kpIndex={kpIndex}
        focus={focus}
        onFocusChange={updateFocus}
      />
      <HealthDashboard metrics={{ latency: 145, signalToNoise: 92 }} />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
