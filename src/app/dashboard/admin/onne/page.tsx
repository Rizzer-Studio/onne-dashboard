import { PageHeader } from '@/components/AppShell';
import { AdminSection } from '@/components/admin/AdminUI';
import { Bot, Clock3, Image, MessageSquareText, Save, Sparkles } from 'lucide-react';

export default function AdminOnnePage() {
  return (
    <>
      <PageHeader title="Onne" description="Configure a identidade visual e mensagens internas do Onne usadas no site, previews e comunicações futuras." />

      <div className="admin-dashboard-grid">
        <AdminSection title="Visual do Onne" description="Área preparada para trocar foto, nome, badge APP e texto base do Onne em datas comemorativas ou campanhas.">
          <div className="admin-form-grid">
            <label className="admin-field">Foto perfil Onne<input defaultValue="Logo Onne padrão" /></label>
            <label className="admin-field">Nome<input defaultValue="Onne" /></label>
            <label className="admin-field">Badge<input defaultValue="APP" /></label>
            <label className="admin-field">Hora<input defaultValue="Atual automática" /></label>
            <label className="admin-field full">Texto correspondente<textarea defaultValue="Olá! Eu sou o Onne. Use este espaço para configurar mensagens, campanhas e textos sazonais do projeto." /></label>
          </div>
          <div className="admin-action-row"><button className="btn btn-primary"><Save size={16}/> Salvar visual</button><button className="btn btn-secondary"><Sparkles size={16}/> Criar campanha</button></div>
        </AdminSection>

        <AdminSection title="Preview futuro do chat" description="Este preview será usado como base para cards do chat do bot e mensagens comemorativas.">
          <div className="onne-chat-preview">
            <div className="onne-chat-avatar"><Bot size={30}/></div>
            <div className="onne-chat-content">
              <div className="onne-chat-header"><strong>Onne</strong><span>APP</span><em>Agora</em></div>
              <p>Olá! Eu sou o Onne. Este texto poderá ser alterado pelo painel admin para campanhas, avisos e datas comemorativas.</p>
              <div className="onne-chat-meta"><MessageSquareText size={15}/> Preview de mensagem <Clock3 size={15}/> Hora atual automática <Image size={15}/> Visual personalizável</div>
            </div>
          </div>
        </AdminSection>
      </div>
    </>
  );
}
