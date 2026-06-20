import { PageHeader } from '@/components/AppShell';
import { Settings, Save } from 'lucide-react';

export default function ServerXpBonusPage() {
  return <>
    <PageHeader title="Bônus de XP" description="Configure multiplicadores e eventos de XP." />
    <section className="card server-config-card">
      <div className="row">
        <div>
          <h2>Multiplicadores</h2>
          <p>Bônus por cargo, canal, período ou campanha especial.</p>
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
        <button className="btn btn-secondary" type="button"><Settings size={16}/> Adicionar bônus</button>
        <button className="btn" type="button"><Save size={16}/> Salvar bônus</button>
      </div>
    </section>
  </>;
}
