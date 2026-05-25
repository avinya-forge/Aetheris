import React from 'react';

/**
 * Timeline Component
 * Temporal traversal UI for the Kinetic Atlas.
 */
const Timeline = ({ events = [] }) => {
  return (
    <div className="timeline-container"
      aria-label="Event Timeline"
      role="region"
      tabIndex={0}
      style={{ position: 'absolute', bottom: 0, width: '100%', height: '100px', background: 'rgba(0,0,0,0.5)' }}>
      <div className="timeline-track">
        {events.map((event, i) => (
          <div key={i} className="timeline-marker" title={event.title} aria-label={`Event: ${event.title}`} tabIndex={0} role="button"></div>
        ))}
      </div>
    </div>
  );
};

export { Timeline };
