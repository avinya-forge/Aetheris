import React, { useState } from 'react';

const Timeline = ({ events = [], focus = 'present', onFocusChange = ( _f: string) => {}, mockSelectedIndex = null }: any) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(mockSelectedIndex);

  const tiers = [
    { id: 'past', label: 'Past', offset: '10%' },
    { id: 'present', label: 'Present', offset: '50%' },
    { id: 'horizon', label: 'Horizon', offset: '90%' }
  ];

  return (
    <div
      className="timeline-container"
      aria-label="Event Timeline"
      style={{
        position: 'absolute',
        bottom: 20,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '90%',
        maxWidth: '800px',
        height: '80px',
        background: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(10px)',
        borderRadius: '40px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 40px',
        boxSizing: 'border-box',
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
        zIndex: 100
      }}
    >
      <div style={{
        position: 'relative',
        width: '100%',
        height: '4px',
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '2px'
      }}>
        {/* Tier Markers */}
        {tiers.map(tier => (
          <div
            key={tier.id}
            onClick={() => onFocusChange(tier.id)}
            style={{
              position: 'absolute',
              left: tier.offset,
              top: '-10px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transform: 'translateX(-50%)'
            }}
          >
            <div style={{
              width: '4px',
              height: '24px',
              background: focus === tier.id ? '#00d2ff' : 'rgba(255,255,255,0.3)',
              borderRadius: '2px',
              transition: 'all 0.3s ease'
            }} />
            <span style={{
              fontSize: '0.6rem',
              color: focus === tier.id ? '#00d2ff' : 'rgba(255,255,255,0.5)',
              marginTop: '4px',
              fontWeight: 'bold',
              textTransform: 'uppercase'
            }}>{tier.label}</span>
          </div>
        ))}

        {/* Event Nodes */}
        {events.map((event: any, i: number) => {
           // Distribute events between markers for now
           const left = 10 + (i * 80 / (events.length || 1));
           return (
            <div
              key={i}
              className="timeline-event-node"
              onClick={() => setSelectedIndex(i)}
              style={{
                position: 'absolute',
                left: `${left}%`,
                top: '50%',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: selectedIndex === i ? '#00d2ff' : 'white',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                transform: `translate(-50%, -50%) ${selectedIndex === i ? 'scale(1.5)' : 'scale(1)'}`,
                boxShadow: selectedIndex === i ? '0 0 10px #00d2ff' : 'none'
              }}
              title={event.title}
              aria-label={`Event: ${event.title}`}
            />
          );
        })}
      </div>

      {selectedIndex !== null && events[selectedIndex] && (
        <div
          className="timeline-tooltip"
          style={{
            position: 'absolute',
            top: '-50px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'white',
            padding: '5px 15px',
            borderRadius: '5px',
            color: 'black',
            fontSize: '0.8rem',
            fontWeight: 'bold',
            whiteSpace: 'nowrap'
          }}
        >
          {events[selectedIndex].title}
        </div>
      )}
    </div>
  );
};

export { Timeline };
