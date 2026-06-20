import { PageHeader } from '@/components/AppShell';
import { Settings, Save } from 'lucide-react';

export default function ServerAutorolePage() {
  return <>
    <PageHeader title="Autorole" description="Configure cargos automáticos ao entrar no servidor." />
    <section className="card server-config-card">
      <div className="row">
        <div>
          <h2>Cargos automáticos</h2>
          <p>Escolha cargos, atraso de aplicação e regras de segurança.</p>
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
        <button className="btn btn-secondary" type="button"><Settings size={16}/> Adicionar cargo</button>
        <button className="btn" type="button"><Save size={16}/> Salvar autorole</button>
      </div>
    </section>
  </>;
}
