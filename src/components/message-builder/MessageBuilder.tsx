'use client';

import { useMemo, useRef, useState, type ReactNode } from 'react';
import { Braces, ChevronDown, Download, FileJson, Hash, Image, Layers, LayoutTemplate, MessageSquareText, Palette, Play, Plus, Rows3, Save, Send, Smile, Trash2, Upload, Users, Volume2 } from 'lucide-react';

type BuilderMode = 'basic' | 'components-v2';
type ViewMode = 'split' | 'vertical' | 'json';
type BuilderTemplate = 'default' | 'simple-embed' | 'avatar-image';
type InsertTarget = 'content' | 'title' | 'description' | 'sectionText' | 'galleryDescription';
type InsertKind = 'channels' | 'roles' | 'emojis';

type MessageBuilderValue = {
  content: string;
  color: string;
  authorName: string;
  authorUrl: string;
  authorIconUrl: string;
  title: string;
  titleUrl: string;
  description: string;
  imageUrl: string;
  thumbnailUrl: string;
  footerText: string;
  footerIconUrl: string;
  buttonLabel: string;
  buttonUrl: string;
  sectionText: string;
  galleryUrl: string;
  galleryDescription: string;
  showSeparator: boolean;
  separatorSize: 'small' | 'large';
  containerAccent: string;
  containerSpoiler: boolean;
};

const defaultValue: MessageBuilderValue = {
  content: '👉 {user} entrou no servidor!',
  color: '#29A6FE',
  authorName: '',
  authorUrl: '',
  authorIconUrl: '',
  title: 'Bem-vindo ao {guild.name}',
  titleUrl: '',
  description: 'Olá {user}, seja bem-vindo ao {guild.name}. Agora somos {guild.memberCount} membros.',
  imageUrl: '',
  thumbnailUrl: '',
  footerText: 'Onne • Sistema de entrada',
  footerIconUrl: '',
  buttonLabel: 'Website do Onne',
  buttonUrl: 'https://onne.app.br/',
  sectionText: 'O Onne está pronto para ajudar este servidor.',
  galleryUrl: '',
  galleryDescription: '',
  showSeparator: true,
  separatorSize: 'small',
  containerAccent: '#29A6FE',
  containerSpoiler: false,
};

const colorPalette = ['#14B8A6', '#22C55E', '#2D9CDB', '#29A6FE', '#5865F2', '#9B59B6', '#E91E63', '#FACC15', '#F97316', '#EF4444', '#95A5A6', '#607D8B', '#0F9488', '#15803D', '#1F6E99', '#1D72B8', '#2437C9', '#71368A', '#AD1457', '#C77C00', '#C2410C', '#B91C1C', '#7F8C8D', '#455A64'];
const channelOptions = [
  { value: '{channel.boas-vindas}', label: 'boas-vindas', type: 'text' as const, hint: 'Mensagem de entrada' },
  { value: '{channel.regras}', label: 'regras', type: 'text' as const, hint: 'Regras do servidor' },
  { value: '{channel.geral}', label: 'geral', type: 'text' as const, hint: 'Canal principal' },
  { value: '{channel.logs}', label: 'logs', type: 'text' as const, hint: 'Registros do servidor' },
  { value: '{channel.saidas}', label: 'saidas', type: 'text' as const, hint: 'Mensagem de saída' },
  { value: '{channel.voice.geral}', label: 'Sala Geral', type: 'voice' as const, hint: 'Canal de voz' },
  { value: '{channel.voice.musica}', label: 'Música', type: 'voice' as const, hint: 'Canal de voz' },
  { value: '{channel.voice.staff}', label: 'Staff', type: 'voice' as const, hint: 'Canal de voz privado' },
];
const roleOptions = [
  { value: '{role.membro}', label: 'Membro', hint: 'Cargo padrão' },
  { value: '{role.admin}', label: 'Administrador', hint: 'Acesso total' },
  { value: '{role.moderador}', label: 'Moderador', hint: 'Moderação' },
  { value: '{role.premium}', label: 'Premium', hint: 'Assinante premium' },
  { value: '{role.equipe}', label: 'Equipe Onne', hint: 'Equipe do projeto' },
  { value: '{role.booster}', label: 'Booster', hint: 'Impulsionador' },
];
const emojiCategories = [
  { id: 'recent', icon: '◷', label: 'Recentes', emojis: ['💉', '💊', '🩹', '🛠️', '⛏️', '🌿', '🪴', '🥤', '😊', '😂', '🤣', '💗', '😍', '😔', '👌', '😘', '💕', '😁', '👍', '🙌', '🎉', '✨', '💎', '⭐', '🔥', '✅'] },
  { id: 'faces', icon: '☺', label: 'Carinhas e pessoas', emojis: ['😊', '😂', '🤣', '😍', '😔', '😁', '😘', '🥳', '😎', '😇', '😭', '😡', '🤔', '🤩', '😴', '🤦‍♀️', '🤦‍♂️', '🤷‍♀️', '🤷‍♂️', '👍', '🙌', '👌', '👏'] },
  { id: 'objects', icon: '◉', label: 'Objetos', emojis: ['💉', '💊', '🩹', '🛠️', '⛏️', '📌', '📎', '🔒', '🔔', '🎁', '💎', '⭐', '🔥', '✅', '⚙️', '🧰', '🪙', '💰'] },
  { id: 'nature', icon: '⚲', label: 'Natureza', emojis: ['🌿', '🪴', '🌱', '🌳', '🌙', '☀️', '⭐', '✨', '🔥', '💧', '⚡', '🌈', '❄️', '🍃'] },
  { id: 'food', icon: '◌', label: 'Comida', emojis: ['🥤', '🍕', '🍔', '🍟', '🍩', '🍪', '🍰', '🍎', '🍌', '🍓', '🍇', '☕', '🍫'] },
  { id: 'activity', icon: '◿', label: 'Atividades', emojis: ['🎉', '🎮', '🏆', '⚽', '🎲', '🎯', '🎵', '🎧', '🚀', '🛡️', '⚔️', '🧩'] },
  { id: 'symbols', icon: '▣', label: 'Símbolos', emojis: ['❤️', '💙', '💜', '🧡', '💗', '💕', '🟢', '🔵', '🔴', '🟡', '✅', '❌', '⚠️', '🔰', '♻️'] },
  { id: 'favorites', icon: '♡', label: 'Favoritos', emojis: ['❤️', '💎', '⭐', '🔥', '✅', '🎉', '🚀', '👑', '🛡️', '⚙️', '🔔'] },
];
const emojiOptions = emojiCategories.flatMap((category) => category.emojis);


const placeholders = [
  ['{user}', '@Matheus Felipe', 'Menciona o usuário.'],
  ['{user.name}', 'Matheus Felipe', 'Nome público do usuário.'],
  ['{user.avatar}', 'https://cdn.discordapp.com/avatar.png', 'URL do avatar do usuário.'],
  ['{user.id}', '1102719703664828497', 'ID único do usuário no Discord.'],
  ['{user.tag}', '@dev.matheusfelipe', 'Tag/username do Discord.'],
  ['{guild.name}', 'Vegas Community', 'Nome do servidor.'],
  ['{guild.memberCount}', '32', 'Quantidade de membros.'],
  ['{date}', '19/06/2026', 'Data atual.'],
  ['{time}', '09:07', 'Hora atual.'],
  ['{level}', '42', 'Level do usuário.'],
  ['{xp}', '98.200', 'XP do usuário.'],
  ['{money}', '250', 'Moedas do usuário.'],
  ['{diamonds}', '9.885', 'Diamantes do usuário.'],
];

const templates: Record<BuilderTemplate, MessageBuilderValue> = {
  default: defaultValue,
  'simple-embed': {
    ...defaultValue,
    content: '',
    title: 'Bem-vindo, {user.name}!',
    description: 'Você entrou no {guild.name}. Leia as regras e aproveite a comunidade.',
    buttonLabel: '',
    buttonUrl: '',
    sectionText: '',
  },
  'avatar-image': {
    ...defaultValue,
    content: '✨ {user} acabou de chegar!',
    authorName: '{user.name}',
    authorIconUrl: '{user.avatar}',
    title: 'Novo membro no {guild.name}',
    imageUrl: '{guild.icon}',
    thumbnailUrl: '{user.avatar}',
    sectionText: 'Mensagem avançada criada pelo Onne.',
  },
};

function replacePlaceholders(value: string) {
  return value
    .replaceAll('{user}', '@Matheus Felipe')
    .replaceAll('{user.name}', 'Matheus Felipe')
    .replaceAll('{guild.name}', 'Vegas Community')
    .replaceAll('{guild.memberCount}', '32')
    .replaceAll('{date}', '19/06/2026')
    .replaceAll('{time}', '09:07')
    .replaceAll('{level}', '42')
    .replaceAll('{xp}', '98.200')
    .replaceAll('{money}', '250')
    .replaceAll('{diamonds}', '9.885')
    .replaceAll('{user.avatar}', '')
    .replaceAll('{guild.icon}', '')
    .replaceAll('{channel.boas-vindas}', '#boas-vindas')
    .replaceAll('{channel.regras}', '#regras')
    .replaceAll('{channel.geral}', '#geral')
    .replaceAll('{channel.logs}', '#logs')
    .replaceAll('{channel.saidas}', '#saidas')
    .replaceAll('{channel.voice.geral}', '🔊 Sala Geral')
    .replaceAll('{channel.voice.musica}', '🔊 Música')
    .replaceAll('{channel.voice.staff}', '🔊 Staff')
    .replaceAll('{role.membro}', '@Membro')
    .replaceAll('{role.admin}', '@Admin')
    .replaceAll('{role.moderador}', '@Moderador')
    .replaceAll('{role.premium}', '@Premium')
    .replaceAll('{role.equipe}', '@Equipe')
    .replaceAll('{role.booster}', '@Booster');
}

function hexToRgb(hex: string) {
  const normalized = hex.replace('#', '').trim();
  const fallback = normalized.length === 3 ? normalized.split('').map((value) => value + value).join('') : normalized;
  const parsed = Number.parseInt(fallback || '29A6FE', 16);
  return {
    r: (parsed >> 16) & 255,
    g: (parsed >> 8) & 255,
    b: parsed & 255,
  };
}

function rgbToHex(r: number, g: number, b: number) {
  return `#${[r, g, b].map((value) => Math.max(0, Math.min(255, value)).toString(16).padStart(2, '0')).join('')}`.toUpperCase();
}

function rgbToHsv(r: number, g: number, b: number) {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const delta = max - min;
  let h = 0;

  if (delta !== 0) {
    if (max === rn) h = 60 * (((gn - bn) / delta) % 6);
    else if (max === gn) h = 60 * ((bn - rn) / delta + 2);
    else h = 60 * ((rn - gn) / delta + 4);
  }

  if (h < 0) h += 360;

  return {
    h: Math.round(h),
    s: max === 0 ? 0 : Math.round((delta / max) * 100),
    v: Math.round(max * 100),
  };
}

function hsvToRgb(h: number, s: number, v: number) {
  const sat = Math.max(0, Math.min(100, s)) / 100;
  const val = Math.max(0, Math.min(100, v)) / 100;
  const c = val * sat;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = val - c;
  let rp = 0;
  let gp = 0;
  let bp = 0;

  if (h >= 0 && h < 60) [rp, gp, bp] = [c, x, 0];
  else if (h >= 60 && h < 120) [rp, gp, bp] = [x, c, 0];
  else if (h >= 120 && h < 180) [rp, gp, bp] = [0, c, x];
  else if (h >= 180 && h < 240) [rp, gp, bp] = [0, x, c];
  else if (h >= 240 && h < 300) [rp, gp, bp] = [x, 0, c];
  else [rp, gp, bp] = [c, 0, x];

  return {
    r: Math.round((rp + m) * 255),
    g: Math.round((gp + m) * 255),
    b: Math.round((bp + m) * 255),
  };
}

function hexToSignedDecimal(hex: string) {
  const normalized = hex.replace('#', '').trim();
  const value = Number.parseInt(normalized || '000000', 16);
  return value > 0x7fffff ? value - 0x1000000 : value;
}

function colorFromHsv(h: number, s: number, v: number) {
  const rgb = hsvToRgb(h, s, v);
  return { ...rgb, hex: rgbToHex(rgb.r, rgb.g, rgb.b) };
}


function previewImageUrl(value: string) {
  const rendered = replacePlaceholders(value).trim();
  if (!rendered) return '';
  if (/^(https?:\/\/|data:image\/|blob:)/i.test(rendered)) return rendered;
  return '';
}

function ChannelToken({ name = 'boas-vindas' }: { name?: string }) {
  return <span className="channel-token"><Hash size={13}/>{name}</span>;
}

function VoiceToken({ name = 'Geral' }: { name?: string }) {
  return <span className="channel-token"><Volume2 size={13}/>{name}</span>;
}

function EmojiPickerPanel({ onInsert, onClose }: { onInsert: (value: string) => void; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(emojiCategories[0].id);
  const currentCategory = emojiCategories.find((category) => category.id === activeCategory) ?? emojiCategories[0];
  const normalizedQuery = query.trim().toLowerCase();
  const source = normalizedQuery.length > 0 ? Array.from(new Set(emojiOptions)) : currentCategory.emojis;
  const filtered = source.filter((emoji) => normalizedQuery.length === 0 || emoji.includes(normalizedQuery));

  function insertEmoji(emoji: string) {
    onInsert(emoji);
    onClose();
  }

  return <div className="emoji-picker-panel" onClick={(event) => event.stopPropagation()}>
    <div className="emoji-picker-titlebar">
      <strong>Emojis</strong>
      <button type="button" onClick={onClose} aria-label="Fechar emojis">×</button>
    </div>
    <div className="emoji-picker-tabs" role="tablist" aria-label="Filtros de emoji">
      <button type="button" aria-label="Voltar" onClick={() => setActiveCategory(emojiCategories[0].id)}>‹</button>
      {emojiCategories.map((category) => <button
        type="button"
        key={category.id}
        className={activeCategory === category.id ? 'active' : ''}
        onClick={() => { setActiveCategory(category.id); setQuery(''); }}
        aria-label={category.label}
        title={category.label}
      >{category.icon}</button>)}
    </div>
    <label className="emoji-picker-search">
      <span>⌕</span>
      <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Pesquisar emojis" />
    </label>
    <div className="emoji-picker-content">
      <span className="emoji-picker-section-title">{normalizedQuery ? 'Resultado da pesquisa' : currentCategory.label}</span>
      <div className="emoji-picker-grid">
        {filtered.map((emoji, index) => <button
          type="button"
          key={`${emoji}-${index}`}
          onClick={() => insertEmoji(emoji)}
          aria-label={`Inserir emoji ${emoji}`}
        ><span className="emoji-glyph">{emoji}</span></button>)}
      </div>
      {filtered.length === 0 && <div className="mention-picker-empty">Nenhum emoji encontrado.</div>}
    </div>
  </div>;
}

type MentionPickerKind = 'channels' | 'roles';

function MentionPickerPanel({ kind, onInsert, onClose }: { kind: MentionPickerKind; onInsert: (value: string) => void; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const isChannel = kind === 'channels';
  const items = isChannel ? channelOptions : roleOptions;
  const filtered = items.filter((item) => {
    const q = query.trim().toLowerCase();
    return q.length === 0 || item.label.toLowerCase().includes(q) || item.value.toLowerCase().includes(q) || item.hint.toLowerCase().includes(q);
  });

  return <div className="mention-picker-panel" onClick={(event) => event.stopPropagation()}>
    <div className="mention-picker-titlebar">
      <button type="button" aria-label="Voltar" onClick={onClose}>‹</button>
      <strong>{isChannel ? 'Selecionar canal' : 'Selecionar cargo'}</strong>
      <button type="button" aria-label="Fechar" onClick={onClose}>×</button>
    </div>
    <label className="mention-picker-search">
      <span>⌕</span>
      <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={isChannel ? 'Pesquisar canais' : 'Pesquisar cargos'} />
    </label>
    <div className="mention-picker-content">
      <span className="mention-picker-section-title">{isChannel ? 'Canais do servidor' : 'Cargos do servidor'}</span>
      <div className="mention-picker-list">
        {filtered.map((item) => {
          const textChannel = isChannel && 'type' in item && item.type === 'text';
          const voiceChannel = isChannel && 'type' in item && item.type === 'voice';
          return <button
            type="button"
            key={item.value}
            onClick={() => { onInsert(item.value); onClose(); }}
          >
            <span className="mention-picker-symbol" aria-hidden="true">
              {textChannel && <Hash size={18}/>} {voiceChannel && <Volume2 size={18}/>} {!isChannel && '@'}
            </span>
            <span className="mention-picker-copy">
              <strong>{item.label}</strong>
              <small>{item.hint}</small>
            </span>
            <span className="mention-picker-pin" aria-hidden="true">⌖</span>
          </button>;
        })}
      </div>
      {filtered.length === 0 && <div className="mention-picker-empty">Nenhum resultado encontrado.</div>}
    </div>
  </div>;
}


function InsertButtons({ onInsert }: { onInsert: (value: string) => void }) {
  const [open, setOpen] = useState<InsertKind | null>(null);
  const labels: Record<InsertKind, string> = { channels: 'Canais', roles: 'Cargos', emojis: 'Emojis' };
  const icons: Record<InsertKind, ReactNode> = { channels: <Hash size={15}/>, roles: <Users size={15}/>, emojis: <Smile size={15}/> };

  return <div className="message-editor-insert-row dropdown-row">
    {(['channels', 'roles', 'emojis'] as InsertKind[]).map((kind) => <div className="insert-dropdown" key={kind}>
      <button type="button" onClick={() => setOpen(open === kind ? null : kind)}>{icons[kind]} {labels[kind]} <ChevronDown size={14}/></button>
      {open === kind && kind === 'emojis' && <EmojiPickerPanel onInsert={onInsert} onClose={() => setOpen(null)} />}
      {open === kind && kind === 'channels' && <MentionPickerPanel kind="channels" onInsert={onInsert} onClose={() => setOpen(null)} />}
      {open === kind && kind === 'roles' && <MentionPickerPanel kind="roles" onInsert={onInsert} onClose={() => setOpen(null)} />}
    </div>)}
  </div>;
}

function ColorPickerModal({ value, onChange, onClose }: { value: string; onChange: (value: string) => void; onClose: () => void }) {
  const initialRgb = hexToRgb(value);
  const initialHsv = rgbToHsv(initialRgb.r, initialRgb.g, initialRgb.b);
  const [hue, setHue] = useState(initialHsv.h);
  const [saturation, setSaturation] = useState(initialHsv.s);
  const [brightness, setBrightness] = useState(initialHsv.v);
  const boardRef = useRef<HTMLDivElement | null>(null);
  const hueRef = useRef<HTMLDivElement | null>(null);
  const selected = colorFromHsv(hue, saturation, brightness);
  const hueColor = colorFromHsv(hue, 100, 100).hex;

  function apply(hex = selected.hex) {
    onChange(hex);
    onClose();
  }

  function setFromHex(hex: string) {
    if (!/^#?[0-9a-fA-F]{3,6}$/.test(hex.trim())) return;
    const nextRgb = hexToRgb(hex);
    const nextHsv = rgbToHsv(nextRgb.r, nextRgb.g, nextRgb.b);
    setHue(nextHsv.h);
    setSaturation(nextHsv.s);
    setBrightness(nextHsv.v);
  }

  function selectFromBoard(event: React.PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, event.clientX - rect.left));
    const y = Math.max(0, Math.min(rect.height, event.clientY - rect.top));
    setSaturation(Math.round((x / rect.width) * 100));
    setBrightness(Math.round(100 - (y / rect.height) * 100));
  }

  function selectFromHue(event: React.PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const y = Math.max(0, Math.min(rect.height, event.clientY - rect.top));
    setHue(Math.round((y / rect.height) * 360));
  }

  function randomColor(kind: 'any' | 'default' | 'vibrant' | 'pastel') {
    const presets = {
      any: colorPalette[Math.floor(Math.random() * colorPalette.length)],
      default: '#29A6FE',
      vibrant: ['#22C55E', '#29A6FE', '#E91E63', '#FACC15'][Math.floor(Math.random() * 4)],
      pastel: ['#93C5FD', '#A7F3D0', '#FBCFE8', '#FDE68A'][Math.floor(Math.random() * 4)],
    };
    const next = presets[kind];
    setFromHex(next);
    onChange(next);
  }

  return <div className="color-modal-overlay" onClick={onClose}>
    <div className="color-modal" onClick={(event) => event.stopPropagation()}>
      <h2>Selecionar Cor</h2>
      <div className="color-modal-body color-modal-body-fixed">
        <div className="color-board-column">
          <div className="color-preview-bar" style={{ background: selected.hex }} />
          <div className="color-picker-area">
            <div
              ref={boardRef}
              className="color-board interactive"
              style={{ background: `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, ${hueColor})` }}
              onPointerDown={selectFromBoard}
              onPointerMove={(event) => { if (event.buttons === 1) selectFromBoard(event); }}
            >
              <span
                className="color-cursor"
                style={{ left: `${saturation}%`, top: `${100 - brightness}%` }}
              />
            </div>
            <div
              ref={hueRef}
              className="color-hue-slider"
              onPointerDown={selectFromHue}
              onPointerMove={(event) => { if (event.buttons === 1) selectFromHue(event); }}
            >
              <span className="color-hue-cursor" style={{ top: `${(hue / 360) * 100}%` }} />
            </div>
          </div>
          <div className="builder-color-palette modal-palette">
            {colorPalette.map((color) => <button key={color} type="button" style={{ background: color }} aria-label={`Selecionar ${color}`} onClick={() => { setFromHex(color); onChange(color); }} className={selected.hex.toLowerCase() === color.toLowerCase() ? 'is-active' : ''} />)}
          </div>
        </div>
        <div className="color-fields">
          <label>R:<input type="number" value={selected.r} min={0} max={255} onChange={(event) => setFromHex(rgbToHex(Number(event.target.value), selected.g, selected.b))}/></label>
          <label>G:<input type="number" value={selected.g} min={0} max={255} onChange={(event) => setFromHex(rgbToHex(selected.r, Number(event.target.value), selected.b))}/></label>
          <label>B:<input type="number" value={selected.b} min={0} max={255} onChange={(event) => setFromHex(rgbToHex(selected.r, selected.g, Number(event.target.value)))}/></label>
          <label>Matiz:<input type="number" value={hue} min={0} max={360} onChange={(event) => setHue(Math.max(0, Math.min(360, Number(event.target.value))))}/></label>
          <label>Saturação:<input type="number" value={saturation} min={0} max={100} onChange={(event) => setSaturation(Math.max(0, Math.min(100, Number(event.target.value))))}/></label>
          <label>Brilho:<input type="number" value={brightness} min={0} max={100} onChange={(event) => setBrightness(Math.max(0, Math.min(100, Number(event.target.value))))}/></label>
          <label>Hexadecimal:<input value={selected.hex} onChange={(event) => setFromHex(event.target.value)}/></label>
          <label>Decimal:<input value={hexToSignedDecimal(selected.hex)} readOnly /></label>
        </div>
        <div className="color-onne-mascot">O</div>
      </div>
      <div className="color-random-row">
        <button type="button" onClick={() => randomColor('any')}>Cor Aleatória</button>
        <button type="button" onClick={() => randomColor('default')}>Cor Padrão Aleatória</button>
        <button type="button" onClick={() => randomColor('vibrant')}>Cor Vibrante Aleatória</button>
        <button type="button" onClick={() => randomColor('pastel')}>Cor Pastel Aleatória</button>
      </div>
      <div className="color-modal-footer"><button type="button" onClick={onClose}>Fechar</button><button type="button" onClick={() => apply()}>Aplicar</button></div>
    </div>
  </div>;
}


function ColorPicker({ value, onChange, label = 'Cor' }: { value: string; onChange: (value: string) => void; label?: string }) {
  const [modalOpen, setModalOpen] = useState(false);
  return <div className="builder-color-picker">
    <label>{label}</label>
    <div className="builder-color-row">
      <button className="builder-color-current" type="button" style={{ background: value }} aria-label="Cor selecionada" onClick={() => setModalOpen(true)}><span>✓</span></button>
      <button className="builder-color-edit" type="button" style={{ background: value }} onClick={() => setModalOpen(true)}><Palette size={14}/></button>
      <div className="builder-color-palette">
        {colorPalette.map((color) => <button key={color} type="button" style={{ background: color }} aria-label={`Selecionar ${color}`} onClick={() => onChange(color)} className={value.toLowerCase() === color.toLowerCase() ? 'is-active' : ''} />)}
      </div>
    </div>
    {modalOpen && <ColorPickerModal value={value} onChange={onChange} onClose={() => setModalOpen(false)} />}
  </div>;
}

function MessagePreview({ value, mode }: { value: MessageBuilderValue; mode: BuilderMode }) {
  const renderedContent = replacePlaceholders(value.content);
  const renderedTitle = replacePlaceholders(value.title);
  const renderedDescription = replacePlaceholders(value.description);
  const renderedImageUrl = previewImageUrl(value.imageUrl);
  const renderedThumbnailUrl = previewImageUrl(value.thumbnailUrl);
  const renderedGalleryUrl = previewImageUrl(value.galleryUrl);
  const hasEmbed = value.title || value.description || value.authorName || value.imageUrl || value.thumbnailUrl;
  return <div className="message-preview-shell">
    <div className="message-preview-header">Pré-visualização da Mensagem</div>
    <div className="discord-preview-box">
      <div className="preview-bot-avatar">O</div>
      <div className="discord-preview-content">
        <div className="discord-preview-author"><strong>Onne</strong><span className="app-badge">APP</span><span>Hoje às 09:07</span></div>
        {renderedContent && <p className="discord-preview-text">{renderedContent}</p>}
        {hasEmbed && <div className="discord-embed-preview" style={{ borderLeftColor: value.color || '#29A6FE' }}>
          {value.authorName && <div className="embed-author">{replacePlaceholders(value.authorName)}</div>}
          {renderedTitle && <strong className="embed-title">{renderedTitle}</strong>}
          {renderedDescription && <p>{renderedDescription}</p>}
          {value.thumbnailUrl && <div className="embed-thumb">{renderedThumbnailUrl ? <img src={renderedThumbnailUrl} alt="Thumbnail da mensagem" /> : <Image size={16}/>}</div>}
          {value.imageUrl && <div className="embed-image-preview">{renderedImageUrl ? <img src={renderedImageUrl} alt="Imagem da mensagem" /> : <><Image size={18}/> Imagem da mensagem</>}</div>}
          {value.footerText && <span className="embed-footer">{replacePlaceholders(value.footerText)}</span>}
        </div>}
        {mode === 'components-v2' && <div className="components-v2-preview">
          {value.showSeparator && <div className={`preview-separator ${value.separatorSize}`} />}
          {value.sectionText && <div className="preview-section"><MessageSquareText size={16}/><span>{replacePlaceholders(value.sectionText)}</span></div>}
          {value.galleryUrl && <div className="preview-gallery image">{renderedGalleryUrl ? <img src={renderedGalleryUrl} alt={value.galleryDescription || 'Item de galeria'} /> : <Image size={16}/>}<span>{value.galleryDescription || 'Item de galeria'}</span></div>}
          <div className="preview-container" style={{ borderLeftColor: value.containerAccent }}><Layers size={16}/> Container Components V2</div>
        </div>}
        {value.buttonLabel && <button className="discord-preview-button" type="button">{value.buttonLabel}</button>}
      </div>
    </div>
  </div>;
}

function JsonEditor({ value, onChange }: { value: MessageBuilderValue; onChange: (value: MessageBuilderValue) => void }) {
  const jsonValue = useMemo(() => JSON.stringify({ version: 1, builder: value }, null, 2), [value]);
  const [draft, setDraft] = useState(jsonValue);
  const [error, setError] = useState('');
  return <div className="json-editor-card">
    <div className="row">
      <div>
        <h3>Modo JSON</h3>
        <p>Edite diretamente a estrutura do Editor de Mensagens.</p>
      </div>
      {error && <span className="status danger">JSON inválido</span>}
    </div>
    <textarea className="json-editor-textarea" value={draft} onChange={(event) => setDraft(event.target.value)} spellCheck={false} />
    <div className="actions">
      <button className="btn btn-secondary" type="button" onClick={() => { setDraft(jsonValue); setError(''); }}><Braces size={16}/> Formatar JSON</button>
      <button className="btn" type="button" onClick={() => { try { const parsed = JSON.parse(draft); if (parsed?.builder) onChange(parsed.builder); setError(''); } catch { setError('Não foi possível ler o JSON.'); } }}><Save size={16}/> Aplicar JSON</button>
    </div>
  </div>;
}

function PlaceholdersTable() {
  const [open, setOpen] = useState(false);
  return <div className="placeholder-accordion">
    <button type="button" onClick={() => setOpen((value) => !value)}>
      <strong>Quais variáveis/placeholders eu posso usar?</strong>
      <ChevronDown className={open ? 'is-open' : ''} size={22}/>
    </button>
    {open && <div className="placeholder-table">
      <div className="placeholder-row header"><span>Placeholder</span><span>Valor</span><span>Descrição</span></div>
      {placeholders.map((row) => <div className="placeholder-row" key={row[0]}><code>{row[0]}</code><span>{row[1]}</span><span>{row[2]}</span></div>)}
    </div>}
  </div>;
}

function BuilderControls({ value, setValue, mode }: { value: MessageBuilderValue; setValue: (value: MessageBuilderValue) => void; mode: BuilderMode }) {
  const [embedVisible, setEmbedVisible] = useState(true);
  const [buttonRowVisible, setButtonRowVisible] = useState(Boolean(value.buttonLabel || value.buttonUrl));
  const [sectionVisible, setSectionVisible] = useState(true);
  const [galleryVisible, setGalleryVisible] = useState(false);
  const [separatorVisible, setSeparatorVisible] = useState(true);
  const [containerVisible, setContainerVisible] = useState(true);
  const patch = (changes: Partial<MessageBuilderValue>) => setValue({ ...value, ...changes });
  const insertInto = (target: InsertTarget, token: string) => patch({ [target]: `${value[target]} ${token}`.trim() } as Partial<MessageBuilderValue>);
  const removeEmbed = () => { patch({ authorName: '', authorUrl: '', authorIconUrl: '', title: '', titleUrl: '', description: '', imageUrl: '', thumbnailUrl: '', footerText: '', footerIconUrl: '' }); setEmbedVisible(false); };
  const removeButtons = () => { patch({ buttonLabel: '', buttonUrl: '' }); setButtonRowVisible(false); };

  return <div className="builder-left-stack">
    <section className="builder-section">
      <h3>Conteúdo da Mensagem</h3>
      <textarea value={value.content} onChange={(event) => patch({ content: event.target.value })} placeholder="Digite o texto da mensagem..." />
      <InsertButtons onInsert={(token) => insertInto('content', token)} />
    </section>

    {!embedVisible && <button className="btn full" type="button" onClick={() => setEmbedVisible(true)}><Plus size={16}/> Adicionar Embed</button>}
    {embedVisible && <section className="builder-section">
      <div className="section-title-row"><h3>Embed</h3><span className="status">Opcional</span></div>
      <ColorPicker value={value.color} onChange={(color) => patch({ color })} />
      <div className="form-grid two">
        <label>Nome do Autor<input value={value.authorName} onChange={(event) => patch({ authorName: event.target.value })} /></label>
        <label>URL do Autor<input value={value.authorUrl} onChange={(event) => patch({ authorUrl: event.target.value })} /></label>
        <label>URL do Ícone do Autor<input value={value.authorIconUrl} onChange={(event) => patch({ authorIconUrl: event.target.value })} /></label>
        <label>URL do Título<input value={value.titleUrl} onChange={(event) => patch({ titleUrl: event.target.value })} /></label>
      </div>
      <label>Título<textarea value={value.title} onChange={(event) => patch({ title: event.target.value })} /></label>
      <InsertButtons onInsert={(token) => insertInto('title', token)} />
      <label>Descrição<textarea value={value.description} onChange={(event) => patch({ description: event.target.value })} /></label>
      <InsertButtons onInsert={(token) => insertInto('description', token)} />
      <div className="form-grid two">
        <label>URL da Imagem<input value={value.imageUrl} onChange={(event) => patch({ imageUrl: event.target.value })} /></label>
        <label>URL da Thumbnail<input value={value.thumbnailUrl} onChange={(event) => patch({ thumbnailUrl: event.target.value })} /></label>
        <label>Texto do Rodapé<input value={value.footerText} onChange={(event) => patch({ footerText: event.target.value })} /></label>
        <label>URL do Ícone do Rodapé<input value={value.footerIconUrl} onChange={(event) => patch({ footerIconUrl: event.target.value })} /></label>
      </div>
      <button className="btn btn-secondary full" type="button" onClick={removeEmbed}><Trash2 size={16}/> Remover Embed</button>
    </section>}

    {!buttonRowVisible && <button className="btn full" type="button" onClick={() => { setButtonRowVisible(true); patch({ buttonLabel: value.buttonLabel || 'Website do Onne', buttonUrl: value.buttonUrl || 'https://onne.app.br/' }); }}><Plus size={16}/> Adicionar Linha de Botões (0/5)</button>}
    {buttonRowVisible && <section className="builder-section">
      <h3>Linha de Botões</h3>
      <div className="form-grid two">
        <label>Label<input value={value.buttonLabel} onChange={(event) => patch({ buttonLabel: event.target.value })} /></label>
        <label>URL<input value={value.buttonUrl} onChange={(event) => patch({ buttonUrl: event.target.value })} /></label>
      </div>
      <button className="btn full" type="button" onClick={() => patch({ buttonLabel: value.buttonLabel || 'Website do Onne', buttonUrl: value.buttonUrl || 'https://onne.app.br/' })}><Plus size={16}/> Adicionar Botão (1/5)</button>
      <button className="btn btn-secondary full" type="button" onClick={removeButtons}><Trash2 size={16}/> Remover Linha</button>
    </section>}

    {mode === 'components-v2' && <>
      {!sectionVisible && <button className="btn full" type="button" onClick={() => setSectionVisible(true)}><Plus size={16}/> Adicionar Seção</button>}
      {sectionVisible && <section className="builder-section">
        <h3>Seção</h3>
        <label>Texto 1<textarea value={value.sectionText} onChange={(event) => patch({ sectionText: event.target.value })} /></label>
        <InsertButtons onInsert={(token) => insertInto('sectionText', token)} />
        <div className="actions compact"><button className="btn" type="button" onClick={() => patch({ sectionText: `${value.sectionText}\nNovo texto`.trim() })}><Plus size={16}/> Adicionar Texto (1/3)</button><button className="btn" type="button"><Plus size={16}/> Adicionar Thumbnail</button></div>
        <button className="btn btn-secondary full" type="button" onClick={() => { patch({ sectionText: '' }); setSectionVisible(false); }}><Trash2 size={16}/> Remover</button>
      </section>}

      {!galleryVisible && <button className="btn full" type="button" onClick={() => setGalleryVisible(true)}><Plus size={16}/> Adicionar Galeria</button>}
      {galleryVisible && <section className="builder-section">
        <h3>Galeria de Mídia</h3>
        <label>URL da Imagem<input value={value.galleryUrl} onChange={(event) => patch({ galleryUrl: event.target.value })} /></label>
        <label>Descrição opcional<textarea value={value.galleryDescription} onChange={(event) => patch({ galleryDescription: event.target.value })} /></label>
        <InsertButtons onInsert={(token) => insertInto('galleryDescription', token)} />
        <button className="btn full" type="button" onClick={() => patch({ galleryDescription: value.galleryDescription || 'Imagem adicionada pelo Onne.' })}><Plus size={16}/> Adicionar Item (1/10)</button>
        <button className="btn btn-secondary full" type="button" onClick={() => { patch({ galleryUrl: '', galleryDescription: '' }); setGalleryVisible(false); }}><Trash2 size={16}/> Remover</button>
      </section>}

      {!separatorVisible && <button className="btn full" type="button" onClick={() => setSeparatorVisible(true)}><Plus size={16}/> Adicionar Separador</button>}
      {separatorVisible && <section className="builder-section">
        <h3>Separador</h3>
        <label className="switch-line"><span>Mostrar Linha Divisória</span><input type="checkbox" checked={value.showSeparator} onChange={(event) => patch({ showSeparator: event.target.checked })} /></label>
        <div className="radio-card-list">
          <button type="button" className={value.separatorSize === 'small' ? 'is-selected' : ''} onClick={() => patch({ separatorSize: 'small' })}><span/> <div><strong>Pequeno</strong><p>Espaçamento menor entre elementos</p></div></button>
          <button type="button" className={value.separatorSize === 'large' ? 'is-selected' : ''} onClick={() => patch({ separatorSize: 'large' })}><span/> <div><strong>Grande</strong><p>Espaçamento maior entre elementos</p></div></button>
        </div>
        <button className="btn btn-secondary full" type="button" onClick={() => { patch({ showSeparator: false }); setSeparatorVisible(false); }}><Trash2 size={16}/> Remover</button>
      </section>}

      {!containerVisible && <button className="btn full" type="button" onClick={() => setContainerVisible(true)}><Plus size={16}/> Adicionar Container</button>}
      {containerVisible && <section className="builder-section container-section">
        <h3>Container</h3>
        <ColorPicker value={value.containerAccent} onChange={(color) => patch({ containerAccent: color })} label="Cor de Destaque" />
        <label className="switch-line"><span>Marcar como Spoiler</span><input type="checkbox" checked={value.containerSpoiler} onChange={(event) => patch({ containerSpoiler: event.target.checked })} /></label>
        <div className="actions compact"><button className="btn" type="button" onClick={() => patch({ sectionText: value.sectionText || 'Texto dentro do container.' })}>Adicionar Texto</button><button className="btn" type="button" onClick={() => setButtonRowVisible(true)}>Adicionar Linha de Botões</button><button className="btn" type="button" onClick={() => setSectionVisible(true)}>Adicionar Seção</button><button className="btn" type="button" onClick={() => setSeparatorVisible(true)}>Adicionar Separador</button><button className="btn" type="button" onClick={() => setGalleryVisible(true)}>Adicionar Galeria</button></div>
        <button className="btn btn-secondary full" type="button" onClick={() => { patch({ containerAccent: '#29A6FE', containerSpoiler: false }); setContainerVisible(false); }}><Trash2 size={16}/> Remover</button>
      </section>}
    </>}
  </div>;
}

export function MessageBuilder({ title = 'Editor de Mensagem', onClose }: { title?: string; onClose?: () => void }) {
  const [value, setValue] = useState<MessageBuilderValue>(defaultValue);
  const [mode, setMode] = useState<BuilderMode>('components-v2');
  const [viewMode, setViewMode] = useState<ViewMode>('split');
  const [templateOpen, setTemplateOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  function applyTemplate(template: BuilderTemplate) {
    setValue(templates[template]);
    setTemplateOpen(false);
  }

  function importJson(file?: File) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        if (parsed?.builder) setValue(parsed.builder);
      } catch {
        window.alert('Não foi possível importar este JSON.');
      }
    };
    reader.readAsText(file);
  }

  return <div className="message-builder">
    <div className="message-builder-head">
      <div>
        <h2>{title}</h2>
        <p>Crie textos, embeds, botões e Components V2 com prévia visual do Onne.</p>
      </div>
      {onClose && <button className="message-builder-close" type="button" onClick={onClose}>Fechar</button>}
    </div>

    <div className="message-builder-toolbar">
      <button className="btn" type="button" onClick={() => setTemplateOpen((open) => !open)}><LayoutTemplate size={16}/> Templates de Mensagens</button>
      <button className="btn" type="button" onClick={() => fileInputRef.current?.click()}><Upload size={16}/> Importar</button>
      <input ref={fileInputRef} type="file" accept="application/json,.json" hidden onChange={(event) => importJson(event.target.files?.[0])}/>
      <button className="btn" type="button" onClick={() => setViewMode(viewMode === 'json' ? 'split' : 'json')}><FileJson size={16}/> Modo de edição</button>
      <button className="btn" type="button"><Send size={16}/> Testar Mensagem</button>
      <button className="btn" type="button" onClick={() => setViewMode(viewMode === 'vertical' ? 'split' : 'vertical')}><Rows3 size={16}/> Visualização na Vertical</button>
      <button className="btn btn-secondary" type="button" onClick={() => {
        const blob = new Blob([JSON.stringify({ version: 1, builder: value }, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = 'onne-message-builder.json';
        anchor.click();
        URL.revokeObjectURL(url);
      }}><Download size={16}/> Exportar JSON</button>
    </div>

    {templateOpen && <div className="template-picker-card">
      <button type="button" onClick={() => applyTemplate('default')}><LayoutTemplate size={18}/><strong>Padrão</strong><span>Texto simples com botão.</span></button>
      <button type="button" onClick={() => applyTemplate('simple-embed')}><MessageSquareText size={18}/><strong>Embed simples</strong><span>Título, descrição e cor.</span></button>
      <button type="button" onClick={() => applyTemplate('avatar-image')}><Image size={18}/><strong>Embed com Avatar e Imagem</strong><span>Autor, thumbnail e imagem.</span></button>
    </div>}

    <div className="message-mode-card">
      <span>Modo de Mensagem</span>
      <button type="button" className={mode === 'basic' ? 'is-selected' : ''} onClick={() => setMode('basic')}><span/> <div><strong>Modo Básico</strong><p>Mensagens com texto, embeds e botões.</p></div></button>
      <button type="button" className={mode === 'components-v2' ? 'is-selected' : ''} onClick={() => setMode('components-v2')}><span/> <div><strong>Modo Components V2 (Avançado)</strong><p>Texto, botões, seções, galerias, separadores e containers.</p></div></button>
    </div>

    {viewMode === 'json' ? <JsonEditor value={value} onChange={setValue} /> : <div className={`message-builder-grid ${viewMode === 'vertical' ? 'is-vertical' : ''}`}>
      <BuilderControls value={value} setValue={setValue} mode={mode} />
      <MessagePreview value={value} mode={mode} />
    </div>}

    <PlaceholdersTable />
  </div>;
}

export function WelcomeGoodbyeSettings() {
  const [welcomeEnabled, setWelcomeEnabled] = useState(false);
  const [goodbyeEnabled, setGoodbyeEnabled] = useState(false);
  const [editorOpen, setEditorOpen] = useState<'welcome' | 'goodbye' | null>(null);

  return <>
    <div className="welcome-settings-grid">
      <section className={`card message-config-card ${welcomeEnabled ? 'is-enabled' : ''}`}>
        <div className="row">
          <div>
            <h2>Mensagem de Entrada</h2>
            <p>Envie uma mensagem automática quando alguém entrar no servidor.</p>
          </div>
          <label className="pretty-switch"><input type="checkbox" checked={welcomeEnabled} onChange={(event) => setWelcomeEnabled(event.target.checked)} /><span /></label>
        </div>
        <label>Canal da mensagem<select disabled={!welcomeEnabled}><option>#boas-vindas</option><option>#geral</option><option>#entrada</option></select></label>
        <div className="saved-message-preview"><MessagePreview value={defaultValue} mode="components-v2" /></div>
        <div className="actions"><button className="btn btn-secondary" type="button" disabled={!welcomeEnabled} onClick={() => setEditorOpen('welcome')}><Palette size={16}/> Editar mensagem</button><button className="btn" type="button" disabled={!welcomeEnabled}><Play size={16}/> Testar</button><button className="btn" type="button" disabled={!welcomeEnabled}><Save size={16}/> Salvar</button></div>
      </section>

      <section className={`card message-config-card ${goodbyeEnabled ? 'is-enabled' : ''}`}>
        <div className="row">
          <div>
            <h2>Mensagem de Saída</h2>
            <p>Envie uma mensagem automática quando alguém sair do servidor.</p>
          </div>
          <label className="pretty-switch"><input type="checkbox" checked={goodbyeEnabled} onChange={(event) => setGoodbyeEnabled(event.target.checked)} /><span /></label>
        </div>
        <label>Canal da mensagem<select disabled={!goodbyeEnabled}><option>#saidas</option><option>#geral</option><option>#logs</option></select></label>
        <div className="saved-message-preview"><MessagePreview value={{ ...defaultValue, content: '👋 {user.name} saiu do servidor.', title: 'Até logo, {user.name}', description: 'Esperamos ver você novamente no {guild.name}.', sectionText: '' }} mode="basic" /></div>
        <div className="actions"><button className="btn btn-secondary" type="button" disabled={!goodbyeEnabled} onClick={() => setEditorOpen('goodbye')}><Palette size={16}/> Editar mensagem</button><button className="btn" type="button" disabled={!goodbyeEnabled}><Play size={16}/> Testar</button><button className="btn" type="button" disabled={!goodbyeEnabled}><Save size={16}/> Salvar</button></div>
      </section>
    </div>

    <section className="card message-builder-rules-card">
      <h2>Padrões de marcação</h2>
      <div className="message-rules-list"><span><ChannelToken /> Canal de texto</span><span><VoiceToken /> Canal de voz</span><span><code className="command-token">/entrada</code> Comando do Onne</span></div>
    </section>

    {editorOpen && <div className="builder-modal-overlay"><div className="builder-modal"><MessageBuilder title={editorOpen === 'welcome' ? 'Editor de Entrada' : 'Editor de Saída'} onClose={() => setEditorOpen(null)} /></div></div>}
  </>;
}
