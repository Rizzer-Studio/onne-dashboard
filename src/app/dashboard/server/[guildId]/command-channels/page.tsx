'use client';

import { PageHeader } from '@/components/AppShell';
import { CheckCircle2, Hash, Mic2, Save, ShieldCheck, SlidersHorizontal, XCircle } from 'lucide-react';
import { useMemo, useState, type Dispatch, type SetStateAction } from 'react';

const textChannels = [
  { id: 'geral', name: 'geral', type: 'text' as const },
  { id: 'comandos', name: 'comandos', type: 'text' as const },
  { id: 'rpg', name: 'rpg', type: 'text' as const },
  { id: 'logs', name: 'logs', type: 'text' as const },
  { id: 'staff', name: 'staff', type: 'text' as const },
  { id: 'boas-vindas', name: 'boas-vindas', type: 'text' as const },
];

const voiceChannels = [
  { id: 'sala-geral', name: 'Sala Geral', type: 'voice' as const },
  { id: 'call-rpg', name: 'Call RPG', type: 'voice' as const },
  { id: 'equipe', name: 'Equipe', type: 'voice' as const },
];

const allChannels = [...textChannels, ...voiceChannels];

type ChannelType = typeof allChannels[number];
type Mode = 'blocked' | 'allowed';

function ChannelToken({ channel }: { channel: ChannelType }) {
  const Icon = channel.type === 'text' ? Hash : Mic2;

  return (
    <span className="channel-token command-channel-token">
      <Icon size={15} />
      <span>{channel.name}</span>
    </span>
  );
}

function ChannelSelector({
  title,
  description,
  channels,
  selected,
  disabled,
  onToggle,
}: {
  title: string;
  description: string;
  channels: ChannelType[];
  selected: Set<string>;
  disabled: boolean;
  onToggle: (channelId: string) => void;
}) {
  return (
    <div className={`channel-select-card ${disabled ? 'disabled' : ''}`}>
      <div className="channel-select-head">
        <div>
          <strong>{title}</strong>
          <span>{description}</span>
        </div>
        <span className="status">{selected.size} selecionados</span>
      </div>

      <div className="channel-option-grid">
        {channels.map((channel) => {
          const active = selected.has(channel.id);
          return (
            <button
              className={`channel-option ${active ? 'active' : ''}`}
              type="button"
              key={channel.id}
              disabled={disabled}
              onClick={() => onToggle(channel.id)}
            >
              <ChannelToken channel={channel} />
              <span className="channel-option-check">{active ? <CheckCircle2 size={16} /> : null}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function SelectedChannelsList({ title, empty, channels, icon }: { title: string; empty: string; channels: ChannelType[]; icon: 'allowed' | 'blocked' }) {
  const Icon = icon === 'allowed' ? CheckCircle2 : XCircle;

  return (
    <div className="channel-result-card">
      <div className="channel-result-title">
        <Icon size={18} />
        <strong>{title}</strong>
      </div>
      {channels.length > 0 ? (
        <div className="channel-result-list">
          {channels.map((channel) => (
            <ChannelToken channel={channel} key={channel.id} />
          ))}
        </div>
      ) : (
        <p>{empty}</p>
      )}
    </div>
  );
}

export default function ServerCommandChannelsPage() {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<Mode>('blocked');
  const [blockedChannels, setBlockedChannels] = useState<Set<string>>(() => new Set(['staff', 'logs']));
  const [allowedChannels, setAllowedChannels] = useState<Set<string>>(() => new Set(['comandos', 'rpg']));

  const blockedList = useMemo(() => allChannels.filter((channel) => blockedChannels.has(channel.id)), [blockedChannels]);
  const allowedList = useMemo(() => allChannels.filter((channel) => allowedChannels.has(channel.id)), [allowedChannels]);

  function toggleFromSet(setter: Dispatch<SetStateAction<Set<string>>>, channelId: string) {
    setter((current) => {
      const next = new Set(current);
      if (next.has(channelId)) next.delete(channelId);
      else next.add(channelId);
      return next;
    });
  }

  return (
    <>
      <PageHeader
        title="Canais de comandos"
        description="Defina em quais canais o Onne pode ou não pode receber comandos. Por padrão, esta opção vem desativada e o bot pode usar todos os canais."
      />

      <section className="card server-config-card command-channel-settings-card">
        <div className="row">
          <div>
            <h2>Controle de canais</h2>
            <p>Ative apenas se quiser limitar os canais onde os comandos do Onne serão aceitos.</p>
          </div>
          <span className={enabled ? 'status' : 'status muted'}>{enabled ? 'Restrição ativa' : 'Livre em todos os canais'}</span>
        </div>

        <div className="command-channel-main-grid">
          <div className="command-channel-switch-panel">
            <div className="prefix-switch-row">
              <div>
                <strong>Ativar controle por canal</strong>
                <span>Quando desligado, o Onne poderá receber comandos em todos os canais do servidor.</span>
              </div>
              <button
                className={`theme-switch ${enabled ? 'on' : ''}`}
                type="button"
                aria-label={enabled ? 'Desativar controle de canais' : 'Ativar controle de canais'}
                onClick={() => setEnabled((value) => !value)}
              />
            </div>

            <div className="channel-mode-tabs" aria-label="Modo de configuração dos canais">
              <button className={mode === 'blocked' ? 'active' : ''} type="button" disabled={!enabled} onClick={() => setMode('blocked')}>
                Canais proibidos
              </button>
              <button className={mode === 'allowed' ? 'active' : ''} type="button" disabled={!enabled} onClick={() => setMode('allowed')}>
                Canais permitidos
              </button>
            </div>

            <div className="command-channel-note">
              <ShieldCheck size={18} />
              <span>
                O padrão recomendado é bloquear canais sensíveis como <ChannelToken channel={textChannels[3]} /> e permitir comandos em <ChannelToken channel={textChannels[1]} />.
              </span>
            </div>
          </div>

          <div className="command-channel-preview-panel">
            <SlidersHorizontal size={22} />
            <div>
              <strong>Regra atual</strong>
              <span>{enabled ? 'O Onne seguirá as listas configuradas abaixo.' : 'Nenhuma restrição ativa. Todos os canais aceitam comandos.'}</span>
            </div>
          </div>
        </div>
      </section>

      {mode === 'blocked' ? (
        <ChannelSelector
          title="Canais que não podem receber comandos"
          description="Escolha os canais onde o Onne deve ignorar comandos enviados pelos usuários."
          channels={allChannels}
          selected={blockedChannels}
          disabled={!enabled}
          onToggle={(channelId) => toggleFromSet(setBlockedChannels, channelId)}
        />
      ) : (
        <ChannelSelector
          title="Canais que podem receber comandos"
          description="Escolha os canais onde o Onne poderá aceitar comandos."
          channels={allChannels}
          selected={allowedChannels}
          disabled={!enabled}
          onToggle={(channelId) => toggleFromSet(setAllowedChannels, channelId)}
        />
      )}

      <section className="command-channel-results-grid">
        <SelectedChannelsList
          title="Canais aceitos"
          empty="Todos os canais estão aceitos enquanto a configuração estiver desativada ou sem canais permitidos definidos."
          channels={enabled ? allowedList : allChannels}
          icon="allowed"
        />
        <SelectedChannelsList
          title="Canais não aceitos"
          empty="Nenhum canal bloqueado."
          channels={enabled ? blockedList : []}
          icon="blocked"
        />
      </section>

      <div className="actions command-save-actions">
        <button className="btn btn-secondary" type="button">Restaurar padrão</button>
        <button className="btn" type="button"><Save size={16} /> Salvar canais</button>
      </div>
    </>
  );
}
