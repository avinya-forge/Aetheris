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
        backdropFilter: 'blur(10px)',
        padding: '15px',
        borderRadius: '12px',
        color: 'white',
        fontSize: '0.8rem',
        border: '1px solid rgba(255,255,255,0.1)',
        zIndex: 100
      }}
    >
      <div style={{ fontWeight: 'bold', marginBottom: '10px', textTransform: 'uppercase', opacity: 0.8 }}>System Health</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
          <span>Ingest Latency</span>
          <span style={{ color: '#00d2ff' }}>{metrics.latency}ms</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
          <span>Signal/Noise</span>
          <span style={{ color: '#00d2ff' }}>{metrics.signalToNoise}%</span>
        </div>
      </div>
    </div>
  );
};

export { HealthDashboard };
