import { PageHeader } from '@/components/AppShell';
import { MetricCard } from '@/components/Cards';
import { Badge, HeartHandshake, UserRound, Users } from 'lucide-react';

export default function ServerSocialPage() {
  return <>
    <PageHeader title="Social" description="Gerencie perfil social, amizades, badges, reputação e recursos de comunidade." />
    <div className="grid grid-4">
      <MetricCard icon={Users} title="Perfis" value="8.420" description="Usuários com perfil criado." />
      <MetricCard icon={HeartHandshake} title="Amizades" value="1.920" description="Laços sociais ativos." />
      <MetricCard icon={Badge} title="Insígnias" value="14" description="Insígnias disponíveis." />
      <MetricCard icon={UserRound} title="Reputação" value="Ativa" description="Sistema de Rep habilitado." />
    </div>
  </>;
}
