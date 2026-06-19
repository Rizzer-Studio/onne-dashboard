import { PageHeader } from '@/components/AppShell';
import { ServerCard } from '@/components/Cards';
import { servers } from '@/lib/data';
export default function Page(){return <><PageHeader title="Meus Servidores" description="Escolha o servidor que deseja gerenciar com o Onne."/><div className="row" style={{marginBottom:18}}><button className="btn btn-primary">Atualizar lista</button><button className="btn btn-secondary">Convidar Onne</button></div><div className="grid grid-3">{servers.map(s=><ServerCard key={s.id} {...s}/>)}</div></>}
