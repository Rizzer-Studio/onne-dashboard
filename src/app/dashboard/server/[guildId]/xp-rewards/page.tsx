import { PageHeader } from '@/components/AppShell';
import { Settings, Save } from 'lucide-react';

export default function ServerXpRewardsPage() {
  return <>
    <PageHeader title="Recompensas por XP" description="Configure cargos e benefícios por nível." />
    <section className="card server-config-card">
      <div className="row">
        <div>
          <h2>Recompensas</h2>
          <p>Defina cargos, moedas ou benefícios ao atingir níveis.</p>
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
        <button className="btn btn-secondary" type="button"><Settings size={16}/> Adicionar recompensa</button>
        <button className="btn" type="button"><Save size={16}/> Salvar recompensas</button>
      </div>
    </section>
  </>;
}
