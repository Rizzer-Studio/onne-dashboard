'use client';

import { useEffect, useState } from 'react';
import { RotateCcw, Save } from 'lucide-react';

export function UnsavedChangesGuard() {
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    const markDirty = (event: Event) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      if (target.closest('[data-ignore-dirty="true"]')) return;
      if (target.matches('input, textarea, select') || target.closest('.theme-switch')) setDirty(true);
    };
    window.addEventListener('change', markDirty, true);
    window.addEventListener('input', markDirty, true);
    window.addEventListener('click', markDirty, true);
    return () => {
      window.removeEventListener('change', markDirty, true);
      window.removeEventListener('input', markDirty, true);
      window.removeEventListener('click', markDirty, true);
    };
  }, []);

  if (!dirty) return null;

  return <div className="unsaved-changes-bar" role="status" aria-live="polite">
    <strong>Cuidado! Você tem alterações que não foram salvas</strong>
    <div className="unsaved-actions">
      <button className="unsaved-reset-button" type="button" data-ignore-dirty="true" onClick={() => setDirty(false)}><RotateCcw size={16}/> Redefinir</button>
      <button className="unsaved-save-button" type="button" data-ignore-dirty="true" onClick={() => setDirty(false)}><Save size={16}/> Salvar</button>
    </div>
  </div>;
}
