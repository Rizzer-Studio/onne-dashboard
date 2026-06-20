import { PageHeader } from '@/components/AppShell';
import { Settings, Save } from 'lucide-react';

export default function ServerEventLogsPage() {
  return <>
    <PageHeader title="Registro de eventos" description="Registre eventos importantes do servidor." />
    <section className="card server-config-card">
      <div className="row">
        <div>
          <h2>Eventos monitorados</h2>
          <p>Entradas, saídas, mensagens editadas, cargos e canais.</p>
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
        <button className="btn btn-secondary" type="button"><Settings size={16}/> Adicionar evento</button>
        <button className="btn" type="button"><Save size={16}/> Salvar eventos</button>
      </div>
    </section>
  </>;
}
