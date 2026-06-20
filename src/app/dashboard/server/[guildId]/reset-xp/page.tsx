import { PageHeader } from '@/components/AppShell';
import { Settings, Save } from 'lucide-react';

export default function ServerResetXpPage() {
  return <>
    <PageHeader title="Resetar XP" description="Ferramentas para resetar XP com segurança." />
    <section className="card server-config-card">
      <div className="row">
        <div>
          <h2>Reset controlado</h2>
          <p>Reset por usuário, cargo, servidor ou período com confirmação.</p>
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
        <button className="btn btn-secondary" type="button"><Settings size={16}/> Pré-visualizar reset</button>
        <button className="btn" type="button"><Save size={16}/> Executar reset</button>
      </div>
    </section>
  </>;
}
