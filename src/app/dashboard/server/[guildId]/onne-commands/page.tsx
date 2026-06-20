'use client';

import { PageHeader } from '@/components/AppShell';
import { ChevronDown, Command, Hash, Mic2, Save, ShieldCheck, SlidersHorizontal } from 'lucide-react';
import { useMemo, useState } from 'react';

const commandGroups = [
  {
    title: 'Institucional',
    description: 'Comandos base de informação, suporte e status do Onne.',
    commands: ['/sobre', '/onne', '/suporte', '/ping', '/premium'],
  },
  {
    title: 'RPG / Games',
    description: 'Sistema principal de RPG, inventário, loja, mineração, fazenda e economia avançada.',
    commands: ['/rpg', '/rpg-status', '/rpg-profissao', '/rpg-trabalhar', '/rpg-fazenda', '/rpg-minerar', '/rpg-exploracao', '/rpg-loja', '/rpg-inventario', '/rpg-bolsa', '/rpg-rank', '/rpg-kitinicial', '/rpg-daily', '/rpg-mercado', '/rpg-vender', '/rpg-comprar'],
  },
  {
    title: 'Polícia RPG',
    description: 'Comandos operacionais para investigação, revista, prisão e controle policial.',
    commands: ['/investigar', '/revistar', '/prender', '/prisao'],
  },
  {
    title: 'Médico RPG',
    description: 'Comandos para diagnóstico, vacina, cura e produção médica.',
    commands: ['/diagnostico', '/vacina', '/curar', '/produzir-vacina'],
  },
  {
    title: 'Lavanderia RPG',
    description: 'Comandos para taxas e mecânicas de lavagem no RPG.',
    commands: ['/lavar-dinheiro', '/taxa', '/taxa-lavar'],
  },
  {
    title: 'Criminal RPG',
    description: 'Comandos de ações criminosas controladas pelo sistema RPG.',
    commands: ['/roubar'],
  },
  {
    title: 'Minigames',
    description: 'Jogos rápidos para interação da comunidade.',
    commands: ['/dado', '/ppt', '/bola8', '/forca'],
  },
  {
    title: 'Social',
    description: 'Comandos sociais para amizade, namoro e casamento.',
    commands: ['/amigos', '/namoro', '/casamento'],
  },
  {
    title: 'Servidor / Comunidade',
    description: 'Recursos de entrada, saída, verificação, reações e mensagens automáticas.',
    commands: ['/entrada', '/saida', '/verificacao', '/reacoes', '/auto-mensagem'],
  },
  {
    title: 'Administração / Moderação',
    description: 'Comandos sensíveis de moderação, logs, tickets, cargos e administração do RPG.',
    commands: ['/banimento', '/castigo', '/limpar', '/cargos', '/logs', '/links', '/spam', '/contador', '/tickets', '/rpg-admin', '/admin-loja'],
  },
  {
    title: 'Economia legada',
    description: 'Comandos legados de saldo, loja, inventário e transações.',
    commands: ['/saldo', '/daily', '/pay', '/ranking', '/loja', '/produto', '/inventario', '/transacoes'],
  },
];

const allCommands = commandGroups.flatMap((group) => group.commands);

function ChannelExample({ type, name }: { type: 'text' | 'voice'; name: string }) {
  const Icon = type === 'text' ? Hash : Mic2;

  return (
    <span className="channel-token">
      <Icon size={14} />
      <span>{name}</span>
    </span>
  );
}

function CommandName({ value }: { value: string }) {
  const name = value.replace(/^\//, '');

  return (
    <span className="command-token">
      <span className="command-slash">/</span>
      <span>{name}</span>
    </span>
  );
}

export default function ServerOnneCommandsPage() {
  const [disabledCommands, setDisabledCommands] = useState<Set<string>>(() => new Set(['/admin-loja']));
  const [openCommand, setOpenCommand] = useState<string | null>('/sobre');

  const enabledCount = useMemo(() => allCommands.length - disabledCommands.size, [disabledCommands]);

  function toggleCommand(command: string) {
    setDisabledCommands((current) => {
      const next = new Set(current);
      if (next.has(command)) {
        next.delete(command);
      } else {
        next.add(command);
      }
      return next;
    });
  }

  return (
    <>
      <PageHeader
        title="Comandos Onne"
        description="Controle quais comandos slash do Onne estarão disponíveis neste servidor. Cada comando pode ser desativado individualmente."
      />

      <section className="card server-config-card command-rules-card command-rules-card-compact">
        <div className="command-central-summary">
          <div>
            <h2>Central de comandos</h2>
            <p>Encontre comandos, recursos e permissões por categoria.</p>
          </div>
          <span className="status success">{enabledCount}/{allCommands.length} ativos</span>
        </div>

        <div className="command-format-summary" aria-label="Padrões visuais de comandos e canais">
          <span className="format-chip"><strong>Texto</strong><ChannelExample type="text" name="boas-vindas" /></span>
          <span className="format-chip"><strong>Voz</strong><ChannelExample type="voice" name="Sala Geral" /></span>
          <span className="format-chip"><strong>Slash</strong><CommandName value="/sobre" /></span>
        </div>
      </section>

      <section className="server-command-groups">
        {commandGroups.map((group) => (
          <div className="card server-command-group" key={group.title}>
            <div className="server-command-group-head">
              <div>
                <span className="command-group-kicker">Categoria</span>
                <h2>{group.title}</h2>
                <p>{group.description}</p>
              </div>
              <span className="status">{group.commands.filter((command) => !disabledCommands.has(command)).length}/{group.commands.length}</span>
            </div>

            <div className="server-command-list">
              {group.commands.map((command) => {
                const enabled = !disabledCommands.has(command);
                const isOpen = openCommand === command;

                return (
                  <article className={`server-command-item ${isOpen ? 'open' : ''}`} key={command}>
                    <div
                      className="server-command-summary"
                      role="button"
                      tabIndex={0}
                      onClick={() => setOpenCommand(isOpen ? null : command)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault();
                          setOpenCommand(isOpen ? null : command);
                        }
                      }}
                      aria-expanded={isOpen}
                    >
                      <span className="server-command-title">
                        <Command size={18} />
                        <CommandName value={command} />
                      </span>
                      <span className="server-command-actions" onClick={(event) => event.stopPropagation()}>
                        <span
                          className={`theme-switch ${enabled ? 'on' : ''}`}
                          role="switch"
                          tabIndex={0}
                          aria-checked={enabled}
                          aria-label={`${enabled ? 'Desativar' : 'Ativar'} ${command}`}
                          onClick={() => toggleCommand(command)}
                          onKeyDown={(event) => {
                            if (event.key === 'Enter' || event.key === ' ') {
                              event.preventDefault();
                              toggleCommand(command);
                            }
                          }}
                        />
                        <ChevronDown className="command-chevron" size={18} />
                      </span>
                    </div>

                    {isOpen && (
                      <div className="server-command-config command-config-flat">
                        <div className="command-config-section">
                          <ShieldCheck size={18} />
                          <div>
                            <strong>Permissão padrão</strong>
                            <span>Todos os membros podem usar este comando quando ele estiver ativo.</span>
                          </div>
                        </div>
                        <div className="command-config-section">
                          <SlidersHorizontal size={18} />
                          <div>
                            <strong>Canais permitidos</strong>
                            <span className="inline-example-row"><span>Exemplo:</span><ChannelExample type="text" name="comandos" /><span>ou</span><ChannelExample type="text" name="rpg" />.</span>
                          </div>
                        </div>
                        <div className="command-config-footer">
                          <span>Futuramente esta área receberá exceções por cargo, canal e logs específicos do comando.</span>
                        </div>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        ))}
      </section>

      <div className="actions command-save-actions">
        <button className="btn" type="button"><Save size={16} /> Salvar comandos</button>
      </div>
    </>
  );
}
