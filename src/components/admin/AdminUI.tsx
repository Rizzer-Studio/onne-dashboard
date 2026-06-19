import type { ReactNode } from 'react';

export function AdminSection({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return (
    <section className="admin-section card">
      <div className="admin-section-header">
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

export function AdminStatus({ value }: { value: string }) {
  const isGood = ['Ativo', 'Base', 'Baixo'].includes(value);
  const isWarn = ['Observação', 'Agendado', 'Médio', 'Pausado'].includes(value);
  return <span className={`admin-status ${isGood ? 'ok' : ''} ${isWarn ? 'warn' : ''}`}>{value}</span>;
}
