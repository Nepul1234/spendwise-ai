import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Topbar from '../components/layout/Topbar';
import TxRow from '../components/ui/TxRow';
import * as Icons from '../components/icons';
import type { Transaction, Toast } from '../types';

function formatDate(iso: string) {
  const d = new Date(iso);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dDay = new Date(d); dDay.setHours(0, 0, 0, 0);
  const diff = (today.getTime() - dDay.getTime()) / 86400000;
  if (diff === 0) return 'Today';
  if (diff === 1) return 'Yesterday';
  if (diff < 7) return d.toLocaleDateString('en-US', { weekday: 'short' });
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

interface Props {
  tx: Transaction[];
  onDelete: (id: string) => void;
  push: (t: Omit<Toast, 'id'>) => void;
}

export default function Transactions({ tx, onDelete, push }: Props) {
  const navigate = useNavigate();
  const [q, setQ] = useState('');
  const [filterType, setFilterType] = useState('ALL');

  const filtered = tx.filter((t) => {
    if (filterType !== 'ALL' && t.type !== filterType) return false;
    if (!q) return true;
    const Q = q.toLowerCase();
    return t.merchant.toLowerCase().includes(Q) || (t.note ?? '').toLowerCase().includes(Q);
  });

  const groups = useMemo(() => {
    const m = new Map<string, Transaction[]>();
    for (const t of filtered) {
      if (!m.has(t.date)) m.set(t.date, []);
      m.get(t.date)!.push(t);
    }
    return [...m.entries()];
  }, [filtered]);

  const totalSpend = filtered.filter(t => t.type === 'EXPENSE').reduce((s, t) => s + Math.abs(t.amount), 0);
  const totalIncome = filtered.filter(t => t.type === 'INCOME').reduce((s, t) => s + t.amount, 0);

  const handleDelete = (id: string) => {
    onDelete(id);
    push({ kind: 'success', title: 'Transaction deleted', msg: 'Removed from your list.' });
  };

  return (
    <>
      <Topbar title="Transactions" crumbs={['Home']} />
      <div className="page page-wide">
        <div className="page-hd">
          <div>
            <h2>Transactions</h2>
            <div className="sub">{filtered.length} transactions · this month</div>
          </div>
          <div className="row">
            <button className="btn"><Icons.Download size={13} /> Export</button>
            <button className="btn" onClick={() => navigate('/ai')}><Icons.Stars size={13} /> Quick add</button>
            <button className="btn btn-primary" onClick={() => navigate('/add')}><Icons.Plus size={14} /> Add</button>
          </div>
        </div>

        {/* Summary */}
        <div className="grid g-3" style={{ marginBottom: 16 }}>
          <div className="card kpi">
            <div className="kpi-label">Inflow</div>
            <div className="kpi-value num" style={{ color: 'var(--pos)' }}>
              <span style={{ fontSize: 16, color: 'var(--tx-3)', fontWeight: 500, marginRight: 4 }}>Rs</span>
              {totalIncome.toLocaleString('en-IN')}
            </div>
          </div>
          <div className="card kpi">
            <div className="kpi-label">Outflow</div>
            <div className="kpi-value num">
              <span style={{ fontSize: 16, color: 'var(--tx-3)', fontWeight: 500, marginRight: 4 }}>Rs</span>
              {totalSpend.toLocaleString('en-IN')}
            </div>
          </div>
          <div className="card kpi">
            <div className="kpi-label">Net</div>
            <div className="kpi-value num">
              <span style={{ fontSize: 16, color: 'var(--tx-3)', fontWeight: 500, marginRight: 4 }}>Rs</span>
              {(totalIncome - totalSpend).toLocaleString('en-IN')}
            </div>
          </div>
        </div>

        {/* Filter */}
        <div className="card" style={{ marginBottom: 16 }}>
          <div className="card-bd" style={{ padding: 12 }}>
            <div className="row" style={{ gap: 10 }}>
              <div style={{ position: 'relative', flex: 1, maxWidth: 360 }}>
                <input className="input" style={{ paddingLeft: 34 }}
                       placeholder="Search merchant or note…" value={q}
                       onChange={(e) => setQ(e.target.value)} />
                <div style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: 'var(--tx-3)' }}>
                  <Icons.Search size={14} />
                </div>
              </div>
              <div className="row" style={{ gap: 4, marginLeft: 'auto' }}>
                {['ALL', 'EXPENSE', 'INCOME', 'TRANSFER'].map((t) => (
                  <button key={t} className={`chip${filterType === t ? ' active' : ''}`}
                          onClick={() => setFilterType(t)}>
                    {t === 'ALL' ? 'All' : t[0] + t.slice(1).toLowerCase()}
                  </button>
                ))}
              </div>
              <button className="btn btn-sm"><Icons.Filter size={12} /> Filters</button>
            </div>
          </div>
        </div>

        {/* Grouped list */}
        <div className="card">
          <div className="card-bd flush">
            {groups.length === 0 && <div className="empty">No transactions match "{q}"</div>}
            {groups.map(([date, items], gi) => (
              <div key={date}>
                <div style={{
                  padding: '10px 18px', background: 'var(--bg-2)',
                  borderTop: gi === 0 ? 'none' : '1px solid var(--line-1)',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                  <div style={{ fontSize: 11, color: 'var(--tx-3)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    {formatDate(date)} · {new Date(date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                  </div>
                  <div className="num" style={{ fontSize: 11, color: 'var(--tx-3)' }}>
                    {items.length} {items.length === 1 ? 'item' : 'items'} · Rs {items.reduce((s, t) => s + Math.abs(t.amount), 0).toLocaleString('en-IN')}
                  </div>
                </div>
                <div className="tx-list">
                  {items.map((t) => <TxRow key={t.id} tx={t} onDelete={handleDelete} />)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
