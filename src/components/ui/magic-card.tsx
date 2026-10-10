import React from 'react';

// Mock component simulating a premium 21st.dev MCP fetch
export const MagicCard = ({ title, description, glowColor = '#00d2ff' }: any) => {
  return (
    <div
      data-testid="magic-card"
      className="glass-panel"
      style={{
        position: 'relative',
        padding: '24px',
        borderRadius: '12px',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        width: '100%',
        maxWidth: '300px'
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
        const glow = e.currentTarget.querySelector('.magic-glow') as HTMLElement;
        if (glow) glow.style.opacity = '1';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        const glow = e.currentTarget.querySelector('.magic-glow') as HTMLElement;
        if (glow) glow.style.opacity = '0';
      }}
    >
      <div
        className="magic-glow"
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at 50% 0%, ${glowColor}40, transparent 70%)`,
          opacity: 0,
          transition: 'opacity 0.4s ease',
          pointerEvents: 'none'
        }}
      />
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, height: '1px',
        background: `linear-gradient(90deg, transparent, ${glowColor}, transparent)`,
        opacity: 0.5
      }} />

      <h3 style={{ margin: '0 0 8px 0', fontSize: '1.2rem', color: '#fff' }}>{title}</h3>
      <p style={{ margin: 0, fontSize: '0.85rem', color: '#aaa', lineHeight: 1.5 }}>
        {description}
      </p>
    </div>
  );
};
