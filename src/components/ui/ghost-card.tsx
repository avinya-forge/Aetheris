import React from 'react';

const GhostCard = ({ event = {} }: any) => {
  const { title = 'Unknown Event', likelihood = 0.5, interpolated = false } = event;
  const percentage = Math.round(likelihood * 100);

  return (
    <div
      className="ghost-card"
      style={{
        opacity: Math.max(0.4, likelihood),
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.1)',
        padding: '12px',
        borderRadius: '12px',
        color: 'white',
        width: '200px',
        fontSize: '0.9rem',
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        cursor: 'pointer',
        position: 'relative',
        boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateX(10px) scale(1.02)';
        e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateX(0) scale(1)';
        e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
      }}
    >
      {interpolated && (
        <span style={{
          position: 'absolute', top: '-8px', right: '10px', background: '#ff4b2b', color: '#fff', fontSize: '0.55rem', padding: '2px 6px', borderRadius: '10px', fontWeight: 'bold', textTransform: 'uppercase', boxShadow: '0 2px 5px rgba(255,75,43,0.3)'
        }}>
          Estimated
        </span>
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
        <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', opacity: 0.5, letterSpacing: '0.5px' }}>
          Horizon Pattern
        </div>
        <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#00d2ff' }}>
          {percentage}%
        </div>
      </div>
      <div style={{ fontWeight: 'bold', letterSpacing: '-0.2px' }}>{title}</div>
      <div style={{ marginTop: '10px', width: '100%', height: '3px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px', overflow: 'hidden' }}>
        <div style={{ width: `${percentage}%`, height: '100%', background: 'linear-gradient(90deg, #00d2ff, #3a7bd5)', borderRadius: '2px' }} />
      </div>
    </div>
  );
};

export { GhostCard };
