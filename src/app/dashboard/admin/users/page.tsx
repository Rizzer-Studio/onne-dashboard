import { PageHeader } from '@/components/AppShell';
import { AdminSection, AdminStatus } from '@/components/admin/AdminUI';
import { adminUsers } from '@/lib/admin-data';
import { Search, UserCheck } from 'lucide-react';

export default function AdminUsersPage() {
  return (
    <>
      <PageHeader title="Usuários" description="Cada usuário possui um ID exclusivo para auditoria, compras, assinatura, advertências e banimentos." />
      <AdminSection title="Monitoramento de usuários" description="Consulte plano, compras, status e ações administrativas por ID único.">
        <div className="admin-toolbar">
          <div className="admin-search"><Search size={16}/><input placeholder="Buscar por ID, nome, plano ou status..." /></div>
          <button className="btn btn-secondary"><UserCheck size={16}/> Ver autorizados</button>
        </div>
        <div className="admin-table wide">
          <div className="admin-table-head admin-users-head"><span>ID único</span><span>Nome</span><span>Plano</span><span>Compras</span><span>Advertências</span><span>Status</span><span>Ações</span></div>
          {adminUsers.map((user) => (
            <div className="admin-table-row admin-users-row" key={user.id}>
              <strong>{user.id}</strong><span>{user.name}</span><span>{user.plan}</span><span>{user.purchases}</span><span>{user.warnings}</span><AdminStatus value={user.status}/><span><button>Detalhes</button><button>Advertir</button><button>Banir</button></span>
            </div>
          ))}
        </div>
      </AdminSection>
    </>
  );
}
