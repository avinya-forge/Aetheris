import React from 'react';

const GhostCard = ({ event = {} }: any) => {
  const { title = 'Unknown Event', likelihood = 0.5, interpolated = false } = event;
  const percentage = Math.round(likelihood * 100);

  return (
    <div
      className="ghost-card"
      style={{
        opacity: Math.max(0.6, likelihood),
        background: 'rgba(20, 20, 20, 0.4)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.08)',
        padding: '14px 16px',
        borderRadius: '16px',
        color: 'white',
        width: '220px',
        fontSize: '0.9rem',
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        cursor: 'pointer',
        position: 'relative',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
        overflow: 'hidden'
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateX(12px) scale(1.02)';
        e.currentTarget.style.background = 'rgba(40, 40, 40, 0.6)';
        e.currentTarget.style.borderColor = 'rgba(0, 210, 255, 0.4)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateX(0) scale(1)';
        e.currentTarget.style.background = 'rgba(20, 20, 20, 0.4)';
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
      }}
    >
      {interpolated && (
        <span style={{
          position: 'absolute', top: '0', right: '0', background: 'linear-gradient(135deg, #ff4b2b, #ffb400)', color: '#fff', fontSize: '0.5rem', padding: '2px 8px', borderRadius: '0 0 0 10px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px'
        }}>
          Estimated
        </span>
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <div style={{ fontSize: '0.6rem', textTransform: 'uppercase', opacity: 0.4, letterSpacing: '1px', fontWeight: 600 }}>
          Horizon Pattern
        </div>
        <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#00d2ff', fontFamily: 'monospace' }}>
          {percentage}%
        </div>
      </div>
      <div style={{ fontWeight: 700, letterSpacing: '-0.3px', fontSize: '0.95rem', lineHeight: '1.2' }}>{title}</div>
      <div style={{ marginTop: '12px', width: '100%', height: '2px', background: 'rgba(255,255,255,0.05)', borderRadius: '1px', overflow: 'hidden' }}>
        <div style={{ width: `${percentage}%`, height: '100%', background: 'linear-gradient(90deg, #00d2ff, #3a7bd5)', borderRadius: '1px', transition: 'width 1s ease-in-out' }} />
      </div>
    </div>
  );
};

export { GhostCard };
