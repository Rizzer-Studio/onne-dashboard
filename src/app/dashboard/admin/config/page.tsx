import { PageHeader } from '@/components/AppShell';

const titles: Record<string, string> = {
  config: 'Configurações Admin',
  notices: 'Avisos',
  store: 'Gerenciamento da Loja',
  coupons: 'Cupons',
  users: 'Usuários',
  subscriptions: 'Assinaturas',
  audit: 'Auditoria',
  count: 'Contagem e Métricas',
};

export default function AdminSubPage() {
  const key = 'config';
  return (
    <>
      <PageHeader title={titles[key]} description="Área administrativa preparada para integração real com banco, permissões, loja, assinaturas e auditoria do Onne." />
      <section className="card">
        <h3>{titles[key]}</h3>
        <p>Este módulo já está separado na nova arquitetura /dashboard/admin/config. No MVP ele funciona como base visual para o CRUD e as integrações reais.</p>
        <div className="admin-action-row" style={{ marginTop: 18 }}>
          <button className="btn">Criar registro</button>
          <button className="btn btn-secondary">Gerenciar</button>
        </div>
      </section>
    </>
  );
}
