import { PageHeader } from '@/components/AppShell';
import { Settings, Save } from 'lucide-react';

export default function ServerInviteBlockerPage() {
  return <>
    <PageHeader title="Bloqueador de convites" description="Bloqueie convites externos e proteja o servidor contra divulgação indevida." />
    <section className="card server-config-card">
      <div className="row">
        <div>
          <h2>Proteção de convites</h2>
          <p>Defina whitelist, punição e canais ignorados.</p>
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
        <button className="btn btn-secondary" type="button"><Settings size={16}/> Adicionar exceção</button>
        <button className="btn" type="button"><Save size={16}/> Salvar proteção</button>
      </div>
    </section>
  </>;
}
