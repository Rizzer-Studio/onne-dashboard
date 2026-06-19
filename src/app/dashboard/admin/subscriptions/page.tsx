import { PageHeader } from '@/components/AppShell';
import { AdminSection, AdminStatus } from '@/components/admin/AdminUI';
import { adminPlans, adminUsers } from '@/lib/admin-data';
import { Ban, CreditCard, PauseCircle, Plus } from 'lucide-react';

export default function AdminSubscriptionsPage() {
  return (
    <>
      <PageHeader title="Assinaturas" description="Gerencie planos, preços e assinaturas dos usuários. Permite adicionar, remover ou pausar temporariamente." />
      <AdminSection title="Planos disponíveis" description="Controle nome, preço, ciclo e status de cada assinatura.">
        <div className="admin-plan-actions">
          {adminPlans.map((plan) => (
            <button className="admin-management-card" key={plan.name}>
              <CreditCard size={18}/><strong>{plan.name}</strong><span>{plan.price} • {plan.cycle} • {plan.users} usuários</span><AdminStatus value={plan.status}/>
            </button>
          ))}
        </div>
      </AdminSection>

      <AdminSection title="Controle manual de assinatura" description="Use para suporte, correção administrativa ou ações internas da equipe Onne.">
        <div className="admin-plan-actions">
          <button className="admin-management-card"><Plus size={18}/><strong>Adicionar assinatura</strong><span>Aplicar plano manualmente a um usuário.</span></button>
          <button className="admin-management-card"><PauseCircle size={18}/><strong>Pausar assinatura</strong><span>Congelar temporariamente sem remover histórico.</span></button>
          <button className="admin-management-card danger"><Ban size={18}/><strong>Remover assinatura</strong><span>Cancelar acesso premium de forma administrativa.</span></button>
        </div>
        <div className="admin-table wide">
          <div className="admin-table-head admin-subscription-head"><span>ID</span><span>Nome</span><span>Plano atual</span><span>Adquiriu</span><span>Término</span><span>Status</span><span>Ações</span></div>
          {adminUsers.map((user) => (
            <div className="admin-table-row admin-subscription-row" key={user.id}>
              <strong>{user.id}</strong><span>{user.name}</span><span>{user.plan}</span><span>{user.started}</span><span>{user.ends}</span><AdminStatus value={user.status}/><span><button>Alterar</button><button>Pausar</button></span>
            </div>
          ))}
        </div>
      </AdminSection>
    </>
  );
}
