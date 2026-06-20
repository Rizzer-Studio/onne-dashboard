import { PageHeader } from '@/components/AppShell';
import { MetricCard } from '@/components/Cards';
import { Banknote, Coins, Gem, Pickaxe } from 'lucide-react';

export default function ServerEconomyPage() {
  return <>
    <PageHeader title="Economia/RPG" description="Configure carteira, banco, profissões, mineração, fazenda e recompensas do servidor." />
    <div className="grid grid-4">
      <MetricCard icon={Coins} title="Moedas" value="2.4M" description="Total circulando no servidor." />
      <MetricCard icon={Gem} title="Diamantes" value="98K" description="Diamantes obtidos por usuários." />
      <MetricCard icon={Banknote} title="Transações" value="1.286" description="Movimentações recentes." />
      <MetricCard icon={Pickaxe} title="RPG" value="Ativo" description="Profissões, minas e fazenda habilitados." />
    </div>
  </>;
}
