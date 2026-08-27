import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { Atlas } from './components/map/atlas';
import { HealthDashboard } from './components/ui/health-dashboard';
import { CommandPalette } from './components/ui/command-palette';
import { InviteGate } from './components/ui/invite-gate';
import { fetchEvents } from './lib/events-service';
import { getGhostCards } from './lib/ghost-card-service';
import { useTemporalStore } from './lib/store';

const App = () => {
  const [events, setEvents] = useState([]);
  const [ghostCards, setGhostCards] = useState([]);
  const [kpIndex, setKpIndex] = useState(0);
  const [category, setCategory] = useState('all');
  const [metrics, setMetrics] = useState({ latency: 0, signalToNoise: 0 });
  const { focus, updateFocus } = useTemporalStore();
  const refreshInterval = useRef(null);

  const loadData = async () => {
    try {
      const startTime = Date.now();

      const filters = {};
      if (focus === 'past') {
        // For the demo, "Past" shows yesterday's archived data
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
        filters.date = yesterday;
      }

      const [evts, cards] = await Promise.all([
        fetchEvents(filters),
        getGhostCards()
      ]);

      setEvents(evts);
      setGhostCards(cards);

      const latency = Date.now() - startTime;
      const noise = evts.length > 0 ? Math.round((evts.filter(e => (e.impactScore || 0) >= 50).length / evts.length) * 100) : 100;

      setMetrics({
        latency,
        signalToNoise: noise
      });
    } catch (err) {
      console.error('Data load error:', err);
    }
  };

  useEffect(() => {
    loadData();
    refreshInterval.current = setInterval(loadData, 60000);
    const kpTimer = setInterval(() => setKpIndex(prev => (prev + 1) % 9), 15000);
    return () => {
      clearInterval(refreshInterval.current);
      clearInterval(kpTimer);
    };
  }, [focus]); // Trigger reload when switching between Past/Present/Horizon

  const filteredEvents = category === 'all'
    ? events
    : events.filter(e => e.category === category || e.type === category || e.topic === category);

  return (
    <InviteGate>
      <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', margin: 0, padding: 0 }}>
        <Atlas
          events={filteredEvents}
          ghostCards={ghostCards}
          kpIndex={kpIndex}
          focus={focus}
          onFocusChange={updateFocus}
        />
        <HealthDashboard
          metrics={metrics}
          activeCategory={category}
          onCategoryChange={setCategory}
        />
        <CommandPalette />
      </div>
    </InviteGate>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
