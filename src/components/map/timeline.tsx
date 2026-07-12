import React, { useState } from 'react';

const Timeline = ({ events = [], focus = 'present', onFocusChange = ( _f: string) => {}, mockSelectedIndex = null }: any) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(mockSelectedIndex);

  const tiers = [
    { id: 'past', label: 'History', offset: '15%' },
    { id: 'present', label: 'Pulse', offset: '50%' },
    { id: 'horizon', label: 'Horizon', offset: '85%' }
  ];

  return (
    <div
      className="timeline-container"
      aria-label="Event Timeline"
      style={{
        position: 'absolute',
        bottom: 30,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '85%',
        maxWidth: '900px',
        height: '90px',
        background: 'rgba(10,10,10,0.6)',
        backdropFilter: 'blur(20px)',
        borderRadius: '45px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 60px',
        boxSizing: 'border-box',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 15px 45px rgba(0,0,0,0.6)',
        zIndex: 100,
        transition: 'all 0.5s ease'
      }}
    >
      <div style={{
        position: 'relative',
        width: '100%',
        height: '2px',
        background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%)',
        borderRadius: '1px'
      }}>
        {/* Tier Markers */}
        {tiers.map(tier => {
          const isActive = focus === tier.id;
          return (
            <div
              key={tier.id}
              onClick={() => onFocusChange(tier.id)}
              style={{
                position: 'absolute',
                left: tier.offset,
                top: '-15px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transform: 'translateX(-50%)',
                zIndex: 10
              }}
            >
              <div style={{
                width: isActive ? '3px' : '1px',
                height: isActive ? '32px' : '24px',
                background: isActive ? '#00d2ff' : 'rgba(255,255,255,0.2)',
                borderRadius: '2px',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                boxShadow: isActive ? '0 0 15px rgba(0,210,255,0.6)' : 'none'
              }} />
              <span style={{
                fontSize: '0.65rem',
                color: isActive ? '#fff' : 'rgba(255,255,255,0.4)',
                marginTop: '8px',
                fontWeight: isActive ? 800 : 500,
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                transition: 'all 0.4s ease'
              }}>{tier.label}</span>
            </div>
          );
        })}

        {/* Date Selector for History Tier */}
        <div
           style={{
             position: 'absolute',
             left: '15%',
             top: '30px',
             transform: 'translateX(-50%)',
             opacity: focus === 'past' ? 1 : 0,
             pointerEvents: focus === 'past' ? 'auto' : 'none',
             transition: 'opacity 0.4s ease',
             zIndex: 20
           }}
           data-testid="history-date-picker-container"
        >
           <input
              type="date"
              data-testid="history-date-picker"
              onChange={(e) => onFocusChange(`past:${e.target.value}`)}
              style={{
                background: 'rgba(0,0,0,0.5)',
                color: '#00d2ff',
                border: '1px solid rgba(0, 210, 255, 0.3)',
                borderRadius: '4px',
                padding: '4px 8px',
                fontSize: '0.7rem',
                outline: 'none',
                cursor: 'pointer',
                fontFamily: 'monospace'
              }}
           />
        </div>

        {/* Event Nodes - Distributed by focus tier */}
        {events.map((event: any, i: number) => {
           let left = '50%';
           if (event.type === 'space-weather' || event.interpolated) {
              left = `${70 + (i % 20)}\%`;
           } else {
              left = `${20 + (i % 40)}\%`;
           }

           const isSelected = selectedIndex === i;
           return (
            <div
              key={i}
              className="timeline-event-node"
              onClick={() => setSelectedIndex(i)}
              style={{
                position: 'absolute',
                left: left,
                top: '50%',
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: isSelected ? '#00d2ff' : 'rgba(255,255,255,0.4)',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                transform: `translate(-50%, -50%) ${isSelected ? 'scale(2.5)' : 'scale(1)'}`,
                boxShadow: isSelected ? '0 0 15px #00d2ff' : 'none',
                opacity: isSelected ? 1 : 0.6
              }}
              title={event.title}
            />
          );
        })}
      </div>

      {selectedIndex !== null && events[selectedIndex] && (
        <div
          className="timeline-tooltip"
          style={{
            position: 'absolute',
            top: '-55px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(255,255,255,0.95)',
            padding: '6px 18px',
            borderRadius: '20px',
            color: '#111',
            fontSize: '0.75rem',
            fontWeight: 800,
            whiteSpace: 'nowrap',
            boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
            animation: 'slide-up 0.3s ease-out'
          }}
        >
          {events[selectedIndex].title.toUpperCase()}
        </div>
      )}

      <style>{`
        @keyframes slide-up {
          from { transform: translate(-50%, 10px); opacity: 0; }
          to { transform: translate(-50%, 0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export { Timeline };
