import { PageHeader } from '@/components/AppShell';
import { Settings, Save } from 'lucide-react';

export default function ServerTrapChannelsPage() {
  return <>
    <PageHeader title="Canais de armadilha" description="Configure canais usados para detectar automações, spam e ações suspeitas." />
    <section className="card server-config-card">
      <div className="row">
        <div>
          <h2>Armadilhas ativas</h2>
          <p>Canais invisíveis ou monitorados para detectar comportamento malicioso.</p>
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
        <button className="btn btn-secondary" type="button"><Settings size={16}/> Criar armadilha</button>
        <button className="btn" type="button"><Save size={16}/> Salvar armadilhas</button>
      </div>
    </section>
  </>;
}
