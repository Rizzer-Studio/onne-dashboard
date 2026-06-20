'use client';

import { PageHeader } from '@/components/AppShell';
import { Check, Clock3, Plus, Save, ShieldCheck, Sparkles, Trash2, UserRoundPlus, UsersRound } from 'lucide-react';
import { useMemo, useState } from 'react';

type RoleOption = {
  id: string;
  name: string;
  icon: string;
  color: string;
  group?: string;
};

const roleOptions: RoleOption[] = [
  { id: 'vegas-ceo', name: 'Vegas Ceo', icon: '👑', color: '#22D3EE' },
  { id: 'carl-bot', name: 'carl-bot', icon: '🤖', color: '#94A3B8' },
  { id: 'ticket-tool', name: 'Ticket Tool', icon: '🎫', color: '#94A3B8' },
  { id: 'separator-vegas', name: '───────〉VEGAS〈───────', icon: '•', color: '#475569', group: 'separador' },
  { id: 'admin', name: 'Administrador', icon: '⚡', color: '#F97316' },
  { id: 'moderador', name: 'Moderador', icon: '⭐', color: '#A3E635' },
  { id: 'equipe-vegas', name: 'Equipe Vegas', icon: '💉', color: '#38BDF8' },
  { id: 'separator-membro', name: '───────〉MEMBRO〈───────', icon: '•', color: '#475569', group: 'separador' },
  { id: 'booster', name: 'Booster', icon: '💗', color: '#EC4899' },
  { id: 'membro', name: 'Membro', icon: '🌱', color: '#10B981' },
  { id: 'novato', name: 'Novato', icon: '✨', color: '#8B5CF6' },
];

export default function ServerAutorolePage() {
  const [enabled, setEnabled] = useState(true);
  const [afterMessage, setAfterMessage] = useState(false);
  const [delay, setDelay] = useState('0');
  const [selectedRole, setSelectedRole] = useState('vegas-ceo');
  const [assignedRoles, setAssignedRoles] = useState<RoleOption[]>([]);

  const selected = useMemo(() => roleOptions.find((role) => role.id === selectedRole) ?? roleOptions[0], [selectedRole]);

  function addRole() {
    if (selected.group === 'separador') return;
    setAssignedRoles((current) => current.some((role) => role.id === selected.id) ? current : [...current, selected]);
  }

  function removeRole(roleId: string) {
    setAssignedRoles((current) => current.filter((role) => role.id !== roleId));
  }

  return <>
    <PageHeader
      title="Autorole"
      description="Dê cargos automaticamente para novos membros quando eles entrarem no servidor. Chega de entregar cargos manualmente para novatos."
    />

    <section className="autorole-page-grid">
      <div className="card autorole-main-card">
        <div className="autorole-card-head">
          <div className="autorole-title-wrap">
            <span className="autorole-title-icon"><UserRoundPlus size={20} /></span>
            <div>
              <h2>Autorole do servidor</h2>
              <p>Configure quais cargos serão entregues automaticamente para cada novo membro.</p>
            </div>
          </div>
          <button
            className={`theme-switch autorole-switch ${enabled ? 'on' : ''}`}
            type="button"
            role="switch"
            aria-checked={enabled}
            onClick={() => setEnabled((value) => !value)}
          />
        </div>

        <div className="autorole-divider" />

        <div className="autorole-field-group">
          <label className="autorole-label" htmlFor="autorole-role-select">Cargos que serão dados ao usuário ao ele entrar</label>
          <div className="autorole-add-row">
            <div className="autorole-select-wrap">
              <select
                id="autorole-role-select"
                className="autorole-role-select"
                value={selectedRole}
                onChange={(event) => setSelectedRole(event.target.value)}
              >
                {roleOptions.map((role) => <option key={role.id} value={role.id}>{role.icon} {role.name}</option>)}
              </select>
            </div>
            <button className="btn autorole-add-btn" type="button" onClick={addRole}><Plus size={16} />Adicionar</button>
          </div>
        </div>

        <div className="autorole-selected-box">
          {assignedRoles.length === 0 ? <div className="autorole-empty-state">
            <div className="autorole-empty-emoji">🥺</div>
            <strong>Vazio, ou seja, não cheio</strong>
            <span>Adicione pelo menos um cargo para o Onne entregar automaticamente.</span>
          </div> : <div className="autorole-role-list">
            {assignedRoles.map((role) => <div className="autorole-role-pill" key={role.id}>
              <span className="autorole-role-mark" style={{ color: role.color }}>✿</span>
              <span className="autorole-role-icon">{role.icon}</span>
              <strong>{role.name}</strong>
              <button type="button" aria-label={`Remover ${role.name}`} onClick={() => removeRole(role.id)}><Trash2 size={15}/></button>
            </div>)}
          </div>}
        </div>

        <div className="autorole-option-block">
          <div>
            <strong>Dar os cargos após o usuário enviar alguma mensagem no servidor</strong>
            <p>Quando ativado, os cargos só serão entregues depois que o usuário enviar uma mensagem em um canal de texto. Isso ajuda a respeitar o nível de verificação do servidor.</p>
          </div>
          <button
            className={`theme-switch autorole-switch ${afterMessage ? 'on' : ''}`}
            type="button"
            role="switch"
            aria-checked={afterMessage}
            onClick={() => setAfterMessage((value) => !value)}
          />
        </div>

        <div className="autorole-field-group">
          <label className="autorole-label" htmlFor="autorole-delay">Depois de quanto tempo o cargo será dado? <span>(segundos)</span></label>
          <input id="autorole-delay" className="input autorole-delay-input" value={delay} inputMode="numeric" onChange={(event) => setDelay(event.target.value.replace(/[^0-9]/g, ''))} />
        </div>

        <div className="autorole-actions row">
          <button className="btn btn-secondary" type="button"><Clock3 size={16}/> Restaurar padrão</button>
          <button className="btn btn-primary" type="button"><Save size={16}/> Salvar Autorole</button>
        </div>
      </div>

      <aside className="autorole-side-stack">
        <div className="card autorole-info-card">
          <Sparkles size={22}/>
          <h3>Como funciona?</h3>
          <p>Quando alguém entrar no servidor, o Onne verifica a configuração e entrega os cargos selecionados automaticamente.</p>
        </div>

        <div className="card autorole-info-card">
          <ShieldCheck size={22}/>
          <h3>Recomendação</h3>
          <p>Evite entregar cargos administrativos por Autorole. Use cargos básicos como Membro, Novato, Comunidade ou Visitante.</p>
        </div>

        <div className="card autorole-preview-card">
          <div className="autorole-preview-head">
            <UsersRound size={18}/>
            <strong>Prévia de entrada</strong>
          </div>
          <div className="autorole-preview-user">
            <div className="avatar">N</div>
            <div>
              <strong>Novo membro</strong>
              <span>acabou de entrar</span>
            </div>
          </div>
          <div className="autorole-preview-roles">
            {assignedRoles.length ? assignedRoles.slice(0, 4).map((role) => <span key={role.id}><Check size={13}/>{role.name}</span>) : <span className="muted"><Check size={13}/>Nenhum cargo configurado</span>}
          </div>
        </div>
      </aside>
    </section>
  </>;
}
