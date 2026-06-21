'use client';

import { useMemo, useState } from 'react';
import { ArrowLeft, Bot, CheckCircle2, Crown, Shield, ShieldCheck, ShieldQuestion } from 'lucide-react';
import { PageHeader } from '@/components/AppShell';

type RolePermission = {
  id: string;
  name: string;
  color: string;
  icon: string;
  canInvite: boolean;
  canUseCommands: boolean;
  bypassCommandChannels: boolean;
};

const initialRoles: RolePermission[] = [
  { id: 'adm', name: 'ADM', color: '#FACC15', icon: 'shield', canInvite: false, canUseCommands: true, bypassCommandChannels: false },
  { id: 'onne-dev', name: 'ONNE Dev', color: '#94A3B8', icon: 'shield', canInvite: false, canUseCommands: true, bypassCommandChannels: true },
  { id: 'bots', name: 'BOTS 🤖', color: '#38BDF8', icon: 'bot', canInvite: false, canUseCommands: false, bypassCommandChannels: false },
  { id: 'tickets', name: 'ONNE Tickets', color: '#94A3B8', icon: 'bot', canInvite: false, canUseCommands: false, bypassCommandChannels: false },
  { id: 'support', name: '☎️ • SUPORTE', color: '#EC4899', icon: 'shield', canInvite: true, canUseCommands: true, bypassCommandChannels: true },
  { id: 'payments', name: 'ONNE PAYMENTS', color: '#94A3B8', icon: 'bot', canInvite: false, canUseCommands: false, bypassCommandChannels: false },
  { id: 'helper', name: 'Onne Helper', color: '#94A3B8', icon: 'bot', canInvite: false, canUseCommands: true, bypassCommandChannels: false },
  { id: 'rio', name: 'Rio Bot', color: '#94A3B8', icon: 'bot', canInvite: false, canUseCommands: false, bypassCommandChannels: false },
  { id: 'games', name: 'ONNE Games', color: '#94A3B8', icon: 'bot', canInvite: false, canUseCommands: true, bypassCommandChannels: false },
  { id: 'member', name: 'Membro', color: '#94A3B8', icon: 'shield', canInvite: false, canUseCommands: true, bypassCommandChannels: false },
  { id: 'police', name: '🚓 Polícia', color: '#94A3B8', icon: 'shield', canInvite: false, canUseCommands: true, bypassCommandChannels: false },
  { id: 'medic', name: '🩺 Médico', color: '#94A3B8', icon: 'shield', canInvite: false, canUseCommands: true, bypassCommandChannels: false },
  { id: 'launderer', name: '💵 Lavador', color: '#94A3B8', icon: 'shield', canInvite: false, canUseCommands: true, bypassCommandChannels: false },
  { id: 'booster', name: '💗 Booster', color: '#F472B6', icon: 'crown', canInvite: false, canUseCommands: true, bypassCommandChannels: false },
];

function RoleIcon({ role }: { role: RolePermission }) {
  const props = { size: 22, color: role.color, strokeWidth: 2.8 };
  if (role.icon === 'bot') return <Bot {...props} />;
  if (role.icon === 'crown') return <Crown {...props} />;
  return <Shield {...props} />;
}

export default function ServerPermissionsPage() {
  const [roles, setRoles] = useState(initialRoles);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedRole = useMemo(() => roles.find((role) => role.id === selectedId) || null, [roles, selectedId]);

  function patchRole(id: string, changes: Partial<RolePermission>) {
    setRoles((items) => items.map((role) => role.id === id ? { ...role, ...changes } : role));
  }

  if (selectedRole) {
    return <>
      <PageHeader title="Permissões" description="Configure individualmente o que cada cargo pode fazer neste servidor." />
      <section className="permissions-detail card">
        <button className="btn btn-secondary permissions-back" type="button" onClick={() => setSelectedId(null)}><ArrowLeft size={16}/> Voltar para a lista de cargos</button>
        <div className="permissions-role-title">
          <RoleIcon role={selectedRole} />
          <div>
            <h2>{selectedRole.name}</h2>
            <span>Cada cargo pode ter permissões próprias no Onne.</span>
          </div>
        </div>

        <div className="permissions-option-list">
          <div className="permissions-option-row">
            <div><strong>Permitir enviar convites</strong><span>Usuários com este cargo podem publicar links de convite quando o bloqueador estiver ativo.</span></div>
            <button className={`theme-switch ${selectedRole.canInvite ? 'on' : ''}`} type="button" onClick={() => patchRole(selectedRole.id, { canInvite: !selectedRole.canInvite })} aria-label="Permitir convites" />
          </div>
          <div className="permissions-option-row">
            <div><strong>Permitir usar comandos</strong><span>Quando ativo, o Onne processará comandos enviados por usuários com este cargo.</span></div>
            <button className={`theme-switch ${selectedRole.canUseCommands ? 'on' : ''}`} type="button" onClick={() => patchRole(selectedRole.id, { canUseCommands: !selectedRole.canUseCommands })} aria-label="Permitir comandos" />
          </div>
          <div className="permissions-option-row">
            <div><strong>Permitir usar comandos em qualquer canal</strong><span>Ignora as regras da página Canais de Comandos para usuários com este cargo.</span></div>
            <button className={`theme-switch ${selectedRole.bypassCommandChannels ? 'on' : ''}`} type="button" onClick={() => patchRole(selectedRole.id, { bypassCommandChannels: !selectedRole.bypassCommandChannels })} aria-label="Permitir comandos em qualquer canal" />
          </div>
        </div>
      </section>
    </>;
  }

  return <>
    <PageHeader title="Permissões" description="Escolha quais cargos podem enviar convites, usar comandos e burlar restrições de canais." />
    <section className="permissions-list card">
      <div className="permissions-list-head">
        <div>
          <h2>Cargos do servidor</h2>
          <p>{roles.length} cargos</p>
        </div>
        <span><ShieldCheck size={16}/> Permissões individuais</span>
      </div>
      <div className="permissions-role-list">
        {roles.map((role) => <article className="permissions-role-row" key={role.id}>
          <div className="permissions-role-main"><RoleIcon role={role} /><strong>{role.name}</strong></div>
          <div className="permissions-role-badges">
            {role.canInvite && <span>Convites</span>}
            {role.canUseCommands && <span>Comandos</span>}
            {role.bypassCommandChannels && <span>Bypass canal</span>}
            {!role.canInvite && !role.canUseCommands && !role.bypassCommandChannels && <span className="muted">Sem permissões extras</span>}
          </div>
          <button className="btn btn-primary" type="button" onClick={() => setSelectedId(role.id)}>Editar</button>
        </article>)}
      </div>
    </section>
  </>;
}
