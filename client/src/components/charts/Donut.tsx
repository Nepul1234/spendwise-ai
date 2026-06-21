import type { CategorySpend } from '../../types';

interface Props {
  data: CategorySpend[];
  size?: number;
  thickness?: number;
}

export default function Donut({ data, size = 160, thickness = 18 }: Props) {
  const total = data.reduce((s, d) => s + d.amount, 0);
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  let offset = 0;

  return (
    <svg viewBox={`0 0 ${size} ${size}`} style={{ width: size, height: size }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--bg-3)" strokeWidth={thickness} />
      {data.map((d, i) => {
        const frac = d.amount / total;
        const len = c * frac;
        const dash = `${len} ${c - len}`;
        const start = -offset;
        offset += len;
        return (
          <circle key={i}
            cx={size / 2} cy={size / 2} r={r}
            fill="none" stroke={d.color} strokeWidth={thickness}
            strokeDasharray={dash} strokeDashoffset={start}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            strokeLinecap="butt"
          />
        );
      })}
      <text x={size / 2} y={size / 2 - 6} textAnchor="middle"
            fontSize="11" fill="var(--tx-3)" style={{ textTransform: 'uppercase' as const, letterSpacing: 0.5, fontWeight: 500 }}>
        Spent
      </text>
      <text x={size / 2} y={size / 2 + 14} textAnchor="middle"
            fontSize="18" fontWeight="600" fill="var(--tx-1)" className="num">
        Rs {(total / 1000).toFixed(1)}k
      </text>
    </svg>
  );
}
