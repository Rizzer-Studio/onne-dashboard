import Link from 'next/link';
import { PageHeader } from '@/components/AppShell';
import { AdminSection } from '@/components/admin/AdminUI';
import { adminStats, adminNotices, adminAuditEvents } from '@/lib/admin-data';
import { Activity, BellRing, Coins, Megaphone, ShieldCheck, ShoppingBag, Sparkles, Users, BadgePercent, CreditCard, UserCog } from 'lucide-react';

const quickLinks = [
  { title: 'Avisos', description: 'Publicar banners ONNE INFO por público e status.', href: '/dashboard/admin/notices', icon: Megaphone },
  { title: 'Loja', description: 'Preço, moeda, disponibilidade e itens vendidos.', href: '/dashboard/admin/store', icon: ShoppingBag },
  { title: 'Usuários', description: 'ID único, compras, advertências e banimentos.', href: '/dashboard/admin/users', icon: UserCog },
  { title: 'Assinaturas', description: 'Planos, preços e controle manual de assinatura.', href: '/dashboard/admin/subscriptions', icon: CreditCard },
  { title: 'Cupons', description: 'Cupons temporários e cards promocionais.', href: '/dashboard/admin/coupons', icon: BadgePercent },
  { title: 'Auditoria', description: 'Logs, riscos e investigação administrativa.', href: '/dashboard/admin/audit', icon: Activity },
];

export default function AdminPage() {
  return (
    <>
      <PageHeader
        title="Dashboard Administrador"
        description="Visão geral do painel admin do Onne. Os módulos detalhados ficam separados por página para facilitar manutenção, permissão e integração real."
      />

      <div className="admin-dev-access-banner">
        <ShieldCheck size={20} />
        <div>
          <strong>Acesso admin liberado para desenvolvimento</strong>
          <span>Em produção, validar por ID exclusivo, equipe Onne ou cargo autorizado.</span>
        </div>
      </div>

      <div className="admin-stat-grid">
        {adminStats.map((stat) => (
          <div className="admin-stat-card" key={stat.label}>
            <Sparkles size={20} />
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
          </div>
        ))}
      </div>

      <AdminSection title="Atalhos administrativos" description="Acesse cada área do painel admin sem misturar sistemas na visão geral.">
        <div className="admin-roadmap-grid">
          {quickLinks.map((item) => (
            <Link className="admin-overview-link" href={item.href} key={item.href}>
              <item.icon size={20} />
              <strong>{item.title}</strong>
              <span>{item.description}</span>
            </Link>
          ))}
        </div>
      </AdminSection>

      <div className="admin-dashboard-grid">
        <AdminSection title="Avisos ativos" description="Resumo dos anúncios que podem substituir o banner ONNE INFO para os usuários.">
          <div className="admin-coupon-list">
            {adminNotices.map((notice) => (
              <div className="admin-coupon-card" key={notice.title}>
                <BellRing size={18} />
                <div><strong>{notice.title}</strong><span>{notice.message} • {notice.status} • {notice.audience}</span></div>
              </div>
            ))}
          </div>
          <Link className="btn" href="/dashboard/admin/notices"><Megaphone size={16}/> Gerenciar avisos</Link>
        </AdminSection>

        <AdminSection title="Eventos recentes" description="Últimas ações relevantes para acompanhamento rápido.">
          <div className="admin-audit-list">
            {adminAuditEvents.slice(0, 3).map((event) => (
              <div className="admin-audit-item" key={`${event.user}-${event.action}`}>
                <Activity size={18}/>
                <div><strong>{event.user} • {event.action}</strong><span>{event.detail} • {event.date}</span></div>
                <em className={event.risk === 'Médio' ? 'warn' : ''}>{event.risk}</em>
              </div>
            ))}
          </div>
          <Link className="btn btn-secondary" href="/dashboard/admin/audit"><Coins size={16}/> Abrir auditoria</Link>
        </AdminSection>
      </div>
    </>
  );
}
