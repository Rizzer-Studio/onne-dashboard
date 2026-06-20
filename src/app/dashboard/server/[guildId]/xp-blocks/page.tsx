import { PageHeader } from '@/components/AppShell';
import { Settings, Save } from 'lucide-react';

export default function ServerXpBlocksPage() {
  return <>
    <PageHeader title="Bloqueios de XP" description="Configure onde e quem não recebe XP." />
    <section className="card server-config-card">
      <div className="row">
        <div>
          <h2>Bloqueios ativos</h2>
          <p>Bloqueie canais, cargos e usuários do sistema de XP.</p>
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
        <button className="btn btn-secondary" type="button"><Settings size={16}/> Adicionar bloqueio</button>
        <button className="btn" type="button"><Save size={16}/> Salvar bloqueios</button>
      </div>
    </section>
  </>;
}
