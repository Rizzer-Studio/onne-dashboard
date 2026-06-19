import { PageHeader } from '@/components/AppShell';
import { AdminSection, AdminStatus } from '@/components/admin/AdminUI';
import { adminNotices } from '@/lib/admin-data';
import { Eye, Megaphone } from 'lucide-react';

export default function AdminNoticesPage() {
  return (
    <>
      <PageHeader title="Avisos" description="Crie e organize avisos que aparecem automaticamente no lugar do banner ONNE INFO para os usuários." />
      <AdminSection title="Gerenciamento de avisos" description="Controle título, mensagem, público e status de publicação.">
        <div className="admin-form-grid">
          <label className="admin-field"><span>Título do aviso</span><input defaultValue="Novo recurso de cores" /></label>
          <label className="admin-field"><span>Status</span><select defaultValue="active"><option value="active">Ativo</option><option value="scheduled">Agendado</option><option value="disabled">Desativado</option></select></label>
          <label className="admin-field full"><span>Mensagem</span><textarea defaultValue="Novo recurso de cores para o seu perfil!" /></label>
        </div>
        <div className="admin-action-row"><button className="btn"><Megaphone size={16}/> Publicar aviso</button><button className="btn btn-secondary"><Eye size={16}/> Pré-visualizar</button></div>
      </AdminSection>
      <AdminSection title="Avisos cadastrados" description="Lista visual dos avisos preparados para integração com banco.">
        <div className="admin-table">
          <div className="admin-table-head"><span>Título</span><span>Mensagem</span><span>Público</span><span>Status</span></div>
          {adminNotices.map((notice) => <div className="admin-table-row" key={notice.title}><strong>{notice.title}</strong><span>{notice.message}</span><span>{notice.audience}</span><AdminStatus value={notice.status}/></div>)}
        </div>
      </AdminSection>
    </>
  );
}
