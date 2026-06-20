'use client';

import { PageHeader } from '@/components/AppShell';
import { Activity, Hash, HashIcon, Link2, Save, Server, Smile, Sparkles, Type, Volume2, X } from 'lucide-react';
import { useMemo, useState } from 'react';

type CounterMode = 'simple' | 'complete';
type CounterShape = 'quadrado' | 'redondo';
type CounterTheme = 'blue' | 'red' | 'green' | 'blurple' | 'black' | 'delux' | 'pink';

type ServerChannel = {
  id: string;
  name: string;
  emoji: string;
  type: 'text' | 'voice';
  topic?: string;
};

const channels: ServerChannel[] = [
  { id: 'entrada', name: 'entrada', emoji: '🛬', type: 'text', topic: 'Boas-vindas e contador principal.' },
  { id: 'saidas', name: 'saidas', emoji: '🛫', type: 'text', topic: 'Registros de saída.' },
  { id: 'registro', name: 'registro', emoji: '📝', type: 'text', topic: 'Registro e verificação.' },
  { id: 'regras', name: 'regras', emoji: '📚', type: 'text', topic: 'Regras do servidor.' },
  { id: 'booster', name: 'booster', emoji: '🚀', type: 'text', topic: 'Benefícios de boosters.' },
  { id: 'anuncios', name: 'anúncios', emoji: '🔔', type: 'text', topic: 'Avisos públicos.' },
  { id: 'convite', name: 'convite', emoji: '💌', type: 'text', topic: 'Convites e comunidade.' },
  { id: 'pagamentos', name: 'pagamentos', emoji: '💸', type: 'text', topic: 'Controle financeiro.' },
  { id: 'analytics', name: 'Analytics', emoji: '📊', type: 'voice', topic: 'Categoria visual para contadores.' },
];

const themes: { id: CounterTheme; label: string; description: string }[] = [
  { id: 'blue', label: 'Azul', description: 'Visual padrão Onne.' },
  { id: 'green', label: 'Verde', description: 'Visual técnico/neon.' },
  { id: 'red', label: 'Vermelho', description: 'Visual de alerta.' },
  { id: 'blurple', label: 'Blurple', description: 'Visual inspirado em Discord.' },
  { id: 'black', label: 'Preto', description: 'Visual dark sólido.' },
  { id: 'delux', label: 'Deluxe', description: 'GIF premium animado.' },
  { id: 'pink', label: 'Pink', description: 'GIF rosa animado.' },
];

const completeRows = [
  { key: 'members', label: 'Membros', value: 12430, defaultEmoji: '👥', description: 'Total de usuários + bots.' },
  { key: 'users', label: 'Users', value: 12108, defaultEmoji: '🧑‍🤝‍🧑', description: 'Somente usuários humanos.' },
  { key: 'bots', label: 'Bots', value: 322, defaultEmoji: '🤖', description: 'Somente bots do servidor.' },
  { key: 'invites', label: 'Convites', value: 854, defaultEmoji: '📨', description: 'Total de convites registrados.' },
];

function formatNumber(value: number, zeros = 5) {
  return String(value).padStart(zeros, '0');
}

function CounterDigits({ value, theme, shape }: { value: number; theme: CounterTheme; shape: CounterShape }) {
  const digits = formatNumber(value, value > 99999 ? String(value).length : 5).split('');
  return <div className={`counter-digits-preview ${shape}`} aria-label={`Prévia ${digits.join('')}`}>
    {digits.map((digit, index) => (
      <img key={`${digit}-${index}`} src={`/assets/member-counter/numbers/${shape}/${theme}/${digit}.png`} alt={digit} />
    ))}
  </div>;
}


const emojiOptions = ['👥', '🧑‍🤝‍🧑', '🤖', '📨', '👑', '⭐', '🚀', '🔔', '💎', '🔥', '✅', '🎉', '📊', '🎮', '💬', '🛡️'];

function MiniEmojiPicker({ onPick, onClose }: { onPick: (emoji: string) => void; onClose: () => void }) {
  return <div className="counter-emoji-popover" role="dialog" aria-label="Selecionar emoji">
    <div className="counter-emoji-popover-head">
      <strong>Emojis</strong>
      <button type="button" onClick={onClose} aria-label="Fechar"><X size={16} /></button>
    </div>
    <div className="counter-emoji-grid">
      {emojiOptions.map((emoji) => <button key={emoji} type="button" onClick={() => onPick(emoji)}>{emoji}</button>)}
    </div>
  </div>;
}

function CounterSampleRows({ theme, shape }: { theme: CounterTheme; shape: CounterShape }) {
  return <div className="counter-loritta-preview" aria-label="Prévia dos números do contador">
    {[5, 10, 32, 250, 1234567890].map((value) => <CounterDigits key={value} value={value} theme={theme} shape={shape} />)}
  </div>;
}

function ChannelBadge({ channel }: { channel: ServerChannel }) {
  return <span className="counter-channel-badge">
    {channel.type === 'voice' ? <Volume2 size={15} /> : <Hash size={15} />}
    <span>{channel.emoji}</span>
    <strong>{channel.name}</strong>
  </span>;
}

export default function ServerMemberCounterPage() {
  const [selectedChannelId, setSelectedChannelId] = useState('entrada');
  const [enabled, setEnabled] = useState(true);
  const [mode, setMode] = useState<CounterMode>('simple');
  const [shape, setShape] = useState<CounterShape>('quadrado');
  const [theme, setTheme] = useState<CounterTheme>('blue');
  const [zeros, setZeros] = useState(5);
  const [simpleValueType, setSimpleValueType] = useState<'members' | 'users' | 'bots' | 'invites'>('members');
  const [customEmojis, setCustomEmojis] = useState<Record<string, string>>({});
  const [activeRows, setActiveRows] = useState<Record<string, boolean>>({ members: true, users: true, bots: true, invites: true });
  const [labels, setLabels] = useState<Record<string, string>>({ members: 'Members', users: 'Users', bots: 'Bots', invites: 'Convites' });
  const [inviteText, setInviteText] = useState('Use o convite oficial do servidor.');
  const [activeEmojiPicker, setActiveEmojiPicker] = useState<string | null>(null);

  const selectedChannel = useMemo(() => channels.find((channel) => channel.id === selectedChannelId) ?? channels[0], [selectedChannelId]);
  const simpleValue = completeRows.find((row) => row.key === simpleValueType)?.value ?? 12430;

  function updateEmoji(key: string, emoji: string) {
    setCustomEmojis((current) => ({ ...current, [key]: emoji.slice(0, 4) }));
  }

  function updateLabel(key: string, value: string) {
    setLabels((current) => ({ ...current, [key]: value }));
  }

  return <>
    <PageHeader title="Contador de membros" description="Crie contadores automáticos para membros, bots, usuários e convites usando canais do servidor." />

    <section className="member-counter-page">
      <div className="card member-counter-channel-card">
        <div className="member-counter-header-row">
          <div>
            <span className="counter-kicker">CANAIS DO SERVIDOR</span>
            <h2>Escolha onde o contador será aplicado</h2>
            <p>Selecione um canal existente para configurar o contador. No bot real, o Onne atualizará o nome/tópico conforme o modo escolhido.</p>
          </div>
          <span className="theme-status-pill">{channels.length} canais</span>
        </div>

        <div className="counter-channel-list">
          {channels.map((channel) => (
            <button key={channel.id} type="button" className={`counter-channel-row ${selectedChannelId === channel.id ? 'active' : ''}`} onClick={() => setSelectedChannelId(channel.id)}>
              <span className="counter-channel-icon">{channel.type === 'voice' ? <Volume2 size={19} /> : <HashIcon size={19} />}</span>
              <span className="counter-channel-main"><strong>{channel.emoji} · {channel.name}</strong><small>{channel.topic}</small></span>
              <span className="counter-channel-action">Selecionar</span>
            </button>
          ))}
        </div>
      </div>

      <div className="member-counter-config-grid">
        <section className="card member-counter-config-card">
          <div className="member-counter-header-row compact">
            <div>
              <span className="counter-kicker">CONFIGURAÇÃO</span>
              <h2>{selectedChannel.type === 'voice' ? 'Canal de voz' : 'Canal de texto'} <ChannelBadge channel={selectedChannel} /></h2>
              <p>Escolha apenas um modo de contador. O modo simples usa apenas números; o modo completo cria a estrutura visual com categoria, emojis e canais.</p>
            </div>
            <button className={`theme-switch ${enabled ? 'on' : ''}`} type="button" role="switch" aria-checked={enabled} onClick={() => setEnabled((value) => !value)}><span /></button>
          </div>

          <div className="counter-mode-grid" role="tablist" aria-label="Modo do contador">
            <button type="button" className={`counter-mode-card ${mode === 'simple' ? 'active' : ''}`} onClick={() => setMode('simple')}>
              <Activity size={20} />
              <strong>Modo simples</strong>
              <span>Mostra somente os números no tópico/nome do canal.</span>
            </button>
            <button type="button" className={`counter-mode-card ${mode === 'complete' ? 'active' : ''}`} onClick={() => setMode('complete')}>
              <Server size={20} />
              <strong>Modo completo</strong>
              <span>Cria categoria e canais com emoji, total, usuários, bots e convites.</span>
            </button>
          </div>

          {mode === 'simple' && <div className="counter-settings-panel">
            <div className="two-columns counter-form-grid">
              <label className="field"><span>Tipo de contador</span><select className="input" value={simpleValueType} onChange={(event) => setSimpleValueType(event.target.value as typeof simpleValueType)}>
                <option value="members">Membros total</option>
                <option value="users">Usuários</option>
                <option value="bots">Bots</option>
                <option value="invites">Convites</option>
              </select></label>
              <label className="field"><span>Preenchimento com zeros</span><input className="input" type="number" min={1} max={10} value={zeros} onChange={(event) => setZeros(Math.max(1, Math.min(10, Number(event.target.value) || 5)))} /></label>
            </div>

            <div className="counter-format-row">
              <span>Formato dos números</span>
              <label className={`counter-checkbox ${shape === 'quadrado' ? 'active' : ''}`}><input type="radio" checked={shape === 'quadrado'} onChange={() => setShape('quadrado')} /> Quadrado</label>
              <label className={`counter-checkbox ${shape === 'redondo' ? 'active' : ''}`}><input type="radio" checked={shape === 'redondo'} onChange={() => setShape('redondo')} /> Redondo</label>
            </div>

            <div className="counter-theme-grid">
              {themes.map((item) => <button key={item.id} type="button" className={`counter-theme-option ${theme === item.id ? 'active' : ''}`} onClick={() => setTheme(item.id)}>
                <span className={`counter-theme-dot ${item.id}`} />
                <strong>{item.label}</strong>
                <small>{item.description}</small>
              </button>)}
            </div>
          </div>}

          {mode === 'complete' && <div className="counter-settings-panel">
            <div className="counter-complete-list clean">
              {completeRows.map((row) => <div key={row.key} className={`counter-complete-row-v2 ${activeRows[row.key] ? 'active' : ''}`}>
                <div className="counter-complete-row-top">
                  <button className={`theme-switch ${activeRows[row.key] ? 'on' : ''}`} type="button" role="switch" aria-checked={activeRows[row.key]} onClick={() => setActiveRows((current) => ({ ...current, [row.key]: !current[row.key] }))}><span /></button>
                  <div className="counter-complete-title">
                    <strong>{labels[row.key] ?? row.label}</strong>
                    <span>{row.description}</span>
                  </div>
                  <span className="counter-complete-value">{row.value.toLocaleString('pt-BR')}</span>
                </div>
                <div className="counter-complete-fields">
                  <label className="field counter-emoji-select"><span>Emoji</span><button type="button" className="input counter-emoji-button" onClick={() => setActiveEmojiPicker(row.key)}><Smile size={16}/><strong>{customEmojis[row.key] ?? row.defaultEmoji}</strong><small>Selecionar</small></button>{activeEmojiPicker === row.key && <MiniEmojiPicker onPick={(emoji) => { updateEmoji(row.key, emoji); setActiveEmojiPicker(null); }} onClose={() => setActiveEmojiPicker(null)} />}</label>
                  <label className="field"><span>Texto do canal</span><input className="input" value={labels[row.key] ?? row.label} onChange={(event) => updateLabel(row.key, event.target.value)} /></label>
                  {row.key === 'invites' && <label className="field full"><span>Link do convite ou mensagem</span><input className="input" value={inviteText} onChange={(event) => setInviteText(event.target.value)} placeholder="https://discord.gg/onne ou mensagem personalizada" /></label>}
                </div>
              </div>)}
            </div>
          </div>}

          <div className="actions counter-actions">
            <button className="btn btn-secondary" type="button"><Sparkles size={16}/> Restaurar padrão</button>
            <button className="btn" type="button"><Save size={16}/> Salvar contador</button>
          </div>
        </section>

        <aside className="card member-counter-preview-card">
          <div className="member-counter-header-row compact">
            <div>
              <span className="counter-kicker">PRÉ-VISUALIZAÇÃO</span>
              <h2>{mode === 'simple' ? 'Modo simples' : 'Modo completo'}</h2>
              <p>Preview visual do contador antes de salvar.</p>
            </div>
            <span className="theme-status-pill">{enabled ? 'Ativo' : 'Inativo'}</span>
          </div>

          {mode === 'simple' ? <div className="counter-simple-preview">
            <ChannelBadge channel={selectedChannel} />
            <CounterSampleRows theme={theme} shape={shape} />
            <div className="counter-selected-preview">
              <span>Selecionado</span>
              <CounterDigits value={Number(formatNumber(simpleValue, zeros))} theme={theme} shape={shape} />
            </div>
            <p>O Onne usará os assets reais do contador no canal selecionado com o formato <strong>{shape}</strong> e tema <strong>{themes.find((item) => item.id === theme)?.label}</strong>.</p>
          </div> : <div className="counter-complete-preview">
            <div className="discord-category-preview"><span>{selectedChannel.emoji}</span> Analytics</div>
            {completeRows.filter((row) => activeRows[row.key]).map((row) => <div key={row.key} className="discord-voice-preview">
              <Volume2 size={17} />
              <span>{customEmojis[row.key] ?? row.defaultEmoji}</span>
              <strong>{labels[row.key] ?? row.label}: {row.value.toLocaleString('pt-BR')}</strong>
            </div>)}
            {activeRows.invites && <div className="discord-voice-note"><Link2 size={15}/>{inviteText}</div>}
          </div>}
        </aside>
      </div>
    </section>
  </>;
}
