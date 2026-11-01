import React from 'react';

export const Atmosphere = ({ kpIndex }: { kpIndex: number }) => {
  if (kpIndex < 5) return null;

  const color = kpIndex >= 8 ? 'rgba(75, 0, 130, 0.4)' :
                kpIndex >= 6 ? 'rgba(138, 43, 226, 0.3)' :
                               'rgba(72, 61, 139, 0.2)';

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 5,
        transition: 'background 2s ease-in-out',
        background: `radial-gradient(circle at 50% 0%, ${color} 0%, transparent 70%)`
      }}
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="aurora-blur">
            <feGaussianBlur stdDeviation="20" />
          </filter>
        </defs>
        <rect width="100%" height="20%" fill={color} filter="url(#aurora-blur)" opacity="0.6" />
      </svg>
    </div>
  );
};
