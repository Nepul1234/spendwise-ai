interface Props {
  values: number[];
  color?: string;
  height?: number;
  fill?: boolean;
}

export default function Sparkline({ values, color = 'var(--acc)', height = 32, fill = true }: Props) {
  if (!values || values.length === 0) return null;
  const w = 200, h = height;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const stepX = w / (values.length - 1);
  const pts = values.map((v, i) => [i * stepX, h - ((v - min) / range) * (h - 4) - 2]);
  const linePath = pts.map((p, i) => (i === 0 ? 'M' : 'L') + p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ');
  const areaPath = linePath + ` L${w},${h} L0,${h} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ width: '100%', height, display: 'block' }}>
      {fill && (
        <>
          <defs>
            <linearGradient id="spark-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.25" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={areaPath} fill="url(#spark-grad)" />
        </>
      )}
      <path d={linePath} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
