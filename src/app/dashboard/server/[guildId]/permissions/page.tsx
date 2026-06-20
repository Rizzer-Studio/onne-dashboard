import { PageHeader } from '@/components/AppShell';

export default function ServerPermissionsPage() {
  return <>
    <PageHeader title="Permissões" description="Controle quais cargos podem usar e configurar recursos do bot." />
    <section className="card table-card"><div className="admin-table"><div className="admin-table-head"><span>Cargo</span><span>Módulo</span><span>Usar</span><span>Configurar</span></div>{[['Admin','Todos','Sim','Sim'],['Moderador','Moderação','Sim','Sim'],['Membro','XP/RPG','Sim','Não']].map((row,rowIndex)=><div className="admin-table-row" key={`permission-row-${rowIndex}`}>{row.map((cell,cellIndex)=><span key={`permission-cell-${rowIndex}-${cellIndex}`}>{cell}</span>)}</div>)}</div></section>
  </>;
}
