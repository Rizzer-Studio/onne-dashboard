import { PageHeader } from '@/components/AppShell';
import { Settings, Save } from 'lucide-react';

export default function ServerMemberCounterPage() {
  return <>
    <PageHeader title="Contador de membros" description="Configure canais de contagem de membros, bots e status do servidor." />
    <section className="card server-config-card">
      <div className="row">
        <div>
          <h2>Contadores ativos</h2>
          <p>Canais dinâmicos para membros totais, humanos, bots e online.</p>
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
        <button className="btn btn-secondary" type="button"><Settings size={16}/> Criar contador</button>
        <button className="btn" type="button"><Save size={16}/> Salvar contadores</button>
      </div>
    </section>
  </>;
}
