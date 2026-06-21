import * as Icons from '../icons';
import type { ApiAccount } from '../../lib/api';

const COLORS = ['#14b8a6', '#22d3ee', '#a78bfa', '#f97316', '#94a3b8', '#60a5fa'];

function accountIcon(name: string) {
  const n = name.toLowerCase();
  if (n.includes('cash'))   return Icons.Cash;
  if (n.includes('wallet') || n.includes('esewa') || n.includes('khalti')) return Icons.Phone;
  if (n.includes('credit')) return Icons.Card;
  return Icons.Bank;
}

function accountType(name: string) {
  const n = name.toLowerCase();
  if (n.includes('cash'))   return 'cash';
  if (n.includes('wallet')) return 'wallet';
  if (n.includes('credit')) return 'card';
  return 'bank';
}

interface Props {
  acc: ApiAccount;
  colorIdx?: number;
  active?: boolean;
  onClick?: () => void;
}

export default function AccountCard({ acc, colorIdx = 0, active, onClick }: Props) {
  const IconC  = accountIcon(acc.name);
  const type   = accountType(acc.name);
  const color  = COLORS[colorIdx % COLORS.length];
  const isNeg  = acc.balance < 0;
  const last4  = acc.lastFourDigits && acc.lastFourDigits !== 'Cash' ? acc.lastFourDigits : null;

  return (
    <div className="card" style={{
      padding: 16, cursor: 'pointer',
      borderColor: active ? 'var(--acc-line)' : undefined,
      boxShadow: active ? '0 0 0 2px var(--acc-glow), var(--sh-1)' : undefined,
    }} onClick={onClick}>
      <div className="row between">
        <div className="row" style={{ gap: 10 }}>
          <div style={{
            width: 30, height: 30, borderRadius: 8,
            background: `color-mix(in oklch, ${color} 18%, var(--bg-3))`,
            color, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <IconC size={15} />
          </div>
          <div>
            <div style={{ fontSize: 12, color: 'var(--tx-2)', fontWeight: 500 }}>{acc.name}</div>
            <div style={{ fontSize: 11, color: 'var(--tx-4)', textTransform: 'uppercase', letterSpacing: 0.5 }}>
              {type}{last4 ? ` · ${last4}` : ''}
            </div>
          </div>
        </div>
      </div>
      <div className="num" style={{
        marginTop: 14, fontSize: 22, fontWeight: 600,
        color: isNeg ? 'var(--neg)' : 'var(--tx-1)', letterSpacing: '-0.02em',
      }}>
        {isNeg ? '−' : ''}Rs {Math.abs(acc.balance).toLocaleString('en-IN')}
      </div>
    </div>
  );
}
