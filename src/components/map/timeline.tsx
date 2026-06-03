import React, { useState } from 'react';

const Timeline = ({ events = [], mockSelectedIndex = null }: any) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(mockSelectedIndex);

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
        alignItems: 'center',
        padding: '0 20px',
        boxSizing: 'border-box',
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
      }}
    >
      <div style={{
        position: 'relative',
        width: '100%',
        height: '2px',
        background: 'rgba(255,255,255,0.2)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {events.map((event: any, i: number) => (
          <div
            key={i}
            className="timeline-event-node"
            onClick={() => setSelectedIndex(i)}
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: selectedIndex === i ? '#00d2ff' : 'white',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              transform: selectedIndex === i ? 'scale(1.5)' : 'scale(1)',
              boxShadow: selectedIndex === i ? '0 0 10px #00d2ff' : 'none'
            }}
            title={event.title}
            aria-label={`Event: ${event.title}`}
          />
        ))}
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
