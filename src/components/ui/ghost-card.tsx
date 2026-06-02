import React from 'react';

const GhostCard = ({ event = { title: undefined, likelihood: undefined, interpolated: undefined } }) => {
  const { title = 'Unknown Event', likelihood = 0.5, interpolated = false } = event;
  return (
    <div
      className="ghost-card"
      style={{
        opacity: Math.max(0.3, likelihood),
        background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(0,0,0,0.4))',
        backdropFilter: 'blur(5px)',
        border: '1px solid rgba(0,210,255,0.3)',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)',
        padding: '12px',
        borderRadius: '8px',
        color: 'white',
        width: '180px',
        fontSize: '0.9rem',
        transition: 'transform 0.3s ease',
        cursor: 'pointer',
        position: 'relative'
      }}
      onMouseEnter={e => e.currentTarget.style.transform = 'translateX(10px)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'translateX(0)'}
    >
      {interpolated && (
        <span style={{
          position: 'absolute', top: '4px', right: '4px', background: '#ff4b2b', color: '#fff', fontSize: '0.6rem', padding: '2px 4px', borderRadius: '4px', fontWeight: 'bold'
        }}>
          Estimated
        </span>
      )}
      <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', opacity: 0.6, marginBottom: '4px' }}>
        Speculative Impact
      </div>
      <div style={{ fontWeight: 'bold' }}>{title}</div>
      <div style={{ marginTop: '8px', width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
        <div style={{ width: `${likelihood * 100}%`, height: '100%', background: '#00d2ff', borderRadius: '2px' }} />
      </div>
    </div>
  );
};

export { GhostCard };
