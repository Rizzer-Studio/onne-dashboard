import { PageHeader } from '@/components/AppShell';
import { MetricCard } from '@/components/Cards';
import { Activity, Bot, Gauge, Server, ShieldCheck, Users } from 'lucide-react';
import Link from 'next/link';

export default async function ServerOverviewPage({ params }: { params: Promise<{ guildId: string }> }) {
  const { guildId } = await params;
  return <>
    <PageHeader title="Dashboard do servidor" description="Gerencie as funções do Onne aplicadas apenas neste servidor." />
    <div className="grid grid-4">
      <MetricCard icon={Bot} title="Bot" value="Online" description="Onne conectado e pronto para executar comandos." />
      <MetricCard icon={Users} title="Membros" value="12.430" description="Total de membros monitorados neste servidor." />
      <MetricCard icon={Gauge} title="Latência" value="42ms" description="Tempo médio de resposta da API e gateway." />
      <MetricCard icon={Activity} title="Comandos" value="1.284" description="Comandos executados nos últimos 7 dias." />
    </div>
    <section className="card" style={{marginTop:20}}>
      <div className="row"><div><h2>Gerenciamento rápido</h2><p>Acesse rapidamente as principais configurações do bot neste servidor.</p></div><span className="status">Servidor #{guildId}</span></div>
      <div className="grid grid-3" style={{marginTop:18}}>
        <Link className="quick-action-card" href={`/dashboard/server/${guildId}/premium`}><ShieldCheck size={20}/><strong>Premium</strong><span>Benefícios e limites premium do servidor.</span></Link>
        <Link className="quick-action-card" href={`/dashboard/server/${guildId}/command-channels`}><Server size={20}/><strong>Canais de comandos</strong><span>Permita ou bloqueie comandos por canal.</span></Link>
        <Link className="quick-action-card" href={`/dashboard/server/${guildId}/xp-rewards`}><Activity size={20}/><strong>Recompensas XP</strong><span>Cargos e benefícios por nível.</span></Link>
      </div>
    </section>
  </>;
}
