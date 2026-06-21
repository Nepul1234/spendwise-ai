import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Topbar from '../components/layout/Topbar';
import TxRow from '../components/ui/TxRow';
import * as Icons from '../components/icons';
import * as api from '../lib/api';
import type { Transaction, TransactionType, Toast } from '../types';

interface Props {
  onSaveRequest: (req: api.TransactionRequest) => Promise<void>;
  push: (t: Omit<Toast, 'id'>) => void;
}

export default function AddTransaction({ onSaveRequest, push }: Props) {
  const navigate = useNavigate();
  const [type, setType] = useState<TransactionType>('EXPENSE');
  const [amount, setAmount] = useState('');
  const [merchant, setMerchant] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [note, setNote] = useState('');

  const [accounts, setAccounts]     = useState<api.ApiAccount[]>([]);
  const [categories, setCategories] = useState<api.ApiCategory[]>([]);
  const [modes, setModes]           = useState<api.ApiPaymentMode[]>([]);

  const [accountId,  setAccountId]  = useState<number | null>(null);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [modeId,     setModeId]     = useState<number | null>(null);
  const [toAccountId, setToAccountId] = useState<number | null>(null);

  useEffect(() => {
    Promise.all([api.fetchAccounts(), api.fetchCategories(), api.fetchPaymentModes()])
      .then(([accs, cats, ms]) => {
        setAccounts(accs.data);
        setCategories(cats.data);
        setModes(ms.data);
        if (accs.data.length)  setAccountId(accs.data[0].id);
        if (cats.data.length)  setCategoryId(cats.data[0].id);
        if (ms.data.length)    setModeId(ms.data[0].id);
      })
      .catch(() => push({ kind: 'error', title: 'Could not load form data' }));
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accountId || !categoryId || !modeId) {
      push({ kind: 'error', title: 'Select account, category and payment mode' });
      return;
    }
    const req: api.TransactionRequest = {
      type,
      description: merchant || 'Manual entry',
      amount: Math.abs(+amount),
      transactionDate: date,
      accountId,
      categoryId,
      paymentModeId: modeId,
      toAccountId: type === 'TRANSFER' ? toAccountId : null,
    };
    await onSaveRequest(req);
  };

  const TypeBtn = ({ value, label, color }: { value: TransactionType; label: string; color: string }) => (
    <button type="button" onClick={() => setType(value)}
            className={`chip${type === value ? ' active' : ''}`}
            style={{ flex: 1, justifyContent: 'center', height: 38,
              ...(type === value ? { background: `color-mix(in oklch, ${color} 18%, transparent)`, borderColor: color, color } : {}) }}>
      {label}
    </button>
  );

  const selectedCat = categories.find(c => c.id === categoryId);
  const selectedAcc = accounts.find(a => a.id === accountId);
  const selectedMode = modes.find(m => m.id === modeId);

  const preview: Transaction = {
    id: 'preview', date, time: '12:00',
    merchant: merchant || 'Merchant name',
    category: selectedCat?.name ?? '',
    account: selectedAcc?.name ?? '',
    mode: selectedMode?.name ?? '',
    type, note,
    amount: type === 'INCOME' ? Math.abs(+amount || 0) : -Math.abs(+amount || 0),
  };

  return (
    <>
      <Topbar title="New transaction" crumbs={['Home', 'Transactions']} />
      <div className="page">
        <div className="page-hd">
          <div>
            <h2>Add transaction</h2>
            <div className="sub">Manual entry</div>
          </div>
        </div>

        <div className="grid" style={{ gridTemplateColumns: '1.5fr 1fr', alignItems: 'flex-start' }}>
          <form onSubmit={submit} className="card">
            <div className="card-bd">
              <div className="field">
                <label className="label">Type</label>
                <div className="row" style={{ gap: 6 }}>
                  <TypeBtn value="EXPENSE"  label="Expense"  color="var(--neg)" />
                  <TypeBtn value="INCOME"   label="Income"   color="var(--pos)" />
                  <TypeBtn value="TRANSFER" label="Transfer" color="var(--transfer)" />
                </div>
              </div>
              <div className="fieldrow">
                <div className="field">
                  <label className="label">Amount</label>
                  <div style={{ position: 'relative' }}>
                    <input className="input lg num" style={{ paddingLeft: 42, fontSize: 18, fontWeight: 600 }}
                           placeholder="0" type="number" value={amount}
                           onChange={(e) => setAmount(e.target.value)} required />
                    <div style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--tx-3)', fontWeight: 500, fontSize: 14 }}>Rs</div>
                  </div>
                </div>
                <div className="field">
                  <label className="label">Date</label>
                  <input className="input lg" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
              </div>
              <div className="field">
                <label className="label">Merchant / description</label>
                <input className="input" placeholder="e.g. Bhatbhateni Supermarket"
                       value={merchant} onChange={(e) => setMerchant(e.target.value)} />
              </div>
              <div className="fieldrow">
                <div className="field">
                  <label className="label">Account</label>
                  <select className="select" value={accountId ?? ''} onChange={(e) => setAccountId(+e.target.value)}>
                    {accounts.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
                  </select>
                </div>
                <div className="field">
                  <label className="label">Category</label>
                  <select className="select" value={categoryId ?? ''} onChange={(e) => setCategoryId(+e.target.value)}>
                    {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
              </div>
              {type === 'TRANSFER' && (
                <div className="field">
                  <label className="label">To account</label>
                  <select className="select" value={toAccountId ?? ''} onChange={(e) => setToAccountId(+e.target.value)}>
                    <option value="">Select destination</option>
                    {accounts.filter(a => a.id !== accountId).map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
                  </select>
                </div>
              )}
              <div className="field">
                <label className="label">Payment mode</label>
                <div className="row" style={{ gap: 6, flexWrap: 'wrap' }}>
                  {modes.map((m) => (
                    <button key={m.id} type="button"
                            className={`chip${modeId === m.id ? ' active' : ''}`}
                            onClick={() => setModeId(m.id)}>
                      {m.name}
                    </button>
                  ))}
                </div>
              </div>
              <div className="field">
                <label className="label">Note (optional)</label>
                <textarea className="textarea" placeholder="A short reminder…"
                          value={note} onChange={(e) => setNote(e.target.value)} />
              </div>
              <div className="row" style={{ gap: 8, marginTop: 8 }}>
                <button type="button" className="btn btn-ghost" onClick={() => navigate(-1)}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ marginLeft: 'auto' }}>
                  <Icons.Check size={14} /> Save transaction
                </button>
              </div>
            </div>
          </form>

          <div className="col">
            <div className="card">
              <div className="card-hd"><h3>Preview</h3></div>
              <div className="card-bd flush">
                <div className="tx-list"><TxRow tx={preview} /></div>
              </div>
            </div>
            <div className="card">
              <div className="card-bd">
                <div className="row" style={{ gap: 10, alignItems: 'flex-start' }}>
                  <div className="ai-sparkle" style={{ width: 28, height: 28, borderRadius: 8 }}>
                    <Icons.Stars size={13} />
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>Tip · skip the form</div>
                    <div style={{ fontSize: 12, color: 'var(--tx-2)', marginTop: 4, lineHeight: 1.5 }}>
                      Type "spent 500 on groceries yesterday" and AI will fill in all of this for you.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
