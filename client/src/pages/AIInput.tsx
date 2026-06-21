import { useState, useEffect } from 'react';
import Topbar from '../components/layout/Topbar';
import * as Icons from '../components/icons';
import * as api from '../lib/api';
import type { Toast } from '../types';

type State = 'idle' | 'processing' | 'done';

interface Props {
  onSaveRequest: (req: api.TransactionRequest) => Promise<void>;
  push: (t: Omit<Toast, 'id'>) => void;
}

export default function AIInput({ onSaveRequest, push }: Props) {
  const [state, setState] = useState<State>('idle');
  const [text, setText] = useState('');
  const [parsed, setParsed] = useState<api.TransactionRequest | null>(null);
  const [categories, setCategories] = useState<api.ApiCategory[]>([]);
  const [accounts, setAccounts]     = useState<api.ApiAccount[]>([]);

  useEffect(() => {
    Promise.all([api.fetchCategories(), api.fetchAccounts()])
      .then(([cats, accs]) => {
        setCategories(cats.data);
        setAccounts(accs.data);
      })
      .catch(() => {});
  }, []);

  const suggestions = [
    'spent 1,200 on dinner at Roadhouse Cafe last night',
    'received 28k freelance payment from Upwork',
    'paid 2,000 electricity bill yesterday',
    'transferred 5k to second account',
  ];

  const submit = async () => {
    if (!text.trim() || state === 'processing') return;
    setState('processing');
    try {
      const res = await api.aiParseSync(text);
      setParsed(res.data);
      setState('done');
      push({
        kind: 'ai', aiTone: true, title: 'Parsed by AI',
        msg: `${res.data.type} · Rs ${Math.abs(res.data.amount ?? 0).toLocaleString('en-IN')}`,
      });
    } catch {
      push({ kind: 'error', title: 'Parse failed', msg: 'AI could not understand that. Try again.' });
      setState('idle');
    }
  };

  const reset = () => { setText(''); setParsed(null); setState('idle'); };

  const confirm = async () => {
    if (!parsed) return;
    await onSaveRequest(parsed);
  };

  const catName  = categories.find(c => c.id === parsed?.categoryId)?.name ?? `ID ${parsed?.categoryId}`;
  const accName  = accounts.find(a => a.id === parsed?.accountId)?.name ?? `ID ${parsed?.accountId}`;
  const dateLabel = parsed?.transactionDate === new Date().toISOString().slice(0, 10) ? 'Today' : parsed?.transactionDate;

  return (
    <>
      <Topbar title="AI input" crumbs={['Home']} />
      <div className="page">
        <div className="ai-shell">
          <div className="row" style={{ gap: 12, marginBottom: 6 }}>
            <div className="ai-sparkle"><Icons.Stars size={20} /></div>
            <div>
              <h2 style={{ margin: 0, fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em' }}>Quick add</h2>
              <div style={{ fontSize: 13, color: 'var(--tx-3)' }}>Tell us what you spent — in any language, any format.</div>
            </div>
          </div>

          {/* Input box */}
          <div className="ai-input-wrap" style={{ marginTop: 24, opacity: state === 'processing' ? 0.6 : 1, transition: 'opacity 0.2s' }}>
            <textarea className="ai-input"
                      placeholder="e.g. spent 500 on groceries yesterday at bhatbhateni"
                      rows={2} value={text}
                      onChange={(e) => setText(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit(); } }}
                      disabled={state === 'processing'} />
            <div className="ai-input-bar">
              <span className="ai-hint">
                <kbd style={{ background: 'var(--bg-3)', padding: '1px 5px', borderRadius: 3, fontSize: 10, border: '1px solid var(--line-2)' }}>↵</kbd>
                {' '}to submit
              </span>
              <button type="button" className="btn btn-sm btn-ghost" style={{ marginLeft: 'auto' }} onClick={() => setText('')}>Clear</button>
              <button type="button" className="btn btn-sm btn-primary" onClick={submit} disabled={!text.trim() || state === 'processing'}>
                {state === 'processing'
                  ? <><div className="spin" style={{ width: 12, height: 12, borderTopColor: '#02201d' }} /> Parsing…</>
                  : <>Submit <Icons.Send size={12} /></>}
              </button>
            </div>
          </div>

          {/* Idle suggestions */}
          {state === 'idle' && (
            <div style={{ marginTop: 24 }}>
              <div style={{ fontSize: 11, color: 'var(--tx-3)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>Try one of these</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {suggestions.map((s, i) => (
                  <div key={i} className="ai-suggestion" onClick={() => setText(s)}>
                    <span style={{ color: 'var(--tx-4)', marginRight: 8 }}>"</span>{s}<span style={{ color: 'var(--tx-4)', marginLeft: 4 }}>"</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Processing */}
          {state === 'processing' && (
            <div className="card" style={{ marginTop: 16 }}>
              <div className="ai-processing">
                <div style={{ position: 'relative' }}>
                  <div className="ai-sparkle" style={{ width: 48, height: 48 }}><Icons.Stars size={22} /></div>
                  <div style={{ position: 'absolute', inset: -6, borderRadius: 18, border: '1.5px solid var(--acc-line)', animation: 'spin 1.6s linear infinite', borderTopColor: 'transparent', borderRightColor: 'transparent' }} />
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--tx-1)' }}>Parsing your transaction…</div>
                  <div style={{ fontSize: 12, color: 'var(--tx-3)', marginTop: 4 }}>Detecting amount, category, date and merchant</div>
                </div>
                <div className="row" style={{ gap: 4 }}>
                  <div className="dot-pulse" /><div className="dot-pulse" style={{ animationDelay: '0.2s' }} /><div className="dot-pulse" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            </div>
          )}

          {/* Done */}
          {state === 'done' && parsed && (
            <div className="ai-result" style={{ marginTop: 16 }}>
              <div className="row between" style={{ marginBottom: 14 }}>
                <div className="row" style={{ gap: 8 }}>
                  <div style={{ width: 22, height: 22, borderRadius: 6, background: 'var(--pos-soft)', color: 'var(--pos)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icons.Check size={13} />
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>Parsed by Gemini AI</div>
                </div>
              </div>
              <div style={{ fontSize: 12, color: 'var(--tx-3)', marginBottom: 8 }}>You said</div>
              <div style={{ padding: '10px 12px', borderRadius: 8, background: 'var(--bg-2)', border: '1px solid var(--line-1)', fontSize: 13, color: 'var(--tx-2)', fontStyle: 'italic' }}>
                "{text}"
              </div>
              <div style={{ fontSize: 12, color: 'var(--tx-3)', margin: '14px 0 6px' }}>We understood</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--line-1)', borderRadius: 8, overflow: 'hidden', border: '1px solid var(--line-1)' }}>
                {[
                  { label: 'Type',     value: parsed.type[0] + parsed.type.slice(1).toLowerCase() },
                  { label: 'Amount',   value: `Rs ${Math.abs(parsed.amount ?? 0).toLocaleString('en-IN')}`, num: true },
                  { label: 'Category', value: catName },
                  { label: 'Date',     value: dateLabel ?? '' },
                ].map((f, i) => (
                  <div key={i} style={{ background: 'var(--bg-1)', padding: '10px 12px' }}>
                    <div style={{ fontSize: 10, color: 'var(--tx-3)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 500 }}>{f.label}</div>
                    <div className={f.num ? 'num' : ''} style={{ fontSize: 13, color: 'var(--tx-1)', marginTop: 4, fontWeight: 500 }}>{f.value}</div>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 12, color: 'var(--tx-3)', margin: '10px 0 4px' }}>Account · {accName}</div>
              <div className="row" style={{ gap: 8, marginTop: 16 }}>
                <button type="button" className="btn btn-ghost" onClick={reset}>Try another</button>
                <button type="button" className="btn btn-primary" style={{ marginLeft: 'auto' }} onClick={confirm}>
                  <Icons.Check size={14} /> Add transaction
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
