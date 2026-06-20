import { PageHeader } from '@/components/AppShell';
import { ModuleCard } from '@/components/Cards';
import { modules } from '@/lib/data';

export default function ServerModulesPage() {
  return <>
    <PageHeader title="Módulos do servidor" description="Controle quais funções do bot estarão disponíveis neste servidor." />
    <div className="grid grid-3">{modules.map(([title, description, active, Icon]) => <ModuleCard key={title} icon={Icon} title={title} description={description} active={active} />)}</div>
  </>;
}
