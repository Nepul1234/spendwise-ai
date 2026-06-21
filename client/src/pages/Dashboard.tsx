import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import KPI from '../components/ui/KPI';
import TxRow from '../components/ui/TxRow';
import AccountCard from '../components/ui/AccountCard';
import Sparkline from '../components/charts/Sparkline';
import BarChart from '../components/charts/BarChart';
import Donut from '../components/charts/Donut';
import Topbar from '../components/layout/Topbar';
import * as Icons from '../components/icons';
import * as api from '../lib/api';
import type { Transaction, Toast } from '../types';

interface Props {
  push: (t: Omit<Toast, 'id'>) => void;
  tx: Transaction[];
}

const CAT_PALETTE = ['#14b8a6','#f59e0b','#60a5fa','#a78bfa','#34d399','#f472b6','#fb7185','#c084fc'];

export default function Dashboard({ push: _push, tx }: Props) {
  const navigate = useNavigate();
  const [apiAccounts, setApiAccounts] = useState<api.ApiAccount[]>([]);

  useEffect(() => {
    api.fetchAccounts().then(r => setApiAccounts(r.data)).catch(() => {});
  }, []);

  // ── Date context ────────────────────────────────────────────────────────────
  const now = new Date();
  const thisMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  const hour = now.getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  // ── KPI computations ────────────────────────────────────────────────────────
  const monthTx     = useMemo(() => tx.filter(t => t.date.startsWith(thisMonth)), [tx, thisMonth]);
  const monthIncome = useMemo(() => monthTx.filter(t => t.type === 'INCOME').reduce((s, t) => s + Math.abs(t.amount), 0), [monthTx]);
  const monthSpend  = useMemo(() => monthTx.filter(t => t.type === 'EXPENSE').reduce((s, t) => s + Math.abs(t.amount), 0), [monthTx]);
  const netWorth    = useMemo(() => apiAccounts.reduce((s, a) => s + a.balance, 0), [apiAccounts]);

  // ── Bar chart: last 30 days of expenses ────────────────────────────────────
  const spendDays = useMemo(() => {
    const days: { date: string; spend: number }[] = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const iso = d.toISOString().slice(0, 10);
      const daySpend = tx
        .filter(t => t.date === iso && t.type === 'EXPENSE')
        .reduce((s, t) => s + Math.abs(t.amount), 0);
      days.push({ date: iso, spend: daySpend });
    }
    return days;
  }, [tx]);

  // ── Category donut ──────────────────────────────────────────────────────────
  const categorySpend = useMemo(() => {
    const map = new Map<string, number>();
    tx.filter(t => t.type === 'EXPENSE').forEach(t => {
      const cat = t.category || 'Other';
      map.set(cat, (map.get(cat) ?? 0) + Math.abs(t.amount));
    });
    return [...map.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([label, amount], i) => ({ id: label, label, amount, color: CAT_PALETTE[i % CAT_PALETTE.length] }));
  }, [tx]);

  // ── This week ───────────────────────────────────────────────────────────────
  const weekSpend    = spendDays.slice(-7).reduce((s, d) => s + d.spend, 0);
  const prevWeekSpend = spendDays.slice(-14, -7).reduce((s, d) => s + d.spend, 0);
  const weekDelta    = prevWeekSpend > 0 ? ((weekSpend - prevWeekSpend) / prevWeekSpend) * 100 : 0;
  const weekStart    = spendDays[spendDays.length - 7]?.date ?? '';
  const weekEnd      = spendDays[spendDays.length - 1]?.date ?? '';
  const weekSparkline = spendDays.slice(-7).map(d => d.spend);

  // ── Avg spend/day ───────────────────────────────────────────────────────────
  const nonZeroDays = spendDays.filter(d => d.spend > 0);
  const avgDay = nonZeroDays.length > 0
    ? Math.round(nonZeroDays.reduce((s, d) => s + d.spend, 0) / nonZeroDays.length)
    : 0;

  // ── Alerts ──────────────────────────────────────────────────────────────────
  const alerts = useMemo(() => {
    const list: { tone: string; icon: JSX.Element; text: string; sub: string }[] = [];

    if (categorySpend.length > 0) {
      const top = categorySpend[0];
      list.push({
        tone: 'neutral',
        icon: <Icons.Tag size={14} />,
        text: `Top category: ${top.label}`,
        sub: `Rs ${top.amount.toLocaleString('en-IN')} · ${now.toLocaleDateString('en-US', { month: 'long' })}`,
      });
    }

    if (monthIncome > 0) {
      const ratio = monthSpend / monthIncome;
      if (ratio > 0.8) {
        list.push({ tone: 'warn', icon: <Icons.AlertCircle size={14} />, text: `Spending is ${(ratio * 100).toFixed(0)}% of your income`, sub: `Rs ${monthSpend.toLocaleString('en-IN')} spent of Rs ${monthIncome.toLocaleString('en-IN')} earned` });
      } else {
        list.push({ tone: 'good', icon: <Icons.TrendDown size={14} />, text: 'Spending is within income this month', sub: `${((1 - ratio) * 100).toFixed(0)}% of income still available` });
      }
    }

    if (weekDelta < -10) {
      list.push({ tone: 'good', icon: <Icons.ArrowDown size={14} />, text: `Week spending down ${Math.abs(weekDelta).toFixed(0)}% vs last week`, sub: 'Keep it up' });
    } else if (weekDelta > 20) {
      list.push({ tone: 'warn', icon: <Icons.AlertCircle size={14} />, text: `Week spending up ${weekDelta.toFixed(0)}% vs last week`, sub: `Rs ${weekSpend.toLocaleString('en-IN')} this week` });
    }

    if (list.length === 0) {
      list.push({ tone: 'neutral', icon: <Icons.Bell size={14} />, text: 'No alerts yet', sub: 'Add transactions to see insights' });
    }
    return list.slice(0, 3);
  }, [categorySpend, monthIncome, monthSpend, weekDelta, weekSpend]);

  const recent = tx.slice(0, 6);
  const monthLabel = now.toLocaleDateString('en-US', { month: 'long' });

  return (
    <>
      <Topbar title="Dashboard" crumbs={['Home']} />
      <div className="page page-wide">
        <div className="page-hd">
          <div>
            <h2>Dashboard</h2>
            <div className="sub">{greeting} · {dateStr}</div>
          </div>
          <div className="row">
            <button className="btn" onClick={() => navigate('/ai')}>
              <Icons.Stars size={13} /> Quick add with AI
            </button>
            <button className="btn btn-primary" onClick={() => navigate('/add')}>
              <Icons.Plus size={14} /> Add transaction
            </button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid g-4" style={{ marginBottom: 16 }}>
          <KPI label="Account balance"
               value={netWorth.toLocaleString('en-IN')}
               delta={apiAccounts.length > 0 ? `${apiAccounts.length} account${apiAccounts.length > 1 ? 's' : ''}` : 'No accounts'}
               deltaTone="neutral" sub="across all accounts"
               spark={<Sparkline values={[100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, netWorth > 0 ? netWorth / 1000 : 100]} />} />
          <KPI label={`Income · ${monthLabel}`}
               value={monthIncome.toLocaleString('en-IN')}
               deltaTone="pos"
               sub={`${monthTx.filter(t => t.type === 'INCOME').length} transaction${monthTx.filter(t => t.type === 'INCOME').length !== 1 ? 's' : ''}`}
               spark={<Sparkline values={spendDays.map(d => d.spend)} color="var(--pos)" />} />
          <KPI label={`Spent · ${monthLabel}`}
               value={monthSpend.toLocaleString('en-IN')}
               deltaTone={monthSpend > monthIncome ? 'warn' : 'pos'}
               sub={`${monthTx.filter(t => t.type === 'EXPENSE').length} expense${monthTx.filter(t => t.type === 'EXPENSE').length !== 1 ? 's' : ''}`}
               spark={<Sparkline values={spendDays.slice(-14).map(d => d.spend)} color="var(--neg)" />} />
          <KPI label="Net this month"
               value={Math.abs(monthIncome - monthSpend).toLocaleString('en-IN')}
               delta={monthIncome >= monthSpend ? 'surplus' : 'deficit'}
               deltaTone={monthIncome >= monthSpend ? 'pos' : 'warn'}
               sub={`Income − Expenses`}
               spark={
                 <div style={{ height: 6, background: 'var(--bg-3)', borderRadius: 999, overflow: 'hidden' }}>
                   <div style={{
                     width: monthIncome > 0 ? `${Math.min(100, (monthSpend / monthIncome) * 100)}%` : '0%',
                     height: '100%',
                     background: monthSpend > monthIncome ? 'var(--neg)' : 'var(--acc)',
                     borderRadius: 999,
                   }} />
                 </div>
               } />
        </div>

        {/* Chart + Donut */}
        <div className="grid" style={{ gridTemplateColumns: '2fr 1fr', marginBottom: 16 }}>
          <div className="card">
            <div className="card-hd">
              <div><h3>Spending · last 30 days</h3><div className="sub">Daily expense totals</div></div>
              {avgDay > 0 && (
                <div className="right">
                  <span style={{ fontSize: 11, color: 'var(--tx-3)' }}>
                    Avg <span className="num" style={{ color: 'var(--tx-1)' }}>Rs {avgDay.toLocaleString('en-IN')}</span>/day
                  </span>
                </div>
              )}
            </div>
            <div className="card-bd">
              <BarChart data={spendDays} height={180} />
              {tx.length === 0 && (
                <div style={{ textAlign: 'center', color: 'var(--tx-4)', fontSize: 12, marginTop: 8 }}>
                  Add transactions to see spending patterns
                </div>
              )}
            </div>
          </div>
          <div className="card">
            <div className="card-hd"><div><h3>By category</h3><div className="sub">{monthLabel} {now.getFullYear()}</div></div></div>
            <div className="card-bd" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
              {categorySpend.length > 0 ? (
                <>
                  <Donut data={categorySpend.slice(0, 6)} />
                  <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {categorySpend.slice(0, 5).map((c) => (
                      <div key={c.id} className="row between" style={{ fontSize: 12 }}>
                        <div className="row" style={{ gap: 8 }}>
                          <span style={{ width: 8, height: 8, borderRadius: 2, background: c.color }} />
                          <span style={{ color: 'var(--tx-2)' }}>{c.label}</span>
                        </div>
                        <span className="num" style={{ fontWeight: 500 }}>Rs {c.amount.toLocaleString('en-IN')}</span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div style={{ color: 'var(--tx-4)', fontSize: 12, textAlign: 'center', padding: '20px 0' }}>
                  No expenses yet this month
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Accounts */}
        {apiAccounts.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            <div className="row between" style={{ marginBottom: 10 }}>
              <div>
                <h3 style={{ margin: 0, fontSize: 13, fontWeight: 500 }}>Accounts</h3>
                <div style={{ fontSize: 12, color: 'var(--tx-3)', marginTop: 2 }}>
                  {apiAccounts.length} account{apiAccounts.length > 1 ? 's' : ''}
                </div>
              </div>
            </div>
            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
              {apiAccounts.map((a, i) => <AccountCard key={a.id} acc={a} colorIdx={i} />)}
            </div>
          </div>
        )}

        {/* Recent + Alerts */}
        <div className="grid" style={{ gridTemplateColumns: '2fr 1fr' }}>
          <div className="card">
            <div className="card-hd">
              <div><h3>Recent transactions</h3><div className="sub">Across all accounts</div></div>
              <div className="right">
                <button className="btn btn-sm" onClick={() => navigate('/transactions')}>View all <Icons.ArrowRight size={12} /></button>
              </div>
            </div>
            <div className="card-bd flush">
              {recent.length > 0
                ? <div className="tx-list">{recent.map((t) => <TxRow key={t.id} tx={t} />)}</div>
                : <div className="empty">No transactions yet — <button className="btn btn-sm" style={{ marginLeft: 4 }} onClick={() => navigate('/add')}>add one</button></div>
              }
            </div>
          </div>

          <div className="col">
            <div className="card">
              <div className="card-hd"><h3>Alerts</h3></div>
              <div className="card-bd" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {alerts.map((a, i) => (
                  <div key={i} className={`bullet ${a.tone}`}>
                    <div className="bullet-ico">{a.icon}</div>
                    <div>
                      <div className="bullet-text">{a.text}</div>
                      <div style={{ fontSize: 11, color: 'var(--tx-3)', marginTop: 2 }}>{a.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="card">
              <div className="card-hd"><h3>This week at a glance</h3></div>
              <div className="card-bd">
                <div style={{ fontSize: 26, fontWeight: 600, letterSpacing: '-0.02em' }} className="num">
                  Rs {weekSpend.toLocaleString('en-IN')}
                </div>
                {prevWeekSpend > 0 && (
                  <div className="row" style={{ fontSize: 12, color: weekDelta < 0 ? 'var(--pos)' : 'var(--neg)', marginTop: 2, gap: 4 }}>
                    {weekDelta < 0 ? <Icons.ArrowDown size={11} /> : <Icons.ArrowUp size={11} />}
                    {Math.abs(weekDelta).toFixed(0)}% {weekDelta < 0 ? 'less' : 'more'} than last week
                  </div>
                )}
                <div style={{ marginTop: 14 }}>
                  <Sparkline values={weekSparkline.length > 0 ? weekSparkline : [0,0,0,0,0,0,0]} color="var(--acc)" height={40} />
                </div>
                <div className="row between" style={{ fontSize: 11, color: 'var(--tx-3)', marginTop: 6 }}>
                  <span>{weekStart}</span><span>{weekEnd}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
