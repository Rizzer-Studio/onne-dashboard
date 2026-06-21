'use client';

import { useState, type ReactNode } from 'react';
import { AlertTriangle, Hash, Layers3, Plus, RotateCcw, Save, Settings, ShieldCheck, Sparkles, Trash2, Users, X } from 'lucide-react';
import { PageHeader } from '@/components/AppShell';

type Option = { id: string; label: string; emoji?: string; color?: string };

type ToggleRowProps = {
  title: string;
  description?: string;
  checked: boolean;
  onChange: () => void;
};

const channels: Option[] = [
  { id: 'boas-vindas', label: 'boas-vindas' },
  { id: 'logs', label: 'logs' },
  { id: 'punicoes', label: 'punições' },
  { id: 'comandos', label: 'comandos' },
  { id: 'geral', label: 'geral' },
  { id: 'youtube', label: 'youtube' },
  { id: 'atualizacao', label: 'atualização' },
];

const roles: Option[] = [
  { id: 'adm', label: 'ADM', emoji: '🛡️', color: '#FACC15' },
  { id: 'mod', label: 'Moderador', emoji: '⭐', color: '#A3E635' },
  { id: 'staff', label: 'Equipe Onne', emoji: '💎', color: '#38BDF8' },
  { id: 'bot', label: 'Bots', emoji: '🤖', color: '#94A3B8' },
  { id: 'vip', label: 'VIP', emoji: '👑', color: '#EC4899' },
];

const punishmentTypes = ['Banimento', 'Expulsão', 'Silenciamento', 'Aviso', 'Desbanimento', 'Dessilenciamento', 'Desavisado', 'Expulsão com mensagens deletadas'];
const eventTypes = [
  'Avisar quando alguém for banido',
  'Avisar quando alguém for desbanido',
  'Avisar quando uma mensagem for editada',
  'Avisar quando uma mensagem for deletada',
  'Avisar quando alguém usar limpeza em massa',
  'Avisar quando alguém alterar o nickname',
  'Avisar quando alguém alterar o avatar',
  'Avisar quando alguém entrar em um canal de voz',
  'Avisar quando alguém sair de um canal de voz',
];

function ToggleRow({ title, description, checked, onChange }: ToggleRowProps) {
  return <div className="feature-toggle-row">
    <div>
      <strong>{title}</strong>
      {description && <span>{description}</span>}
    </div>
    <button className={`theme-switch ${checked ? 'on' : ''}`} type="button" onClick={onChange} aria-label={title} />
  </div>;
}

function ChannelSelect({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return <select className="feature-select" value={value} onChange={(event) => onChange(event.target.value)}>
    {channels.map((channel) => <option key={channel.id} value={channel.id}># {channel.label}</option>)}
  </select>;
}

function RoleSelect({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return <select className="feature-select" value={value} onChange={(event) => onChange(event.target.value)}>
    {roles.map((role) => <option key={role.id} value={role.id}>{role.emoji} {role.label}</option>)}
  </select>;
}

function EmptyState({ icon, title, text }: { icon?: ReactNode; title: string; text: string }) {
  return <div className="onne-empty-state">
    <div className="onne-empty-icon">{icon ?? <Sparkles size={30}/>}</div>
    <strong>{title}</strong>
    <span>{text}</span>
  </div>;
}

function ChannelChip({ id }: { id: string }) {
  const channel = channels.find((item) => item.id === id);
  return <span className="feature-chip"><Hash size={14}/>{channel?.label ?? id}</span>;
}

function RoleChip({ id }: { id: string }) {
  const role = roles.find((item) => item.id === id);
  return <span className="feature-chip role"><span style={{ color: role?.color }}>{role?.emoji ?? '🛡️'}</span>{role?.label ?? id}</span>;
}

function RemovableList({ type, items, onRemove, emptyTitle, emptyText }: { type: 'channel' | 'role' | 'text'; items: string[]; onRemove: (item: string) => void; emptyTitle: string; emptyText: string }) {
  if (items.length === 0) return <EmptyState title={emptyTitle} text={emptyText} icon={type === 'channel' ? <Hash size={30}/> : type === 'role' ? <Users size={30}/> : <Layers3 size={30}/>} />;
  return <div className="feature-list">
    {items.map((item) => <div className="feature-list-row" key={item}>
      <div>{type === 'channel' ? <ChannelChip id={item}/> : type === 'role' ? <RoleChip id={item}/> : <strong>{item}</strong>}</div>
      <button className="btn btn-secondary compact" type="button" onClick={() => onRemove(item)}><Trash2 size={14}/> Remover</button>
    </div>)}
  </div>;
}

function MessagePreview({ text }: { text: string }) {
  return <div className="feature-discord-preview">
    <div className="feature-bot-avatar">O</div>
    <div>
      <div className="feature-message-head"><strong>Onne</strong><span>APP</span><small>Hoje às 09:07</small></div>
      <p>{text}</p>
    </div>
  </div>;
}

function AddControl({ kind, selected, setSelected, onAdd, label = 'Adicionar' }: { kind: 'channel' | 'role'; selected: string; setSelected: (value: string) => void; onAdd: () => void; label?: string }) {
  return <div className="feature-add-row">
    {kind === 'channel' ? <ChannelSelect value={selected} onChange={setSelected}/> : <RoleSelect value={selected} onChange={setSelected}/>}    
    <button className="btn btn-success" type="button" onClick={onAdd}><Plus size={16}/>{label}</button>
  </div>;
}

export function InviteBlockerPage() {
  const [enabled, setEnabled] = useState(false);
  const [allowOwnServer, setAllowOwnServer] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(true);
  const [dmUser, setDmUser] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState(channels[0].id);
  const [selectedRole, setSelectedRole] = useState(roles[0].id);
  const [blockedChannels, setBlockedChannels] = useState<string[]>([]);
  const [allowedRoles, setAllowedRoles] = useState<string[]>([]);
  const addChannel = () => setBlockedChannels((current) => current.includes(selectedChannel) ? current : [...current, selectedChannel]);
  const addRole = () => setAllowedRoles((current) => current.includes(selectedRole) ? current : [...current, selectedRole]);

  return <>
    <PageHeader title="Bloqueador de Convites" description="Escolha onde convites serão bloqueados e quais cargos estão autorizados a enviá-los." />
    <section className="card feature-page-card">
      <ToggleRow title="Ativar bloqueador de convites" description="Quando ativo, o Onne identifica links de convite e aplica as regras abaixo." checked={enabled} onChange={() => setEnabled(!enabled)} />
      {enabled && <div className="feature-content-grid">
        <div className="feature-section full"><h3>Canais onde convites serão bloqueados</h3><p>Convites enviados nestes canais serão bloqueados, exceto por cargos autorizados.</p><AddControl kind="channel" selected={selectedChannel} setSelected={setSelectedChannel} onAdd={addChannel}/><RemovableList type="channel" items={blockedChannels} onRemove={(id) => setBlockedChannels((items) => items.filter((item) => item !== id))} emptyTitle="Nenhum canal bloqueado" emptyText="Adicione canais para o bloqueador começar a atuar." /></div>
        <div className="feature-section full"><h3>Cargos autorizados</h3><p>Usuários com estes cargos poderão enviar convites mesmo em canais bloqueados.</p><AddControl kind="role" selected={selectedRole} setSelected={setSelectedRole} onAdd={addRole}/><RemovableList type="role" items={allowedRoles} onRemove={(id) => setAllowedRoles((items) => items.filter((item) => item !== id))} emptyTitle="Nenhum cargo autorizado" emptyText="Sem cargos autorizados, todos seguem a regra de bloqueio." /></div>
        <ToggleRow title="Permitir convites do servidor atual" checked={allowOwnServer} onChange={() => setAllowOwnServer(!allowOwnServer)} />
        <ToggleRow title="Deletar mensagem quando um convite for detectado" checked={deleteMessage} onChange={() => setDeleteMessage(!deleteMessage)} />
        <ToggleRow title="Enviar mensagem ao usuário por DM" checked={dmUser} onChange={() => setDmUser(!dmUser)} />
      </div>}
    </section>
  </>;
}

export function TrapChannelsPage() {
  const [enabled, setEnabled] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState(channels[0].id);
  const [trapChannels, setTrapChannels] = useState<string[]>([]);
  const [action, setAction] = useState('Expulsar e deletar mensagens');
  const [days, setDays] = useState('1');
  const [reason, setReason] = useState('Enviou mensagem em um canal de armadilha. Possível conta comprometida.');
  const addChannel = () => setTrapChannels((current) => current.includes(selectedChannel) ? current : [...current, selectedChannel]);
  return <>
    <PageHeader title="Canais de Armadilha" description="Crie canais públicos de armadilha para detectar contas hackeadas, spam e comportamento automatizado." />
    <section className="card feature-page-card">
      <ToggleRow title="Ativar canais de armadilha" description="Qualquer usuário que enviar mensagem nesses canais poderá ser punido automaticamente." checked={enabled} onChange={() => setEnabled(!enabled)} />
      {enabled && <div className="feature-content-grid">
        <label className="feature-field">Ação<select className="feature-select" value={action} onChange={(e) => setAction(e.target.value)}><option>Expulsar e deletar mensagens</option><option>Banir</option><option>Expulsar</option><option>Advertir</option></select></label>
        <label className="feature-field">Dias de mensagens para deletar<input value={days} onChange={(e) => setDays(e.target.value)} inputMode="numeric" /></label>
        <label className="feature-field full">Motivo da punição<input value={reason} onChange={(e) => setReason(e.target.value)} /></label>
        <div className="feature-section full"><h3>Canais de armadilha</h3><AddControl kind="channel" selected={selectedChannel} setSelected={setSelectedChannel} onAdd={addChannel}/><RemovableList type="channel" items={trapChannels} onRemove={(id) => setTrapChannels((items) => items.filter((item) => item !== id))} emptyTitle="Nenhum canal de armadilha" emptyText="Adicione ao menos um canal para ativar a armadilha." /></div>
        <div className="feature-summary full"><ShieldCheck size={18}/><span>Regra atual: {action} • apagar {days || 0} dia(s) de mensagens.</span></div>
      </div>}
    </section>
  </>;
}

export function PunishmentLogsPage() {
  const [dmEnabled, setDmEnabled] = useState(false);
  const [channelEnabled, setChannelEnabled] = useState(false);
  const [channel, setChannel] = useState(channels[1].id);
  const [specific, setSpecific] = useState<Record<string, boolean>>({});
  return <>
    <PageHeader title="Registro de Punições" description="Registre as ações de moderação que acontecem no servidor." />
    <section className="card feature-page-card">
      <ToggleRow title="Enviar punição por mensagem direta para quem foi punido" checked={dmEnabled} onChange={() => setDmEnabled(!dmEnabled)} />
      <ToggleRow title="Enviar punições para um canal de punições" checked={channelEnabled} onChange={() => setChannelEnabled(!channelEnabled)} />
      {channelEnabled && <div className="feature-content-grid">
        <label className="feature-field full">Canal de punições<ChannelSelect value={channel} onChange={setChannel}/></label>
        <div className="feature-section full"><div className="row"><div><h3>Mensagem padrão</h3><p>Use o editor padrão para personalizar essa mensagem.</p></div><button className="btn btn-primary" type="button"><Settings size={16}/> Editar mensagem</button></div><MessagePreview text="Ação de moderação registrada para {user}. Motivo: {reason}" /></div>
        <div className="feature-section full"><h3>Mensagens específicas para cada punição</h3><p>Você pode escolher mensagens diferentes para cada tipo de punição.</p>{punishmentTypes.map((type) => <div className="feature-nested-row" key={type}><ToggleRow title={type} checked={!!specific[type]} onChange={() => setSpecific((value) => ({ ...value, [type]: !value[type] }))} />{specific[type] && <div className="feature-inline-preview"><button className="btn btn-secondary" type="button"><Settings size={15}/> Editar</button><MessagePreview text={`${type} aplicado em {user}.`} /></div>}</div>)}</div>
      </div>}
    </section>
  </>;
}

export function WarningPunishmentsPage() {
  const [warns, setWarns] = useState('1');
  const [action, setAction] = useState('Silenciamento');
  const [duration, setDuration] = useState('1 hora');
  const [rules, setRules] = useState<string[]>([]);
  const add = () => setRules((items) => [...items, `Ao chegar em ${warns || 1} aviso(s), o usuário receberá ${action}${duration ? ` por ${duration}` : ''}.`]);
  return <>
    <PageHeader title="Punições de Avisos" description="Configure punições automáticas quando o usuário chegar a uma quantidade de avisos." />
    <section className="card feature-page-card">
      <div className="feature-inline-form"><span>Ao chegar em</span><input value={warns} onChange={(e) => setWarns(e.target.value)} inputMode="numeric"/><span>aviso(s)</span><select className="feature-select" value={action} onChange={(e) => setAction(e.target.value)}><option>Expulsão</option><option>Banimento</option><option>Silenciamento</option><option>Aviso final</option></select><span>por</span><input value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="1 hora"/><button className="btn btn-success" type="button" onClick={add}><Plus size={16}/>Adicionar</button></div>
      <RemovableList type="text" items={rules} onRemove={(item) => setRules((items) => items.filter((rule) => rule !== item))} emptyTitle="Nenhuma punição automática" emptyText="Crie regras para o Onne agir quando usuários acumularem avisos." />
    </section>
  </>;
}

export function PunishmentReasonsPage() {
  const [showForm, setShowForm] = useState(false);
  const [code, setCode] = useState('convite');
  const [reason, setReason] = useState('Enviar convites de outros servidores para usuários do servidor.');
  const [duration, setDuration] = useState('24 horas');
  const [days, setDays] = useState('0');
  const [items, setItems] = useState<string[]>([]);
  const add = () => { setItems((list) => [...list, `${code}: ${reason}`]); setShowForm(false); };
  return <>
    <PageHeader title="Motivos de Punição Predefinidos" description="Configure motivos rápidos para comandos de moderação. Quando o motivo começar com um código, ele será substituído pelo texto configurado." />
    <section className="card feature-page-card">
      {!showForm && <div className="row feature-row-wrap"><div><h2>Motivos cadastrados</h2><p>{items.length} motivo(s) configurado(s).</p></div><button className="btn btn-success" type="button" onClick={() => setShowForm(true)}><Plus size={16}/> Criar predefinição</button></div>}
      {!showForm ? <RemovableList type="text" items={items} onRemove={(item) => setItems((list) => list.filter((value) => value !== item))} emptyTitle="Nenhum motivo configurado" emptyText="Crie motivos predefinidos para usar em /ban, /kick, /warn e /mute." /> : <div className="feature-content-grid"><button className="btn btn-secondary fit" type="button" onClick={() => setShowForm(false)}><X size={15}/> Voltar</button><label className="feature-field full">Código<input value={code} onChange={(e) => setCode(e.target.value)} /></label><label className="feature-field full">Motivo da punição<textarea value={reason} onChange={(e) => setReason(e.target.value)} /></label><label className="feature-field">Duração padrão opcional<input value={duration} onChange={(e) => setDuration(e.target.value)} /></label><label className="feature-field">Dias de mensagens a apagar<input value={days} onChange={(e) => setDays(e.target.value)} inputMode="numeric" /></label><button className="btn btn-primary fit" type="button" onClick={add}><Save size={16}/> Salvar motivo</button></div>}
    </section>
  </>;
}

export function EventLogsPage() {
  const [defaultChannel, setDefaultChannel] = useState(channels[1].id);
  const [enabled, setEnabled] = useState<Record<string, boolean>>({});
  const [eventChannel, setEventChannel] = useState<Record<string, string>>({});
  return <>
    <PageHeader title="Registro de Eventos" description="Registre as ações que acontecem no servidor para ajudar você e sua equipe a acompanharem tudo." />
    <section className="card feature-page-card"><label className="feature-field full">Canal padrão onde as ações serão anunciadas<ChannelSelect value={defaultChannel} onChange={setDefaultChannel}/></label>{eventTypes.map((event) => <div className="feature-nested-row" key={event}><ToggleRow title={event} checked={!!enabled[event]} onChange={() => setEnabled((value) => ({ ...value, [event]: !value[event] }))} />{enabled[event] && <label className="feature-field full">Canal onde esta ação será anunciada<select className="feature-select" value={eventChannel[event] ?? 'default'} onChange={(e) => setEventChannel((value) => ({ ...value, [event]: e.target.value }))}><option value="default">Usar canal padrão</option>{channels.map((channel) => <option key={channel.id} value={channel.id}># {channel.label}</option>)}</select></label>}</div>)}</section>
  </>;
}

export function XpRewardsPage() {
  const [style, setStyle] = useState('stack');
  const [xp, setXp] = useState('1000');
  const [role, setRole] = useState(roles[0].id);
  const [items, setItems] = useState<string[]>([]);
  const add = () => setItems((list) => [...list, `Ao chegar em ${xp} XP, dar cargo ${roles.find((item) => item.id === role)?.label}.`]);
  return <>
    <PageHeader title="Recompensas por XP" description="Recompense usuários ativos do seu servidor com cargos únicos e exclusivos." />
    <section className="card feature-page-card"><div className="feature-radio-group"><label><input type="radio" checked={style === 'stack'} onChange={() => setStyle('stack')} /> Empilhar recompensas anteriores<span>O usuário mantém todos os cargos recebidos.</span></label><label><input type="radio" checked={style === 'replace'} onChange={() => setStyle('replace')} /> Remover recompensas anteriores<span>Ao subir de nível, recompensas antigas são removidas.</span></label></div><div className="feature-inline-form"><span>Ao chegar em</span><input value={xp} onChange={(e) => setXp(e.target.value)} inputMode="numeric"/><span>XP, dar o cargo</span><RoleSelect value={role} onChange={setRole}/><button className="btn btn-success" type="button" onClick={add}><Plus size={16}/>Adicionar</button></div><RemovableList type="text" items={items} onRemove={(item) => setItems((list) => list.filter((value) => value !== item))} emptyTitle="Nenhuma recompensa configurada" emptyText="Adicione cargos para premiar usuários quando eles subirem de nível." /></section>
  </>;
}

export function XpBonusPage() {
  const [role, setRole] = useState(roles[0].id);
  const [multiplier, setMultiplier] = useState('1.5');
  const [items, setItems] = useState<string[]>([]);
  const add = () => setItems((list) => [...list, `${roles.find((item) => item.id === role)?.label} receberá ${multiplier}x XP.`]);
  return <>
    <PageHeader title="Bônus de XP" description="Configure cargos específicos para ganharem mais ou menos experiência que outros membros." />
    <section className="card feature-page-card"><div className="feature-inline-form"><span>Usuários com o cargo</span><RoleSelect value={role} onChange={setRole}/><span>ganham</span><input value={multiplier} onChange={(e) => setMultiplier(e.target.value)} inputMode="decimal"/><span>x mais XP</span><button className="btn btn-success" type="button" onClick={add}><Plus size={16}/>Adicionar</button></div><RemovableList type="text" items={items} onRemove={(item) => setItems((list) => list.filter((value) => value !== item))} emptyTitle="Nenhum bônus configurado" emptyText="Adicione cargos para controlar multiplicadores de experiência." /></section>
  </>;
}

export function XpBlocksPage() {
  const [role, setRole] = useState(roles[0].id);
  const [channel, setChannel] = useState(channels[3].id);
  const [blockedRoles, setBlockedRoles] = useState<string[]>([]);
  const [blockedChannels, setBlockedChannels] = useState<string[]>([]);
  const [cooldown, setCooldown] = useState('60');
  const [minChars, setMinChars] = useState('10');
  const [ignoreBots, setIgnoreBots] = useState(true);
  const [ignoreWebhooks, setIgnoreWebhooks] = useState(true);
  return <>
    <PageHeader title="Bloqueios de XP" description="Bloqueie cargos ou canais específicos para não ganharem XP." />
    <section className="card feature-page-card"><div className="feature-section"><h3>Cargos sem ganho de XP</h3><AddControl kind="role" selected={role} setSelected={setRole} onAdd={() => setBlockedRoles((list) => list.includes(role) ? list : [...list, role])}/><RemovableList type="role" items={blockedRoles} onRemove={(id) => setBlockedRoles((list) => list.filter((value) => value !== id))} emptyTitle="Nenhum cargo bloqueado" emptyText="Todos os cargos podem ganhar XP atualmente." /></div><div className="feature-section"><h3>Canais sem ganho de XP</h3><AddControl kind="channel" selected={channel} setSelected={setChannel} onAdd={() => setBlockedChannels((list) => list.includes(channel) ? list : [...list, channel])}/><RemovableList type="channel" items={blockedChannels} onRemove={(id) => setBlockedChannels((list) => list.filter((value) => value !== id))} emptyTitle="Nenhum canal bloqueado" emptyText="Todos os canais podem gerar XP atualmente." /></div><div className="feature-content-grid"><label className="feature-field">Cooldown de XP<input value={cooldown} onChange={(e) => setCooldown(e.target.value)} inputMode="numeric"/></label><label className="feature-field">Mínimo de caracteres<input value={minChars} onChange={(e) => setMinChars(e.target.value)} inputMode="numeric"/></label><ToggleRow title="Ignorar bots" checked={ignoreBots} onChange={() => setIgnoreBots(!ignoreBots)} /><ToggleRow title="Ignorar webhooks" checked={ignoreWebhooks} onChange={() => setIgnoreWebhooks(!ignoreWebhooks)} /></div></section>
  </>;
}

export function LevelUpMessagesPage() {
  const [enabled, setEnabled] = useState(false);
  const [delivery, setDelivery] = useState('current');
  const [channel, setChannel] = useState(channels[6].id);
  const [onlyReward, setOnlyReward] = useState(false);
  const defaultText = '🎉 Parabéns {userMention}, você passou para o nível **{level}** ({xp} XP)!';
  return <>
    <PageHeader title="Mensagens ao Subir de Nível" description="Configure a mensagem enviada quando usuários subirem de nível no servidor." />
    <section className="card feature-page-card"><ToggleRow title="Ativar mensagem ao subir de nível" checked={enabled} onChange={() => setEnabled(!enabled)} />{enabled && <div className="feature-content-grid"><label className="feature-field full">Onde a mensagem será enviada<select className="feature-select" value={delivery} onChange={(e) => setDelivery(e.target.value)}><option value="current">Canal atual</option><option value="dm">Mensagem direta</option><option value="channel">Canal personalizado</option></select></label>{delivery === 'channel' && <label className="feature-field full">Canal onde a mensagem será enviada<ChannelSelect value={channel} onChange={setChannel}/></label>}<ToggleRow title="Apenas notificar caso o usuário receba alguma recompensa" description="Útil quando você quer avisar somente ao entregar cargos de recompensa." checked={onlyReward} onChange={() => setOnlyReward(!onlyReward)} /><div className="feature-section full"><div className="row"><div><h3>Mensagem ao subir de nível</h3><p>Mensagem padrão: {defaultText}</p></div><button className="btn btn-primary" type="button"><Settings size={16}/> Editar</button></div><MessagePreview text="🎉 Parabéns @Matheus Felipe, você passou para o nível 12 (12400 XP)!" /></div></div>}</section>
  </>;
}

export function ResetXpPage() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  return <>
    <PageHeader title="Resetar XP" description="Zere o XP interno deste servidor com confirmação manual." />
    <section className="card reset-xp-card"><div><AlertTriangle size={34}/><h2>Esta ação é irreversível</h2><p>Todos os membros deste servidor voltarão para o nível 0. Este XP é interno do servidor e não altera o XP de Progresso global do Onne.</p><button className="btn btn-danger" type="button" onClick={() => setOpen(true)}><RotateCcw size={16}/> Resetar XP</button></div></section>{open && <div className="feature-modal-backdrop"><div className="feature-modal-card"><button className="feature-modal-close" type="button" onClick={() => setOpen(false)}><X size={18}/></button><AlertTriangle size={32}/><h2>Confirmar reset de XP</h2><p>Digite <strong>CONFIRMAR</strong> para liberar o botão de reset.</p><input value={value} onChange={(e) => setValue(e.target.value)} placeholder="CONFIRMAR"/><div className="feature-modal-actions"><button className="btn btn-secondary" type="button" onClick={() => setOpen(false)}>Cancelar</button><button className="btn btn-danger" type="button" disabled={value !== 'CONFIRMAR'}>Resetar agora</button></div></div></div>}
  </>;
}
