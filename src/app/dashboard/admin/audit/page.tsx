import { PageHeader } from '@/components/AppShell';
import { AdminSection } from '@/components/admin/AdminUI';
import { adminAuditEvents } from '@/lib/admin-data';
import { CalendarClock, ShieldAlert, Sparkles } from 'lucide-react';

export default function AdminAuditPage() {
  return (
    <>
      <PageHeader title="Auditoria e segurança" description="Acompanhe ações relevantes e aplique medidas administrativas quando houver comportamento malicioso." />
      <AdminSection title="Eventos auditáveis" description="Histórico visual preparado para conectar logs reais de compras, pagamentos, ações suspeitas e moderação administrativa.">
        <div className="admin-audit-list">
          {adminAuditEvents.map((event) => (
            <div className="admin-audit-item" key={`${event.user}-${event.action}`}>
              <ShieldAlert size={18}/><div><strong>{event.user} • {event.action}</strong><span>{event.detail} • {event.date}</span></div><em className={event.risk === 'Médio' ? 'warn' : ''}>{event.risk}</em>
            </div>
          ))}
        </div>
        <div className="admin-action-row"><button className="btn btn-secondary"><CalendarClock size={16}/> Exportar logs</button><button className="btn"><Sparkles size={16}/> Abrir investigação</button></div>
      </AdminSection>
    </>
  );
}
