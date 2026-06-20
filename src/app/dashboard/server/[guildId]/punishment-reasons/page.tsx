import { PageHeader } from '@/components/AppShell';
import { Settings, Save } from 'lucide-react';

export default function ServerPunishmentReasonsPage() {
  return <>
    <PageHeader title="Motivos de punição" description="Cadastre motivos rápidos para ações de moderação." />
    <section className="card server-config-card">
      <div className="row">
        <div>
          <h2>Motivos padrões</h2>
          <p>Crie motivos reutilizáveis para ban, mute, kick e advertências.</p>
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
        <button className="btn btn-secondary" type="button"><Settings size={16}/> Novo motivo</button>
        <button className="btn" type="button"><Save size={16}/> Salvar motivos</button>
      </div>
    </section>
  </>;
}
