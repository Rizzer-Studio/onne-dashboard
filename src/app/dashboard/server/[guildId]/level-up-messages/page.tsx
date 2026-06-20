import { PageHeader } from '@/components/AppShell';
import { Settings, Save } from 'lucide-react';

export default function ServerLevelUpMessagesPage() {
  return <>
    <PageHeader title="Mensagens ao subir de nível" description="Configure mensagens automáticas de level up." />
    <section className="card server-config-card">
      <div className="row">
        <div>
          <h2>Mensagem de nível</h2>
          <p>Canal, texto, variáveis e estilo da mensagem.</p>
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
        <button className="btn" type="button"><Save size={16}/> Salvar mensagem</button>
      </div>
    </section>
  </>;
}
