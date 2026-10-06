import React from 'react';

export const DeveloperBio = () => {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 20,
        left: 20,
        background: 'rgba(10, 10, 12, 0.85)',
        backdropFilter: 'blur(12px)',
        padding: '15px 20px',
        borderRadius: '6px',
        color: 'white',
        fontSize: '0.8rem',
        border: '1px solid rgba(255,255,255,0.1)',
        zIndex: 100,
        maxWidth: '300px',
        fontFamily: 'system-ui, sans-serif'
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
        <div style={{ width: '8px', height: '8px', background: '#00d2ff', borderRadius: '50%' }} />
        Developer Presence
      </div>

      <p style={{ margin: '0 0 16px 0', fontSize: '0.85rem', lineHeight: '1.4', opacity: 0.8 }}>
        Aetheris is an AI-driven, strictly text-only real-time global-to-local intelligence sentinel dashboard designed to eliminate information fatigue.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#00d2ff',
            textDecoration: 'none',
            fontSize: '0.8rem',
            fontWeight: 'bold'
          }}
        >
          LinkedIn Profile
        </a>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#00ff88',
            textDecoration: 'none',
            fontSize: '0.8rem',
            fontWeight: 'bold'
          }}
        >
          Resume / CV
        </a>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#aaa',
            textDecoration: 'none',
            fontSize: '0.8rem',
            fontWeight: 'bold'
          }}
        >
          GitHub Repository
        </a>
      </div>
    </div>
  );
};
