import { PageHeader } from '@/components/AppShell';
import { Settings, Save } from 'lucide-react';

export default function ServerPunishmentLogsPage() {
  return <>
    <PageHeader title="Registro de punições" description="Registre ações de moderação aplicadas no servidor." />
    <section className="card server-config-card">
      <div className="row">
        <div>
          <h2>Canal de punições</h2>
          <p>Defina canal, formato do log e envio por DM ao usuário punido.</p>
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
        <button className="btn btn-secondary" type="button"><Settings size={16}/> Enviar teste</button>
        <button className="btn" type="button"><Save size={16}/> Salvar registro</button>
      </div>
    </section>
  </>;
}
