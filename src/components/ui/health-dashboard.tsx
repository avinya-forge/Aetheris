import React from 'react';

const HealthDashboard = ({ metrics = { latency: 0, signalToNoise: 0 } }: any) => {
  return (
    <div
      className="health-dashboard"
      style={{
        position: 'absolute',
        top: 20,
        right: 20,
        background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(12px)',
        padding: '15px 20px',
        borderRadius: '16px',
        color: 'white',
        fontSize: '0.8rem',
        border: '1px solid rgba(255,255,255,0.1)',
        zIndex: 100,
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        minWidth: '180px'
      }}
    >
      <div style={{
        fontWeight: 'bold',
        marginBottom: '12px',
        textTransform: 'uppercase',
        opacity: 0.6,
        fontSize: '0.65rem',
        letterSpacing: '1px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
      }}>
        <div style={{ width: '8px', height: '8px', background: '#00ff88', borderRadius: '50%', boxShadow: '0 0 8px #00ff88' }} />
        System Pulse
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span style={{ opacity: 0.7 }}>Latency</span>
          <span style={{ color: '#00d2ff', fontWeight: 'bold', fontFamily: 'monospace', fontSize: '0.9rem' }}>{metrics.latency}ms</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span style={{ opacity: 0.7 }}>Integrity</span>
          <span style={{ color: '#00d2ff', fontWeight: 'bold', fontFamily: 'monospace', fontSize: '0.9rem' }}>{metrics.signalToNoise}%</span>
        </div>
      </div>

      <div style={{
        marginTop: '12px',
        height: '2px',
        background: 'rgba(255,255,255,0.05)',
        position: 'relative',
        overflow: 'hidden'
      }}>
         <div style={{
           position: 'absolute',
           width: '40%',
           height: '100%',
           background: '#00d2ff',
           animation: 'pulse-line 2s infinite linear'
         }} />
      </div>

      <style>{`
        @keyframes pulse-line {
          0% { left: -40%; }
          100% { left: 100%; }
        }
      `}</style>
    </div>
  );
};

export { HealthDashboard };
