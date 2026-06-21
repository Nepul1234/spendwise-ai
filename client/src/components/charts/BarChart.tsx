import type { SpendDay } from '../../types';

interface Props {
  data: SpendDay[];
  height?: number;
  color?: string;
}

export default function BarChart({ data, height = 200, color = 'var(--acc)' }: Props) {
  const max = Math.max(...data.map((d) => d.spend));
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height, padding: '8px 0' }}>
      {data.map((d, i) => {
        const h = Math.max(2, (d.spend / max) * (height - 24));
        const dt = new Date(d.date);
        const isWeekend = dt.getDay() === 0 || dt.getDay() === 6;
        return (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, minWidth: 0 }}>
            <div style={{
              width: '100%', height: h,
              background: isWeekend ? 'color-mix(in oklch, var(--acc) 60%, transparent)' : color,
              borderRadius: '3px 3px 0 0', opacity: 0.85,
            }} title={`${d.date}: Rs ${d.spend}`} />
            {(i % 5 === 0 || i === data.length - 1) && (
              <div style={{ fontSize: 9, color: 'var(--tx-4)', whiteSpace: 'nowrap' }}>
                {dt.getDate()}/{dt.getMonth() + 1}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
