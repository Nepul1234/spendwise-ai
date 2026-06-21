import * as Icons from '../icons';
import type { Toast } from '../../types';

interface Props {
  toasts: Toast[];
  onClose: (id: number) => void;
}

export default function ToastHost({ toasts, onClose }: Props) {
  return (
    <div className="toast-wrap">
      {toasts.map((t) => (
        <div key={t.id} className={`toast ${t.kind ?? ''}`}>
          <div className={`toast-ico ${t.kind === 'ai' || t.aiTone ? 'ai' : ''}`}>
            {t.kind === 'ai' || t.aiTone ? <Icons.Stars size={13} /> : <Icons.Check size={13} />}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="toast-title">{t.title}</div>
            {t.msg && <div className="toast-msg">{t.msg}</div>}
          </div>
          <button className="toast-close" onClick={() => onClose(t.id)}>
            <Icons.Close size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
