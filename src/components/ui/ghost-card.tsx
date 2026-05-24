import React from 'react';

/**
 * GhostCard Component
 * Displays speculative/forecast events with reduced opacity.
 */
const GhostCard = ({ event }) => {
  const { title, likelihood = 0.5 } = event;
  return (
    <div
      className="ghost-card"
      role="article"
      aria-label={`Ghost Card for ${title}`}
      tabIndex={0}
      style={{ opacity: likelihood, border: '1px dashed #ccc', padding: '10px' }}
    >
      <h3>{title}</h3>
      <p>Likelihood: {(likelihood * 100).toFixed(0)}%</p>
    </div>
  );
};

export { GhostCard };
