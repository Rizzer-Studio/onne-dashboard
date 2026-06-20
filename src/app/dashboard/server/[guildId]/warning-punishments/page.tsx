import { PageHeader } from '@/components/AppShell';
import { Settings, Save } from 'lucide-react';

export default function ServerWarningPunishmentsPage() {
  return <>
    <PageHeader title="Punições de avisos" description="Configure punições progressivas baseadas em quantidade de avisos." />
    <section className="card server-config-card">
      <div className="row">
        <div>
          <h2>Escalonamento</h2>
          <p>Defina ações automáticas ao atingir limites de avisos.</p>
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
        <button className="btn btn-secondary" type="button"><Settings size={16}/> Adicionar regra</button>
        <button className="btn" type="button"><Save size={16}/> Salvar punições</button>
      </div>
    </section>
  </>;
}
