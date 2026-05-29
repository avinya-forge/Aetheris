/**
 * Frontend State & Preferences Store
 * Persists user layer preferences to localStorage safely.
 */

const PREF_KEY = 'aetheris_user_prefs';

const defaultPrefs = {
  layers: {
    spaceWeather: true,
    environmental: true,
    geopolitical: false
  },
  theme: 'dark'
};

function loadPreferences() {
  if (typeof window === 'undefined') return defaultPrefs;
  try {
    const raw = window.localStorage.getItem(PREF_KEY);
    return raw ? { ...defaultPrefs, ...JSON.parse(raw) } : defaultPrefs;
  } catch (_e) {
    return defaultPrefs;
  }
}

function savePreferences(prefs) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(PREF_KEY, JSON.stringify(prefs));
  } catch (_e) {
    // ignore quota exceeded or privacy block errors
  }
}

export { loadPreferences, savePreferences, defaultPrefs };
