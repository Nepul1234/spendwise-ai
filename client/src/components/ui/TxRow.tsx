import { categories } from '../../lib/sampleData';
import { categoryIcon } from '../icons';
import * as Icons from '../icons';
import type { Transaction } from '../../types';

function formatDate(iso: string) {
  const d = new Date(iso);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dDay = new Date(d);
  dDay.setHours(0, 0, 0, 0);
  const diff = (today.getTime() - dDay.getTime()) / 86400000;
  if (diff === 0) return 'Today';
  if (diff === 1) return 'Yesterday';
  if (diff < 7) return d.toLocaleDateString('en-US', { weekday: 'short' });
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

interface Props {
  tx: Transaction;
  onDelete?: (id: string) => void;
}

export default function TxRow({ tx, onDelete }: Props) {
  // Support both sampleData category IDs and backend category names
  const cat = categories.find((c) => c.id === tx.category);
  const catLabel = cat?.label ?? tx.category;
  const catColor = cat?.color;
  const CatIcon = categoryIcon(tx.category);
  const isPos = tx.type === 'INCOME';
  const isTransfer = tx.type === 'TRANSFER';

  return (
    <div className="tx-row">
      <div className="tx-ico" style={{ color: catColor }}>
        <CatIcon size={16} />
        <div className="dot" style={{ background: 'var(--tx-3)' }} />
      </div>
      <div style={{ minWidth: 0 }}>
        <div className="tx-merchant">{tx.merchant}</div>
        <div className="tx-sub">
          <span>{catLabel}</span>
          {tx.account && (
            <>
              <span className="dot-sep" />
              <span>{tx.account}</span>
            </>
          )}
          {tx.note && (
            <>
              <span className="dot-sep" />
              <span style={{ color: 'var(--tx-4)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{tx.note}</span>
            </>
          )}
        </div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div className={`tx-amount num ${isPos ? 'pos' : isTransfer ? 'transfer' : 'neg'}`}>
          {isPos ? '+' : isTransfer ? '' : '−'}Rs {Math.abs(tx.amount).toLocaleString('en-IN')}
        </div>
        <div className="tx-date">{formatDate(tx.date)} · {tx.time}</div>
      </div>
      <div className="tx-actions">
        {onDelete && (
          <button className="iconbtn" onClick={(e) => { e.stopPropagation(); onDelete(tx.id); }} title="Delete">
            <Icons.Trash size={13} />
          </button>
        )}
      </div>
    </div>
  );
}
