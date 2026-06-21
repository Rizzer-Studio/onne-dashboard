'use client';

import { PageHeader } from '@/components/AppShell';
import { Activity, Hash, HashIcon, Link2, Save, Server, Smile, Sparkles, Volume2, X } from 'lucide-react';
import { useMemo, useState } from 'react';

type CounterMode = 'simple' | 'complete';
type CounterShape = 'quadrado' | 'redondo' | 'premium';
type CounterTheme = 'blue' | 'red' | 'green' | 'blurple' | 'black' | 'delux' | 'pink' | 'turquoise';
type CounterKey = 'members' | 'users' | 'bots' | 'invites';

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

const themes: { id: CounterTheme; label: string; description: string; premium?: boolean }[] = [
  { id: 'blue', label: 'Azul', description: 'Visual padrão Onne.' },
  { id: 'green', label: 'Verde', description: 'Visual técnico/neon.' },
  { id: 'red', label: 'Vermelho', description: 'Visual de alerta.' },
  { id: 'blurple', label: 'Blurple', description: 'Visual inspirado em Discord.' },
  { id: 'black', label: 'Preto', description: 'Visual dark sólido.' },
  { id: 'delux', label: 'Delux Premium', description: 'GIF premium colorido enviado para o Onne.', premium: true },
  { id: 'pink', label: 'Pink Premium', description: 'GIF premium rosa enviado para o Onne.', premium: true },
  { id: 'turquoise', label: 'Blue Premium', description: 'GIF premium azul enviado para o Onne.', premium: true },
];

const completeRows: { key: CounterKey; label: string; value: number; defaultEmoji: string; description: string }[] = [
  { key: 'members', label: 'Membros', value: 40, defaultEmoji: '👥', description: 'Total de usuários + bots.' },
  { key: 'users', label: 'Users', value: 36, defaultEmoji: '🙋', description: 'Somente usuários humanos.' },
  { key: 'bots', label: 'Bots', value: 4, defaultEmoji: '🤖', description: 'Somente bots do servidor.' },
  { key: 'invites', label: 'Convites', value: 0, defaultEmoji: '📨', description: 'Link de convite ou mensagem personalizada.' },
];

function formatNumber(value: number, zeros = 5) {
  return String(value).padStart(zeros, '0');
}

function CounterDigits({ value, theme, shape, zeros = 5 }: { value: number; theme: CounterTheme; shape: CounterShape; zeros?: number }) {
  const safeZeros = Math.max(1, Math.min(10, zeros));
  const digits = formatNumber(value, Math.max(safeZeros, String(value).length)).split('');
  const isPremium = shape === 'premium';
  const assetShape = isPremium ? 'premium' : shape;
  const assetTheme = theme;
  const extension = isPremium ? 'gif' : 'png';

  return <div className={`counter-digits-preview ${shape}`} aria-label={`Prévia ${digits.join('')}`}>
    {digits.map((digit, index) => (
      <span className="counter-digit-slot" key={`${digit}-${index}`}>
        <img src={`/assets/member-counter/numbers/${assetShape}/${assetTheme}/${digit}.${extension}`} alt={digit} />
      </span>
    ))}
  </div>;
}

const emojiOptions = ['👥', '🧑‍🤝‍🧑', '🤖', '📨', '👑', '⭐', '🚀', '🔔', '💎', '🔥', '✅', '🎉', '📊', '🎮', '💬', '🛡️'];

function MiniEmojiPicker({ onPick, onClose }: { onPick: (emoji: string) => void; onClose: () => void }) {
  return <div className="counter-emoji-popover emoji-picker-panel counter-emoji-large-picker" role="dialog" aria-label="Selecionar emoji">
    <div className="counter-emoji-popover-head emoji-picker-titlebar">
      <strong>Emojis</strong>
      <button type="button" onClick={onClose} aria-label="Fechar"><X size={16} /></button>
    </div>
    <div className="counter-emoji-grid emoji-picker-grid">
      {emojiOptions.map((emoji) => <button key={emoji} type="button" onClick={() => onPick(emoji)}>{emoji}</button>)}
    </div>
  </div>;
}

function CounterSampleRows({ theme, shape, zeros }: { theme: CounterTheme; shape: CounterShape; zeros: number }) {
  return <div className="counter-onne-preview" aria-label="Prévia dos números do contador">
    {[5, 10, 32, 250, 1234567890].map((value) => <CounterDigits key={value} value={value} theme={theme} shape={shape} zeros={zeros} />)}
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
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<CounterMode>('simple');
  const [shape, setShape] = useState<CounterShape>('quadrado');
  const [theme, setTheme] = useState<CounterTheme>('blue');
  const [zeros, setZeros] = useState(5);
  const [customEmojis, setCustomEmojis] = useState<Record<string, string>>({});
  const [activeRows, setActiveRows] = useState<Record<CounterKey, boolean>>({ members: true, users: true, bots: true, invites: true });
  const [labels, setLabels] = useState<Record<CounterKey, string>>({ members: 'Membros', users: 'Users', bots: 'Bots', invites: 'Convites' });
  const [inviteText, setInviteText] = useState('https://discord.gg/onne');
  const [activeEmojiPicker, setActiveEmojiPicker] = useState<string | null>(null);

  const selectedChannel = useMemo(() => channels.find((channel) => channel.id === selectedChannelId) ?? channels[0], [selectedChannelId]);
  const visibleThemes = shape === 'premium' ? themes.filter((item) => item.premium) : themes.filter((item) => !item.premium);
  const effectiveTheme = theme;

  function setCounterShape(nextShape: CounterShape) {
    setShape(nextShape);
    if (nextShape === 'premium') {
      setTheme((current) => current === 'pink' || current === 'delux' || current === 'turquoise' ? current : 'turquoise');
    } else if (theme === 'delux' || theme === 'pink' || theme === 'turquoise') {
      setTheme('blue');
    }
  }

  function updateEmoji(key: string, emoji: string) {
    setCustomEmojis((current) => ({ ...current, [key]: emoji.slice(0, 4) }));
  }

  function updateLabel(key: CounterKey, value: string) {
    setLabels((current) => ({ ...current, [key]: value }));
  }

  function renderCounterRowPreview(row: typeof completeRows[number], compact = false) {
    const emoji = customEmojis[row.key] ?? row.defaultEmoji;
    const label = labels[row.key] ?? row.label;
    if (row.key === 'invites') {
      return <div className={`counter-invite-preview ${compact ? 'compact' : ''}`} key={row.key}>
        <span>{emoji}</span>
        <strong>{label}</strong>
        <small>{inviteText}</small>
      </div>;
    }
    return <div className={`counter-simple-row-preview ${compact ? 'compact' : ''}`} key={row.key}>
      <div><span>{emoji}</span><strong>{label}</strong></div>
      <CounterDigits value={row.value} theme={effectiveTheme} shape={shape} zeros={zeros} />
    </div>;
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

        <label className="field counter-channel-select-field">
          <span>Canal do contador</span>
          <select className="input counter-channel-select" value={selectedChannelId} onChange={(event) => setSelectedChannelId(event.target.value)}>
            {channels.map((channel) => <option key={channel.id} value={channel.id}>{channel.type === 'voice' ? '🔊' : '#'} {channel.emoji} · {channel.name} — {channel.topic}</option>)}
          </select>
        </label>
        <div className="counter-channel-current">
          <span className="counter-channel-icon">{selectedChannel.type === 'voice' ? <Volume2 size={19} /> : <HashIcon size={19} />}</span>
          <span className="counter-channel-main"><strong>{selectedChannel.emoji} · {selectedChannel.name}</strong><small>{selectedChannel.topic}</small></span>
        </div>
      </div>

      <div className="member-counter-config-grid">
        <section className={`card member-counter-config-card ${enabled ? '' : 'is-disabled'}`}>
          <div className="member-counter-header-row compact">
            <div>
              <span className="counter-kicker">CONFIGURAÇÃO</span>
              <h2>{selectedChannel.type === 'voice' ? 'Canal de voz' : 'Canal de texto'} <ChannelBadge channel={selectedChannel} /></h2>
              <p>Escolha apenas um modo. O modo simples configura Membros, Users, Bots e Convites; o modo completo cria a estrutura de categoria e canais.</p>
            </div>
            <button className={`theme-switch ${enabled ? 'on' : ''}`} type="button" role="switch" aria-checked={enabled} onClick={() => setEnabled((value) => !value)}><span /></button>
          </div>

          <div className="counter-mode-grid" role="tablist" aria-label="Modo do contador">
            <button type="button" className={`counter-mode-card ${mode === 'simple' ? 'active' : ''}`} onClick={() => setMode('simple')}>
              <Activity size={20} />
              <strong>Modo simples</strong>
              <span>Cria categoria e canais simples como Membros, Users, Bots e Convites.</span>
            </button>
            <button type="button" className={`counter-mode-card ${mode === 'complete' ? 'active' : ''}`} onClick={() => setMode('complete')}>
              <Server size={20} />
              <strong>Modo completo</strong>
              <span>Libera números em imagem, preenchimento com zeros e GIFs premium.</span>
            </button>
          </div>

          <div className="counter-settings-panel">
            {mode === 'simple' ? <div className="counter-simple-settings">
              <div className="counter-simple-note">
                <strong>Modo simples</strong>
                <span>Esse modo cria apenas a estrutura visual do Discord: categoria e canais com emoji, nome e valor. Sem imagens, temas, preenchimento com zeros ou GIFs.</span>
              </div>

              <div className="counter-complete-list clean simple-only">
                {completeRows.map((row) => <div key={row.key} className={`counter-complete-row-v2 simple ${activeRows[row.key] ? 'active' : ''}`}>
                  <div className="counter-complete-row-top">
                    <button className={`theme-switch ${activeRows[row.key] ? 'on' : ''}`} type="button" role="switch" aria-checked={activeRows[row.key]} onClick={() => setActiveRows((current) => ({ ...current, [row.key]: !current[row.key] }))}><span /></button>
                    <div className="counter-complete-title">
                      <strong>{labels[row.key] ?? row.label}</strong>
                      <span>{row.description}</span>
                    </div>
                    <span className="counter-complete-value">{row.key === 'invites' ? 'Link' : row.value.toLocaleString('pt-BR')}</span>
                  </div>
                  <div className="counter-complete-fields simple">
                    <label className="field counter-emoji-select"><span>Emoji</span><button type="button" className="input counter-emoji-button" onClick={() => setActiveEmojiPicker(row.key)}><Smile size={16}/><strong>{customEmojis[row.key] ?? row.defaultEmoji}</strong><small>Selecionar</small></button>{activeEmojiPicker === row.key && <MiniEmojiPicker onPick={(emoji) => { updateEmoji(row.key, emoji); setActiveEmojiPicker(null); }} onClose={() => setActiveEmojiPicker(null)} />}</label>
                    <label className="field"><span>Texto do canal</span><input className="input" value={labels[row.key] ?? row.label} onChange={(event) => updateLabel(row.key, event.target.value)} /></label>
                    {row.key === 'invites' && <label className="field full"><span>Link do convite ou mensagem</span><input className="input" value={inviteText} onChange={(event) => setInviteText(event.target.value)} placeholder="https://discord.gg/onne ou mensagem personalizada" /></label>}
                  </div>
                </div>)}
              </div>
            </div> : <>
              <div className="two-columns counter-form-grid complete-number-settings">
                <label className="field"><span>Preenchimento com zeros</span><input className="input" type="number" min={1} max={10} value={zeros} onChange={(event) => setZeros(Math.max(1, Math.min(10, Number(event.target.value) || 5)))} /></label>
              </div>

              <div className="counter-format-row">
                <span>Formato dos números</span>
                <label className={`counter-checkbox ${shape === 'quadrado' ? 'active' : ''}`}><input type="radio" checked={shape === 'quadrado'} onChange={() => setCounterShape('quadrado')} /> Quadrado</label>
                <label className={`counter-checkbox ${shape === 'redondo' ? 'active' : ''}`}><input type="radio" checked={shape === 'redondo'} onChange={() => setCounterShape('redondo')} /> Redondo</label>
                <label className={`counter-checkbox premium ${shape === 'premium' ? 'active' : ''}`}><input type="radio" checked={shape === 'premium'} onChange={() => setCounterShape('premium')} /> Premium GIF</label>
              </div>

              <div className="counter-theme-grid">
                {visibleThemes.map((item) => <button key={item.id} type="button" className={`counter-theme-option ${effectiveTheme === item.id ? 'active' : ''}`} onClick={() => setTheme(item.id)}>
                  <span className={`counter-theme-dot ${item.id}`} />
                  <strong>{item.label}</strong>
                  <small>{item.description}</small>
                </button>)}
              </div>

              <div className="counter-complete-static-note">
                <Sparkles size={18} />
                <div>
                  <strong>Modo completo</strong>
                  <span>Este modo personaliza apenas a renderização dos números, formatos, temas e GIFs. Emojis, nomes de canais e convite ficam no modo simples.</span>
                </div>
              </div>
            </>}
          </div>

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

          {mode === 'simple' ? <div className="counter-complete-preview simple-discord-only">
            <div className="discord-category-preview"><span>{selectedChannel.emoji}</span> Analytics</div>
            {completeRows.filter((row) => activeRows[row.key]).map((row) => <div key={row.key} className="discord-voice-preview">
              <Volume2 size={17} />
              <span>{customEmojis[row.key] ?? row.defaultEmoji}</span>
              <strong>{labels[row.key] ?? row.label}: {row.key === 'invites' ? inviteText : row.value.toLocaleString('pt-BR')}</strong>
            </div>)}
          </div> : <div className="counter-advanced-preview numbers-only">
            <CounterSampleRows theme={effectiveTheme} shape={shape} zeros={zeros} />
            <p>O Onne usará os assets reais no formato <strong>{shape === 'premium' ? 'Premium GIF' : shape}</strong> e tema <strong>{themes.find((item) => item.id === effectiveTheme)?.label}</strong>.</p>
          </div>}
        </aside>
      </div>
    </section>
  </>;
}
