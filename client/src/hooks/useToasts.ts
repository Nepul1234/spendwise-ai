import { useState, useRef } from 'react';
import type { Toast } from '../types';

type PushInput = Omit<Toast, 'id'>;

export function useToasts() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const idRef = useRef(0);

  const push = (t: PushInput) => {
    const id = ++idRef.current;
    setToasts((arr) => [...arr, { id, ...t }]);
    if (t.duration !== 0) {
      setTimeout(() => setToasts((arr) => arr.filter((x) => x.id !== id)), t.duration ?? 4200);
    }
    return id;
  };

  const close = (id: number) => setToasts((arr) => arr.filter((x) => x.id !== id));

  return { toasts, push, close };
}
