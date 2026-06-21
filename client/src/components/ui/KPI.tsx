import type { ReactNode } from 'react';
import * as Icons from '../icons';

interface Props {
  label: string;
  value: number | string;
  delta?: string;
  deltaTone?: 'pos' | 'neg' | 'neutral';
  sub?: string;
  spark?: ReactNode;
  prefix?: string;
}

export default function KPI({ label, value, delta, deltaTone = 'neutral', sub, spark, prefix = 'Rs ' }: Props) {
  return (
    <div className="card kpi">
      <div className="kpi-label">{label}</div>
      <div className="kpi-value num">
        {prefix && <span style={{ color: 'var(--tx-3)', fontWeight: 500, fontSize: 16, marginRight: 4 }}>{prefix}</span>}
        {typeof value === 'number' ? value.toLocaleString('en-IN') : value}
      </div>
      {delta != null && (
        <div className="kpi-delta">
          <span className={deltaTone === 'pos' ? 'pos' : deltaTone === 'neg' ? 'neg' : ''}>
            {deltaTone === 'pos' && <Icons.ArrowUp size={11} />}
            {deltaTone === 'neg' && <Icons.ArrowDown size={11} />}
            {delta}
          </span>
          {sub && <span style={{ color: 'var(--tx-4)' }}>·</span>}
          {sub && <span>{sub}</span>}
        </div>
      )}
      {spark && <div className="kpi-spark">{spark}</div>}
    </div>
  );
}
