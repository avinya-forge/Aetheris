import React, { useState } from 'react';

// Default hashed invite code representation (e.g. hash of "AETHERIS2025")
const VALID_HASH = '8f3d4a2b';

export const simpleHash = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString(16);
};

export const verifyInviteCode = (code: string, setIsUnlocked: (_val: boolean) => void, setError: (_val: boolean) => void, onUnlocked?: () => void) => {
  const trimmed = code.trim().toUpperCase();
  if (trimmed === 'AETHERIS2025' || simpleHash(trimmed) === VALID_HASH) {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('aetheris_beta_invite', VALID_HASH);
    }
    setIsUnlocked(true);
    setError(false);
    if (onUnlocked) onUnlocked();
  } else {
    setError(true);
  }
};

export const InviteGate = ({ onUnlocked, children }: { onUnlocked?: () => void, children?: React.ReactNode }) => {
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('aetheris_beta_invite');
      if (saved === VALID_HASH || saved === 'unlocked') return true;
    }
    return false;
  });
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);

  React.useEffect(() => {
    if (isUnlocked && onUnlocked) {
      onUnlocked();
    }
  }, [isUnlocked, onUnlocked]);

  const handleVerify = () => verifyInviteCode(code, setIsUnlocked, setError, onUnlocked);

  if (isUnlocked) {
    return <>{children}</>;
  }

  return (
    <div
      data-testid="invite-gate"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(5, 5, 10, 0.92)',
        backdropFilter: 'blur(20px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        color: 'white',
        fontFamily: 'system-ui, sans-serif'
      }}
    >
      <div style={{
        background: 'rgba(255, 255, 255, 0.04)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '24px',
        padding: '40px',
        width: '90%',
        maxWidth: '400px',
        textAlign: 'center',
        boxShadow: '0 20px 50px rgba(0,0,0,0.6)'
      }}>
        <div style={{
          fontSize: '0.75rem',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: '#00d2ff',
          marginBottom: '12px',
          fontWeight: 700
        }}>
          RESTRICTED BETA ACCESS
        </div>

        <h2 style={{ margin: '0 0 16px 0', fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.5px' }}>
          AETHERIS
        </h2>

        <p style={{ fontSize: '0.85rem', color: '#aaa', marginBottom: '24px', lineHeight: 1.5 }}>
          Enter your beta invite code to access the temporal intelligence sentinel engine.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input
            type="password"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
            placeholder="INVITE CODE"
            style={{
              background: 'rgba(0, 0, 0, 0.5)',
              border: error ? '1px solid #ff4b2b' : '1px solid rgba(255,255,255,0.2)',
              borderRadius: '12px',
              padding: '12px 16px',
              color: 'white',
              fontSize: '0.9rem',
              letterSpacing: '2px',
              textAlign: 'center',
              outline: 'none'
            }}
          />

          {error && (
            <div style={{ color: '#ff4b2b', fontSize: '0.75rem' }}>
              Invalid invite code. Try 'AETHERIS2025'.
            </div>
          )}

          <button
            onClick={handleVerify}
            style={{
              background: 'linear-gradient(135deg, #00d2ff, #0072ff)',
              border: 'none',
              borderRadius: '12px',
              padding: '12px',
              color: 'white',
              fontWeight: 700,
              fontSize: '0.85rem',
              letterSpacing: '1px',
              cursor: 'pointer',
              marginTop: '8px'
            }}
          >
            UNLOCK DASHBOARD
          </button>
        </div>
      </div>
    </div>
  );
};
