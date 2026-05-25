import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Atlas } from './components/map/atlas';
import { fetchEvents } from './lib/events-service';
import { getGhostCards } from './lib/ghost-card-service';

const App = () => {
  const [events, setEvents] = useState([]);
  const [ghostCards, setGhostCards] = useState([]);
  const [kpIndex, setKpIndex] = useState(0);

  useEffect(() => {
    setEvents(fetchEvents());
    setGhostCards(getGhostCards());

    // Simulate real-time Kp shift for interactivity demo
    const interval = setInterval(() => {
      setKpIndex(prev => (prev + 1) % 9);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', margin: 0, padding: 0 }}>
      <Atlas events={events} ghostCards={ghostCards} kpIndex={kpIndex} />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
