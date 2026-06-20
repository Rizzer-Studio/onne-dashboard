import { PageHeader } from '@/components/AppShell';
import { Settings, Save } from 'lucide-react';

export default function ServerPremiumPage() {
  return <>
    <PageHeader title="Premium" description="Controle recursos premium liberados para este servidor." />
    <section className="card server-config-card">
      <div className="row">
        <div>
          <h2>Plano ativo</h2>
          <p>Status premium, limite de recursos e benefícios liberados.</p>
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
        <button className="btn btn-secondary" type="button"><Settings size={16}/> Ativar plano</button>
        <button className="btn" type="button"><Save size={16}/> Validar assinatura</button>
      </div>
    </section>
  </>;
}
