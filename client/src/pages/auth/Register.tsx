import { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import * as Icons from '../../components/icons';
import { useAuth } from '../../context/AuthContext';

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const strength = useMemo(() => {
    let s = 0;
    if (pw.length >= 8) s++;
    if (/[A-Z]/.test(pw)) s++;
    if (/[0-9]/.test(pw)) s++;
    if (/[^A-Za-z0-9]/.test(pw)) s++;
    return s;
  }, [pw]);
  const strLabel = ['Too short', 'Weak', 'Okay', 'Good', 'Strong'][strength];
  const strColor = ['var(--tx-4)', 'var(--neg)', 'var(--warn)', 'var(--acc)', 'var(--pos)'][strength];

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await register(name, email, pw);
      navigate('/');
    } catch {
      setError('Registration failed. Email may already be in use.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth">
      <div className="auth-art">
        <div className="row" style={{ gap: 10 }}>
          <div className="sb-logo" style={{ width: 32, height: 32, fontSize: 15 }}>AI</div>
          <div style={{ fontWeight: 600, fontSize: 15 }}>AI Expense Tracker</div>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: 460 }}>
          <div style={{ fontSize: 32, fontWeight: 600, letterSpacing: '-0.025em', lineHeight: 1.15 }}>
            Your finances,<br />finally organised.
          </div>
          <div style={{ color: 'var(--tx-2)', fontSize: 14, marginTop: 16, lineHeight: 1.6 }}>
            Join thousands who track their spending with AI. No spreadsheets, no manual entry.
          </div>
        </div>
        <div style={{ color: 'var(--tx-4)', fontSize: 11 }}>© 2026 AI Expense Tracker</div>
      </div>

      <div className="auth-form">
        <form className="auth-form-inner" onSubmit={submit}>
          <div className="auth-title">Create your account</div>
          <div className="auth-sub">14-day free trial. No card required.</div>
          <div style={{ marginTop: 28 }}>
            <div className="field">
              <label className="label">Full name</label>
              <div style={{ position: 'relative' }}>
                <input className="input" style={{ paddingLeft: 36 }} placeholder="Nepul Sharma"
                       value={name} onChange={(e) => setName(e.target.value)} />
                <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--tx-3)' }}>
                  <Icons.User size={14} />
                </div>
              </div>
            </div>
            <div className="field">
              <label className="label">Email</label>
              <div style={{ position: 'relative' }}>
                <input className="input" style={{ paddingLeft: 36 }} type="email" placeholder="nepul@expense.app"
                       value={email} onChange={(e) => setEmail(e.target.value)} />
                <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--tx-3)' }}>
                  <Icons.Mail size={14} />
                </div>
              </div>
            </div>
            <div className="field">
              <label className="label">Password</label>
              <div style={{ position: 'relative' }}>
                <input className="input" style={{ paddingLeft: 36, paddingRight: 36 }}
                       type={show ? 'text' : 'password'}
                       value={pw} onChange={(e) => setPw(e.target.value)} placeholder="At least 8 characters" />
                <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--tx-3)' }}>
                  <Icons.Lock size={14} />
                </div>
                <button type="button" className="iconbtn"
                        style={{ position: 'absolute', right: 4, top: '50%', transform: 'translateY(-50%)', border: 0, width: 28, height: 28 }}
                        onClick={() => setShow((s) => !s)}>
                  {show ? <Icons.EyeOff size={13} /> : <Icons.Eye size={13} />}
                </button>
              </div>
              {pw && (
                <div className="row" style={{ gap: 8, marginTop: 8 }}>
                  <div style={{ flex: 1, height: 3, background: 'var(--bg-3)', borderRadius: 999, overflow: 'hidden' }}>
                    <div style={{ width: `${(strength / 4) * 100}%`, height: '100%', background: strColor, transition: 'all 0.2s' }} />
                  </div>
                  <div style={{ fontSize: 11, color: strColor, fontWeight: 500, minWidth: 64, textAlign: 'right' }}>{strLabel}</div>
                </div>
              )}
            </div>
            <label className="row" style={{ gap: 8, fontSize: 12, color: 'var(--tx-2)', cursor: 'pointer', alignItems: 'flex-start' }}>
              <input type="checkbox" defaultChecked style={{ accentColor: 'var(--acc)', marginTop: 2 }} />
              <span>I agree to the <a href="#">Terms</a> and <a href="#">Privacy Policy</a></span>
            </label>
          </div>
          {error && <div style={{ color: 'var(--neg)', fontSize: 12, marginTop: 8 }}>{error}</div>}
          <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center', marginTop: 20 }} disabled={loading}>
            {loading ? <div className="spin" style={{ borderTopColor: '#02201d' }} /> : <>Create account <Icons.ArrowRight size={14} /></>}
          </button>
          <div style={{ textAlign: 'center', fontSize: 13, color: 'var(--tx-3)', marginTop: 24 }}>
            Already have an account? <Link to="/login">Sign in</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
