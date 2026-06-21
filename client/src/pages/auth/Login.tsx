import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import * as Icons from '../../components/icons';
import { useAuth } from '../../context/AuthContext';

function AuthArt() {
  return (
    <div className="auth-art">
      <div className="row" style={{ gap: 10 }}>
        <div className="sb-logo" style={{ width: 32, height: 32, fontSize: 15 }}>AI</div>
        <div style={{ fontWeight: 600, fontSize: 15 }}>AI Expense Tracker</div>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: 460 }}>
        <div style={{ fontSize: 32, fontWeight: 600, letterSpacing: '-0.025em', lineHeight: 1.15 }}>
          Type how you spent.<br />We'll do the rest.
        </div>
        <div style={{ color: 'var(--tx-2)', fontSize: 14, marginTop: 16, lineHeight: 1.6, maxWidth: 380 }}>
          A modern expense tracker that understands plain English. Add transactions in seconds, get AI-generated insights weekly.
        </div>
        <div style={{ marginTop: 36 }}>
          <div className="card" style={{ padding: 14, background: 'var(--bg-2)' }}>
            <div className="row" style={{ gap: 10 }}>
              <div className="ai-sparkle" style={{ width: 28, height: 28, borderRadius: 8 }}>
                <Icons.Stars size={14} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, color: 'var(--tx-3)' }}>You typed</div>
                <div style={{ fontSize: 13, color: 'var(--tx-1)', marginTop: 2 }}>
                  "spent 500 on groceries yesterday at bhatbhateni"
                </div>
              </div>
            </div>
            <div style={{ marginTop: 12, padding: 10, borderRadius: 8, background: 'var(--bg-3)', border: '1px solid var(--line-1)' }}>
              <div className="row" style={{ gap: 8, fontSize: 12 }}>
                <span style={{ color: 'var(--tx-3)' }}>Parsed:</span>
                <span className="badge neg">Expense</span>
                <span className="num" style={{ fontWeight: 600, color: 'var(--tx-1)' }}>Rs 500</span>
                <span style={{ color: 'var(--tx-2)' }}>· Groceries · Yesterday</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--tx-4)', fontSize: 11 }}>
        <span>© 2026 AI Expense Tracker</span><span>v1.0.0</span>
      </div>
    </div>
  );
}

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(email, pw);
      navigate('/');
    } catch {
      setError('Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth">
      <AuthArt />
      <div className="auth-form">
        <form className="auth-form-inner" onSubmit={submit}>
          <div className="auth-title">Welcome back</div>
          <div className="auth-sub">Sign in to AI Expense Tracker</div>
          <div style={{ marginTop: 28 }}>
            <div className="field">
              <label className="label">Email</label>
              <div style={{ position: 'relative' }}>
                <input className="input" style={{ paddingLeft: 36 }} type="email"
                       value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@expense.app" />
                <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--tx-3)', pointerEvents: 'none' }}>
                  <Icons.Mail size={14} />
                </div>
              </div>
            </div>
            <div className="field">
              <div className="row between" style={{ marginBottom: 6 }}>
                <label className="label" style={{ margin: 0 }}>Password</label>
                <a href="#" style={{ fontSize: 11, fontWeight: 500 }}>Forgot?</a>
              </div>
              <div style={{ position: 'relative' }}>
                <input className="input" style={{ paddingLeft: 36, paddingRight: 36 }}
                       type={show ? 'text' : 'password'}
                       value={pw} onChange={(e) => setPw(e.target.value)} />
                <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--tx-3)' }}>
                  <Icons.Lock size={14} />
                </div>
                <button type="button" className="iconbtn"
                        style={{ position: 'absolute', right: 4, top: '50%', transform: 'translateY(-50%)', border: 0, width: 28, height: 28 }}
                        onClick={() => setShow((s) => !s)}>
                  {show ? <Icons.EyeOff size={13} /> : <Icons.Eye size={13} />}
                </button>
              </div>
            </div>
            <label className="row" style={{ gap: 8, fontSize: 12, color: 'var(--tx-2)', cursor: 'pointer' }}>
              <input type="checkbox" defaultChecked style={{ accentColor: 'var(--acc)' }} />
              <span>Remember me for 30 days</span>
            </label>
          </div>
          {error && <div style={{ color: 'var(--neg)', fontSize: 12, marginTop: 8 }}>{error}</div>}
          <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center', marginTop: 20 }}>
            {loading ? <div className="spin" style={{ borderTopColor: '#02201d' }} /> : <><span>Sign in</span> <Icons.ArrowRight size={14} /></>}
          </button>
          <div className="auth-divider">or continue with</div>
          <div className="row" style={{ gap: 8 }}>
            <button type="button" className="btn" style={{ flex: 1, justifyContent: 'center', height: 38 }}>
              <svg width="14" height="14" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.5 12.3c0-.8-.1-1.5-.2-2.2H12v4.3h5.9c-.3 1.4-1 2.5-2.2 3.3v2.8h3.5c2-1.9 3.3-4.7 3.3-8.2z"/><path fill="#34A853" d="M12 23c2.9 0 5.4-1 7.2-2.6l-3.5-2.8c-1 .6-2.2 1.1-3.7 1.1-2.9 0-5.3-1.9-6.2-4.6H2.2v2.9C4 20.5 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.8 14.1c-.2-.6-.4-1.4-.4-2.1s.1-1.4.4-2.1V7H2.2C1.5 8.5 1 10.2 1 12s.5 3.5 1.2 5z"/><path fill="#EA4335" d="M12 5.4c1.6 0 3 .6 4.2 1.6L19.3 4C17.4 2.2 14.9 1 12 1 7.7 1 4 3.5 2.2 7l3.5 2.9C6.7 7.3 9.1 5.4 12 5.4z"/></svg>
              Google
            </button>
            <button type="button" className="btn" style={{ flex: 1, justifyContent: 'center', height: 38 }}>Apple</button>
          </div>
          <div style={{ textAlign: 'center', fontSize: 13, color: 'var(--tx-3)', marginTop: 24 }}>
            New here? <Link to="/register">Create an account</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
