import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';

interface Props {
  open: boolean;
  onClose: () => void;
  initialMode: 'signin' | 'login';
}

export function AuthModal({ open, onClose, initialMode }: Props) {
  const [mode, setMode] = useState<'signin' | 'login'>(initialMode);
  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');
  const [name, setName]       = useState('');

  useEffect(() => {
    if (open) {
      setMode(initialMode);
    }
  }, [open, initialMode]);

  const inputStyle: React.CSSProperties = {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#f0ece4',
    fontFamily: 'Inter',
    fontSize: '0.85rem',
    padding: '12px 14px',
    outline: 'none',
    borderRadius: 2,
    transition: 'border-color 0.25s',
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: 'Inter',
    fontSize: '0.58rem',
    letterSpacing: '0.22em',
    color: 'rgba(240,236,228,0.35)',
    textTransform: 'uppercase',
    marginBottom: 7,
    display: 'block',
  };

  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <DialogContent
        style={{
          backgroundColor: '#0e0e0e',
          border: '1px solid rgba(255,255,255,0.08)',
          color: '#f0ece4',
          maxWidth: 420,
          padding: '40px 36px',
        }}
      >
        <DialogHeader className="mb-8">
          {/* Logo */}
          <div
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontWeight: 700,
              fontSize: '1.5rem',
              letterSpacing: '0.18em',
              background: 'linear-gradient(135deg, #f0ece4 0%, #d4a857 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: 20,
              display: 'block',
            }}
          >
            RABBIT
          </div>

          {/* Tab switcher */}
          <div
            className="flex"
            style={{
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 2,
              overflow: 'hidden',
            }}
          >
            {(['login', 'signin'] as const).map(m => (
              <button
                key={m}
                onClick={() => setMode(m)}
                style={{
                  flex: 1,
                  fontFamily: 'Inter',
                  fontSize: '0.65rem',
                  letterSpacing: '0.2em',
                  color: mode === m ? '#0a0a0a' : 'rgba(240,236,228,0.35)',
                  background: mode === m ? 'linear-gradient(135deg, #d4a857, #f5c842)' : 'transparent',
                  border: 'none',
                  padding: '10px',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  fontWeight: mode === m ? 600 : 400,
                  transition: 'all 0.25s',
                }}
              >
                {m === 'login' ? 'Login' : 'Sign Up'}
              </button>
            ))}
          </div>

          <DialogTitle className="sr-only">{mode === 'login' ? 'Login' : 'Sign Up'}</DialogTitle>
        </DialogHeader>

        <form
          className="flex flex-col gap-5"
          onSubmit={e => { e.preventDefault(); onClose(); }}
        >
          {mode === 'signin' && (
            <div>
              <label style={labelStyle}>Full Name</label>
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={e => setName(e.target.value)}
                style={inputStyle}
                required
              />
            </div>
          )}

          <div>
            <label style={labelStyle}>Email</label>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={inputStyle}
              required
            />
          </div>

          <div>
            <label style={labelStyle}>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={inputStyle}
              required
            />
          </div>

          {mode === 'login' && (
            <div className="flex justify-end">
              <button
                type="button"
                style={{
                  fontFamily: 'Inter',
                  fontSize: '0.62rem',
                  letterSpacing: '0.15em',
                  color: 'rgba(212,168,87,0.55)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                }}
              >
                Forgot Password?
              </button>
            </div>
          )}

          <button
            type="submit"
            className="hover:opacity-90 transition-opacity mt-2"
            style={{
              fontFamily: 'Inter',
              fontSize: '0.7rem',
              letterSpacing: '0.25em',
              fontWeight: 600,
              color: '#0a0a0a',
              background: 'linear-gradient(135deg, #d4a857, #f5c842)',
              border: 'none',
              padding: '14px',
              cursor: 'pointer',
              textTransform: 'uppercase',
              borderRadius: 2,
            }}
          >
            {mode === 'login' ? 'Login' : 'Create Account'}
          </button>
        </form>

        <div
          style={{
            fontFamily: 'Inter',
            fontSize: '0.62rem',
            color: 'rgba(255,255,255,0.2)',
            letterSpacing: '0.1em',
            textAlign: 'center',
            marginTop: 20,
          }}
        >
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button
            onClick={() => setMode(mode === 'login' ? 'signin' : 'login')}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(212,168,87,0.6)',
              cursor: 'pointer',
              fontFamily: 'Inter',
              fontSize: '0.62rem',
              letterSpacing: '0.1em',
              textDecoration: 'underline',
            }}
          >
            {mode === 'login' ? 'Sign up' : 'Login'}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
