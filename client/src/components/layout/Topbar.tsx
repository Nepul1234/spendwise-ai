import type { ReactNode } from 'react';
import * as Icons from '../icons';

interface Props {
  title: string;
  crumbs?: string[];
  right?: ReactNode;
}

export default function Topbar({ title, crumbs = [], right }: Props) {
  return (
    <div className="topbar">
      {crumbs.length > 0 && (
        <div className="row" style={{ gap: 0 }}>
          {crumbs.map((c, i) => (
            <span key={i}>
              <span className="crumb">{c}</span>
              {i < crumbs.length - 1 && <span className="crumb-sep">/</span>}
            </span>
          ))}
          <span className="crumb-sep">/</span>
        </div>
      )}
      <h1>{title}</h1>
      <div className="right">
        {right}
        <button className="iconbtn"><Icons.Search size={15} /></button>
        <button className="iconbtn"><Icons.Bell size={15} /></button>
      </div>
    </div>
  );
}
