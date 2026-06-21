'use client';

import { useMemo, useState } from 'react';
import { ArrowLeft, BellRing, CalendarClock, CheckCircle2, Clapperboard, ExternalLink, Globe2, Link as LinkIcon, Plus, Radio, Save, Search, Settings, Trash2, Video, X } from 'lucide-react';
import { PageHeader } from '@/components/AppShell';
import { MessageBuilder } from '@/components/message-builder/MessageBuilder';

type YoutubeChannel = {
  id: string;
  name: string;
  url: string;
  avatar: string;
  notifyChannel: string;
  message: string;
  notifyVideos: boolean;
  notifyLives: boolean;
  mentionEveryone: boolean;
};

const discordChannels = [
  { id: 'boas-vindas', label: 'boas-vindas' },
  { id: 'atualizacao', label: 'atualização' },
  { id: 'youtube', label: 'youtube' },
  { id: 'avisos', label: 'avisos' },
  { id: 'geral', label: 'geral' },
];

function normalizeYoutubeUrl(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return '';
  if (trimmed.startsWith('@')) return `https://www.youtube.com/${trimmed}`;
  if (trimmed.includes('youtube.com') || trimmed.includes('youtu.be')) return trimmed;
  return `https://www.youtube.com/@${trimmed.replace(/^@/, '')}`;
}

function getChannelNameFromUrl(url: string) {
  const fallback = 'Canal do YouTube';
  const cleaned = url.trim();
  const handle = cleaned.match(/@([^/?#]+)/)?.[1];
  if (handle) return handle.replace(/[-_]/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
  const parts = cleaned.split('/').filter(Boolean);
  const last = parts.at(-1);
  if (!last || last.includes('youtube.com')) return fallback;
  return last.replace(/[-_]/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
}

function YoutubeMessagePreview({ channel }: { channel: YoutubeChannel }) {
  return <div className="youtube-discord-preview">
    <div className="youtube-preview-avatar">O</div>
    <div className="youtube-preview-body">
      <div className="youtube-preview-head"><strong>Onne</strong><span>APP</span><small>Hoje às 09:07</small></div>
      <p>{channel.message}</p>
      <div className="youtube-video-card">
        <div className="youtube-video-thumb"><Clapperboard size={28}/></div>
        <div>
          <strong>Novo vídeo publicado</strong>
          <span>{channel.name} acabou de postar um conteúdo novo.</span>
        </div>
      </div>
    </div>
  </div>;
}

export default function ServerYoutubeNotificationsPage() {
  const isPremium = true;
  const limit = isPremium ? 3 : 1;
  const [channels, setChannels] = useState<YoutubeChannel[]>([]);
  const [addOpen, setAddOpen] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
  const [draftUrl, setDraftUrl] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedChannel = useMemo(() => channels.find((channel) => channel.id === selectedId) || null, [channels, selectedId]);
  const reachedLimit = channels.length >= limit;

  function addChannel() {
    const url = normalizeYoutubeUrl(draftUrl);
    if (!url || reachedLimit) return;
    const name = getChannelNameFromUrl(url);
    const nextChannel: YoutubeChannel = {
      id: `${Date.now()}`,
      name,
      url,
      avatar: name.slice(0, 1).toUpperCase(),
      notifyChannel: 'boas-vindas',
      message: `📺 Novo vídeo no canal **${name}**! {video.url}`,
      notifyVideos: true,
      notifyLives: true,
      mentionEveryone: false,
    };
    setChannels((items) => [...items, nextChannel]);
    setSelectedId(nextChannel.id);
    setDraftUrl('');
    setAddOpen(false);
  }

  function patchSelected(changes: Partial<YoutubeChannel>) {
    if (!selectedChannel) return;
    setChannels((items) => items.map((item) => item.id === selectedChannel.id ? { ...item, ...changes } : item));
  }

  function removeSelected() {
    if (!selectedChannel) return;
    setChannels((items) => items.filter((item) => item.id !== selectedChannel.id));
    setSelectedId(null);
  }

  if (selectedChannel) {
    return <>
      <PageHeader title="Notificações do YouTube" description="Configure onde o Onne avisará quando seus canais favoritos publicarem vídeos ou iniciarem lives." />
      <section className="youtube-detail-card card">
        <button className="btn btn-secondary youtube-back-button" type="button" onClick={() => setSelectedId(null)}><ArrowLeft size={16}/> Voltar para a lista de canais do YouTube</button>
        <div className="youtube-channel-header">
          <div className="youtube-channel-avatar">{selectedChannel.avatar}</div>
          <div>
            <h2>{selectedChannel.name}</h2>
            <a href={selectedChannel.url} target="_blank" rel="noreferrer"><ExternalLink size={14}/> Abrir canal</a>
          </div>
        </div>

        <div className="youtube-settings-grid">
          <label className="youtube-field full">Canal onde serão enviadas as mensagens
            <select value={selectedChannel.notifyChannel} onChange={(event) => patchSelected({ notifyChannel: event.target.value })}>
              {discordChannels.map((channel) => <option key={channel.id} value={channel.id}># {channel.label}</option>)}
            </select>
          </label>

          <div className="youtube-toggle-row">
            <div><strong>Notificar novos vídeos</strong><span>Enviar aviso quando o canal publicar um vídeo.</span></div>
            <button className={`theme-switch ${selectedChannel.notifyVideos ? 'on' : ''}`} type="button" onClick={() => patchSelected({ notifyVideos: !selectedChannel.notifyVideos })} aria-label="Alternar vídeos" />
          </div>
          <div className="youtube-toggle-row">
            <div><strong>Notificar lives</strong><span>Enviar aviso quando o canal iniciar uma live.</span></div>
            <button className={`theme-switch ${selectedChannel.notifyLives ? 'on' : ''}`} type="button" onClick={() => patchSelected({ notifyLives: !selectedChannel.notifyLives })} aria-label="Alternar lives" />
          </div>
          <div className="youtube-toggle-row">
            <div><strong>Mencionar todos</strong><span>Adicionar @everyone na mensagem. Use com cuidado.</span></div>
            <button className={`theme-switch ${selectedChannel.mentionEveryone ? 'on' : ''}`} type="button" onClick={() => patchSelected({ mentionEveryone: !selectedChannel.mentionEveryone })} aria-label="Alternar menção" />
          </div>
        </div>

        <div className="youtube-message-block">
          <div className="row">
            <div><h3>Mensagem</h3><p>Use o editor padrão para personalizar texto, embeds, botões e placeholders.</p></div>
            <button className="btn btn-primary" type="button" onClick={() => setEditorOpen(true)}><Settings size={16}/> Editar</button>
          </div>
          <YoutubeMessagePreview channel={selectedChannel} />
        </div>

        <div className="youtube-actions-row">
          <button className="btn btn-danger" type="button" onClick={removeSelected}><Trash2 size={16}/> Remover canal</button>
          <button className="btn btn-secondary" type="button"><BellRing size={16}/> Testar notificação</button>
          <button className="btn btn-primary" type="button"><Save size={16}/> Salvar configurações</button>
        </div>
      </section>

      {editorOpen && <div className="message-builder-modal-backdrop"><MessageBuilder title={`Mensagem do YouTube • ${selectedChannel.name}`} onClose={() => setEditorOpen(false)} /></div>}
    </>;
  }

  return <>
    <PageHeader title="Notificações do YouTube" description="Anuncie vídeos e lives novas dos seus canais favoritos para seus membros." />
    <section className="youtube-page card">
      <div className="youtube-page-top">
        <div>
          <h2>Canais que você está seguindo</h2>
          <p>{channels.length} de {limit} canais • {isPremium ? 'Plano Premium' : 'Plano Free'}</p>
        </div>
        <button className="btn btn-success" type="button" disabled={reachedLimit} onClick={() => setAddOpen(true)}><Plus size={16}/> Adicionar canal</button>
      </div>

      <div className="youtube-limit-banner">
        <CrownIcon premium={isPremium} />
        <div><strong>{isPremium ? 'Premium ativo: até 3 canais' : 'Plano Free: 1 canal'}</strong><span>Use o editor de mensagens para configurar cada notificação individualmente.</span></div>
      </div>

      {channels.length === 0 ? <div className="youtube-empty-state">
        <Clapperboard size={58}/>
        <strong>Nenhum canal configurado</strong>
        <span>Adicione um canal do YouTube para o Onne avisar quando houver vídeo ou live nova.</span>
      </div> : <div className="youtube-channel-list">
        {channels.map((channel) => <article className="youtube-channel-row" key={channel.id}>
          <div className="youtube-channel-mini-avatar">{channel.avatar}</div>
          <div>
            <strong>{channel.name}</strong>
            <span><LinkIcon size={13}/> {channel.url}</span>
          </div>
          <div className="youtube-channel-badges">
            {channel.notifyVideos && <span><Video size={13}/> Vídeos</span>}
            {channel.notifyLives && <span><Radio size={13}/> Lives</span>}
          </div>
          <button className="btn btn-secondary" type="button" onClick={() => setSelectedId(channel.id)}>Editar</button>
        </article>)}
      </div>}
    </section>

    {addOpen && <div className="youtube-modal-backdrop" role="dialog" aria-modal="true" aria-label="Adicionar canal do YouTube">
      <div className="youtube-add-modal">
        <button className="youtube-modal-close" type="button" aria-label="Fechar" onClick={() => setAddOpen(false)}><X size={18}/></button>
        <Clapperboard size={34}/>
        <h2>Adicionar canal</h2>
        <p>Cole a URL do canal, @handle ou link do YouTube.</p>
        <label className="youtube-field">URL do canal
          <div className="youtube-input-with-icon"><Search size={16}/><input value={draftUrl} onChange={(event) => setDraftUrl(event.target.value)} placeholder="https://www.youtube.com/@Onne" autoFocus /></div>
        </label>
        <div className="youtube-modal-actions">
          <button className="btn btn-secondary" type="button" onClick={() => setAddOpen(false)}>Fechar</button>
          <button className="btn btn-primary" type="button" onClick={addChannel} disabled={!draftUrl.trim() || reachedLimit}>Continuar</button>
        </div>
      </div>
    </div>}
  </>;
}

function CrownIcon({ premium }: { premium: boolean }) {
  return <span className={`youtube-limit-icon ${premium ? 'premium' : ''}`}>{premium ? <CheckCircle2 size={20}/> : <Globe2 size={20}/>}</span>;
}
