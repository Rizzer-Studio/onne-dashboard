import { PageHeader } from '@/components/AppShell';
import { Settings, Save } from 'lucide-react';

export default function ServerYoutubeNotificationsPage() {
  return <>
    <PageHeader title="Notificações do YouTube" description="Configure avisos automáticos de vídeos e lives do YouTube." />
    <section className="card server-config-card">
      <div className="row">
        <div>
          <h2>Canais monitorados</h2>
          <p>Adicione canais do YouTube e defina onde publicar notificações.</p>
        </div>
        <span className="status">Configuração</span>
      </div>
      <div className="config-placeholder">
        <Settings size={22} />
        <div>
          <strong>Configuração individual em desenvolvimento</strong>
          <span>Esta página já está separada para receber os campos reais deste recurso do bot Onne.</span>
        </div>
      </div>
      <div className="actions">
        <button className="btn btn-secondary" type="button"><Settings size={16}/> Adicionar canal</button>
        <button className="btn" type="button"><Save size={16}/> Salvar YouTube</button>
      </div>
    </section>
  </>;
}
