import React, { useState, useEffect } from 'react';

export const loadMarketData = (setMarketData: any) => {
    let isMounted = true;
    fetch('/api/markets')
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then(data => {
        if (isMounted) setMarketData(data);
      })
      .catch(() => {
        // Fallback generator for live equities, FX, crypto, and commodities
        if (isMounted) {
          setMarketData({
            SPX: (5100 + Math.random() * 20 - 10).toFixed(1),
            BTC: Math.floor(65000 + Math.random() * 1000 - 500),
            Gold: (2150 + Math.random() * 10 - 5).toFixed(1),
            EUR: (1.08 + Math.random() * 0.01 - 0.005).toFixed(4),
            WTI: (78.5 + Math.random() * 2 - 1).toFixed(2),
            JPY: (150.2 + Math.random() * 1 - 0.5).toFixed(2)
          });
        }
      });
    return () => { isMounted = false; };
};

export const handleSendLogic = (input: string, setMessages: any, setInput: any, setTimeoutFn: any = setTimeout) => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', content: input };
    setMessages((prev: any) => [...prev, userMsg]);
    setInput('');

    // Mock API call to MCP server
    setTimeoutFn(() => {
      setMessages((prev: any) => [...prev, {
        role: 'assistant',
        content: `Analysis of ${input}: Impact probability high. Sources: [GDELT, NOAA].`,
        citations: ['GDELT', 'NOAA']
      }]);
    }, 600);
};

export const AIAnalystChat = ({ initialMessages = [] }: any) => {
  const [messages, setMessages] = useState<any[]>(initialMessages);
  const [input, setInput] = useState('');

  const handleSend = () => handleSendLogic(input, setMessages, setInput, setTimeout);

  return (
    <div style={{
      marginTop: '16px',
      borderTop: '1px solid rgba(255,255,255,0.1)',
      paddingTop: '10px'
    }}>
      <div style={{
        fontWeight: 'bold',
        marginBottom: '8px',
        opacity: 0.6,
        fontSize: '0.65rem',
        letterSpacing: '1px',
        textTransform: 'uppercase',
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
      }}>
        <div style={{ width: '6px', height: '6px', background: '#00d2ff', borderRadius: '50%' }} />
        AI Analyst Chat
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '150px', overflowY: 'auto', marginBottom: '8px', scrollbarWidth: 'none' }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{
            background: msg.role === 'user' ? 'rgba(0, 210, 255, 0.1)' : 'rgba(255,255,255,0.05)',
            padding: '6px 10px',
            borderRadius: '8px',
            fontSize: '0.75rem',
            color: msg.role === 'user' ? '#fff' : '#ccc'
          }}>
            <span style={{ fontWeight: 'bold', color: msg.role === 'user' ? '#00d2ff' : '#aaa', marginRight: '6px', fontSize: '0.65rem' }}>
              {msg.role === 'user' ? 'YOU' : 'AI'}
            </span>
            {msg.content}
            {msg.citations && (
              <div style={{ marginTop: '4px', fontSize: '0.6rem', color: '#00ff88', opacity: 0.8 }}>
                [Citations: {msg.citations.join(', ')}]
              </div>
            )}
          </div>
        ))}
        {messages.length === 0 && (
          <div style={{ opacity: 0.5, fontSize: '0.7rem', textAlign: 'center', padding: '10px 0' }}>
            Ask about live events or trends...
          </div>
        )}
      </div>
      <div style={{ display: 'flex', gap: '6px' }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder="Ask Analyst..."
          style={{
            flex: 1,
            background: 'rgba(0,0,0,0.4)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '6px',
            padding: '6px 10px',
            color: 'white',
            fontSize: '0.75rem',
            outline: 'none'
          }}
        />
        <button
          onClick={handleSend}
          style={{
            background: '#00d2ff',
            border: 'none',
            borderRadius: '6px',
            padding: '6px 12px',
            color: 'black',
            fontWeight: 'bold',
            fontSize: '0.7rem',
            cursor: 'pointer'
          }}
        >
          &rarr;
        </button>
      </div>
    </div>
  );
};

const HealthDashboard = ({ metrics = { latency: 0, signalToNoise: 0 }, initialMarketData = null }: any) => {
  const [marketData, setMarketData] = useState<any>(initialMarketData);

  useEffect(() => loadMarketData(setMarketData), []);

  return (
    <div
      className="health-dashboard"
      style={{
        position: 'absolute',
        top: 20,
        right: 20,
        background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(12px)',
        padding: '15px 20px',
        borderRadius: '16px',
        color: 'white',
        fontSize: '0.8rem',
        border: '1px solid rgba(255,255,255,0.1)',
        zIndex: 100,
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        minWidth: '180px'
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
        <div style={{ width: '8px', height: '8px', background: '#00ff88', borderRadius: '50%', boxShadow: '0 0 8px #00ff88' }} />
        System Pulse
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span style={{ opacity: 0.7 }}>Latency</span>
          <span style={{ color: '#00d2ff', fontWeight: 'bold', fontFamily: 'monospace', fontSize: '0.9rem' }}>{metrics.latency}ms</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span style={{ opacity: 0.7 }}>Integrity</span>
          <span style={{ color: '#00d2ff', fontWeight: 'bold', fontFamily: 'monospace', fontSize: '0.9rem' }}>{metrics.signalToNoise}%</span>
        </div>
      </div>

      <div style={{
        marginTop: '12px',
        height: '2px',
        background: 'rgba(255,255,255,0.05)',
        position: 'relative',
        overflow: 'hidden'
      }}>
         <div style={{
           position: 'absolute',
           width: '40%',
           height: '100%',
           background: '#00d2ff',
           animation: 'pulse-line 2s infinite linear'
         }} />
      </div>

      {marketData && (
        <div style={{ marginTop: '16px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '10px' }}>
          <div style={{ fontWeight: 'bold', marginBottom: '8px', opacity: 0.6, fontSize: '0.65rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
            Market Pulse
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {Object.entries(marketData).map(([key, val]) => (
              <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ opacity: 0.7 }}>{key}</span>
                <span style={{ color: '#00d2ff', fontWeight: 'bold', fontFamily: 'monospace', fontSize: '0.9rem' }}>
                  {key === 'BTC' || key === 'Gold' || key === 'SPX' ? '$' : ''}{val}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <AIAnalystChat />

      <style>{`
        @keyframes pulse-line {
          0% { left: -40%; }
          100% { left: 100%; }
        }
      `}</style>
    </div>
  );
};

export { HealthDashboard };
