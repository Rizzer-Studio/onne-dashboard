import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

export function MetricCard({ icon: Icon, title, value, description }: { icon: LucideIcon; title: string; value: string; description: string }) {
  return <article className="card"><div className="icon-box"><Icon size={22}/></div><h3>{title}</h3><div className="metric">{value}</div><p>{description}</p></article>
}

export function ModuleCard({ icon: Icon, title, description, active }: { icon: LucideIcon; title: string; description: string; active: boolean }) {
  return <article className="card"><div className="row"><div className="icon-box"><Icon size={22}/></div><div className={active ? 'switch on' : 'switch'} /></div><h3>{title}</h3><p>{description}</p><div style={{marginTop:18}} className="row"><button className="btn btn-secondary">Configurar</button><button className={active ? 'btn btn-danger' : 'btn btn-success'}>{active ? 'Desativar' : 'Ativar'}</button></div></article>
}

export function ServerCard({ id, name, members, bot, plan, icon }: { id: string; name: string; members: string; bot: string; plan: string; icon: string }) {
  const canManage = bot === 'Online';
  return <article className="card">
    <div className="row"><div className="avatar">{icon}</div><span className="status">{bot}</span></div>
    <h3>{name}</h3>
    <p>Membros: {members} · Plano: {plan}</p>
    <div style={{marginTop:18}} className="row">
      {canManage ? <Link className="btn btn-primary" href={`/dashboard/server/${id}`}>Selecionar e gerenciar</Link> : <button className="btn btn-secondary">Convidar Onne</button>}
      <button className="btn btn-secondary">Ver detalhes</button>
    </div>
  </article>
}
