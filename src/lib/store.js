import { useState, useCallback } from 'react';

/**
 * Global State Hook for Temporal Focus.
 */
export function useTemporalStore() {
  const [focus, setFocus] = useState('present'); // past | present | horizon

  const updateFocus = useCallback((newFocus) => {
    setFocus(newFocus);
  }, []);

  return { focus, updateFocus };
}
