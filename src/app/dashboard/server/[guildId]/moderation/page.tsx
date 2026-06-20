import { PageHeader } from '@/components/AppShell';
import { MetricCard } from '@/components/Cards';
import { Ban, MessageSquareWarning, Shield, ShieldAlert } from 'lucide-react';

export default function ServerModerationPage() {
  return <>
    <PageHeader title="Moderação" description="Configure punições, anti-spam, palavras bloqueadas e logs de segurança." />
    <div className="grid grid-4">
      <MetricCard icon={Shield} title="AutoMod" value="Ativo" description="Proteção automática em execução." />
      <MetricCard icon={MessageSquareWarning} title="Anti-spam" value="Ativo" description="Mensagens repetidas são monitoradas." />
      <MetricCard icon={Ban} title="Punições" value="32" description="Ações nos últimos 30 dias." />
      <MetricCard icon={ShieldAlert} title="Alertas" value="4" description="Pontos que precisam de revisão." />
    </div>
  </>;
}
