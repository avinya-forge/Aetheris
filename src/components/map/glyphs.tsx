import React from 'react';

const Glyph = ({ type, color }: { type: string, color: string }) => {
  const getPaths = () => {
    switch (type) {
      case 'space-weather':
      case 'aurora':
        return (
          <>
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
          </>
        );
      case 'macro-cluster':
        return (
          <>
            <circle cx="12" cy="12" r="10" strokeDasharray="4 4" />
          </>
        );
      case 'weather':
      case 'heatwave':
      case 'regional':
        return (
          <>
            <path d="M17.5 19a3.5 3.5 0 1 1-5.83-2.67 3.5 3.5 0 1 1-5.83-2.67 3.5 3.5 0 1 1 5.83-2.67 3.5 3.5 0 1 1 5.83 2.67Z" />
            <path d="m12 13-1-1m1 1 1-1" />
          </>
        );
      case 'news':
      case 'trade':
      case 'legislative':
        return (
          <>
            <path d="M4 4h16v16H4zM8 8h8M8 12h8M8 16h5" />
          </>
        );
      case 'vessel':
        return (
          <>
            <path d="M2 12h20l-3 7H5zM12 12V3m-4 5h8" />
          </>
        );
      case 'cable':
        return (
          <>
            <path d="M4 12q4 -8 8 0 t8 0" />
          </>
        );
      case 'resilience':
        return (
          <>
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </>
        );
      case 'datacenter':
        return (
          <>
            <rect x="4" y="2" width="16" height="20" rx="2" />
            <path d="M4 8h16M4 16h16M8 5h2M8 12h2M8 19h2" />
          </>
        );
      case 'jamming':
        return (
          <>
            <circle cx="12" cy="12" r="10" />
            <path d="M8 8l8 8M16 8l-8 8" />
          </>
        );
      case 'satellite':
        return (
          <>
            <path d="M12 2v20M2 12h20M12 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
          </>
        );
      default:
        return (
          <>
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8v4l3 2" />
          </>
        );
    }
  };

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%' }}>
      {getPaths()}
    </svg>
  );
};

export { Glyph };

export const ClusterBadge = ({ count }: { count: number }) => (
  <div style={{
    background: 'rgba(255, 75, 43, 0.9)',
    color: 'white',
    borderRadius: '12px',
    padding: '2px 8px',
    fontSize: '0.75rem',
    fontWeight: 'bold',
    border: '1px solid rgba(255,255,255,0.3)',
    boxShadow: '0 0 10px rgba(255, 75, 43, 0.5)'
  }}>
    {count}
  </div>
);
