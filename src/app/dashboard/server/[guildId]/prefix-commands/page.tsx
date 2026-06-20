'use client';

import { PageHeader } from '@/components/AppShell';
import { AlertCircle, CheckCircle2, Command, Hash, Save, Settings, TerminalSquare } from 'lucide-react';
import { useMemo, useState } from 'react';

const allowedPrefixes = ['+', '!', '$', '-', '%'] as const;
const exampleCommands = [
  { slash: '/sobre', description: 'Mostra informações institucionais do Onne.' },
  { slash: '/ping', description: 'Verifica latência e status do bot.' },
  { slash: '/rpg', description: 'Abre a central RPG do servidor.' },
  { slash: '/saldo', description: 'Consulta moedas, diamantes e saldo legado.' },
  { slash: '/ranking', description: 'Mostra o ranking da comunidade.' },
  { slash: '/limpar', description: 'Remove mensagens conforme permissão.' },
];

function CommandName({ value }: { value: string }) {
  const name = value.replace(/^\//, '');

  return (
    <span className="command-token">
      <span className="command-slash">/</span>
      <span>{name}</span>
    </span>
  );
}

function PrefixCommandName({ prefix, value }: { prefix: string; value: string }) {
  const name = value.replace(/^\//, '');

  return (
    <span className="prefix-command-token">
      <span className="prefix-symbol">{prefix}</span>
      <span>{name}</span>
    </span>
  );
}

export default function ServerPrefixCommandsPage() {
  const [enabled, setEnabled] = useState(true);
  const [prefix, setPrefix] = useState('+');
  const isValidPrefix = allowedPrefixes.includes(prefix as typeof allowedPrefixes[number]);

  const previewCommands = useMemo(() => exampleCommands.map((command) => ({
    ...command,
    prefixed: `${prefix}${command.slash.replace(/^\//, '')}`,
  })), [prefix]);

  function handlePrefixChange(value: string) {
    const next = value.trim().slice(0, 1);
    setPrefix(next);
  }

  return (
    <>
      <PageHeader
        title="Comandos por prefixo"
        description="Defina se o Onne também deve atender comandos digitados com prefixo no Discord. Por padrão, o prefixo inicial é +."
      />

      <section className="card server-config-card prefix-settings-card">
        <div className="row">
          <div>
            <h2>Prefixo do servidor</h2>
            <p>Ative ou desative comandos por prefixo e escolha um dos símbolos permitidos.</p>
          </div>
          <span className={enabled ? 'status' : 'status muted'}>{enabled ? 'Ativado' : 'Desativado'}</span>
        </div>

        <div className="prefix-config-layout">
          <div className="prefix-control-panel prefix-control-panel-wide">
              <div className="prefix-switch-row">
                <div>
                  <strong>Permitir comandos por prefixo</strong>
                  <span>Quando ativo, o bot também responde comandos como <PrefixCommandName prefix={prefix || '+'} value="/sobre" />.</span>
                </div>
                <button
                  className={`theme-switch ${enabled ? 'on' : ''}`}
                  type="button"
                  aria-label={enabled ? 'Desativar comandos por prefixo' : 'Ativar comandos por prefixo'}
                  onClick={() => setEnabled((value) => !value)}
                />
              </div>

              <label className="prefix-input-label" htmlFor="server-prefix-input">
                <span>Prefixo permitido</span>
                <div className={`prefix-input-wrap ${isValidPrefix ? '' : 'has-error'}`}>
                  <TerminalSquare size={18} />
                  <input
                    id="server-prefix-input"
                    value={prefix}
                    maxLength={1}
                    disabled={!enabled}
                    onChange={(event) => handlePrefixChange(event.target.value)}
                    placeholder="+"
                    aria-invalid={!isValidPrefix}
                  />
                </div>
              </label>

              <div className="allowed-prefix-list" aria-label="Prefixos aceitos">
                {allowedPrefixes.map((item) => (
                  <button
                    className={`allowed-prefix-chip ${prefix === item ? 'active' : ''}`}
                    type="button"
                    key={item}
                    disabled={!enabled}
                    onClick={() => setPrefix(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className={`prefix-validation ${isValidPrefix ? 'valid' : 'invalid'}`}>
                {isValidPrefix ? <CheckCircle2 size={17} /> : <AlertCircle size={17} />}
                <span>{isValidPrefix ? 'Prefixo válido. Apenas +, !, $, - e % são aceitos.' : 'Prefixo inválido. Use apenas +, !, $, - ou %.'}</span>
              </div>
          </div>

          <aside className="prefix-info-panel prefix-info-panel-side">
            <Settings size={22} />
            <div>
              <strong>Compatibilidade controlada</strong>
              <span>Os comandos slash continuam sendo o padrão principal. O prefixo existe para servidores que desejam manter comandos rápidos por texto.</span>
            </div>
            <div className="prefix-example-list">
              <span className="prefix-example-title"><Command size={16} /> Exemplos</span>
              <span className="prefix-example-pair"><PrefixCommandName prefix={prefix || '+'} value="/rpg" /><span className="channel-token"><Hash size={14} /><span>comandos</span></span></span>
              <span className="prefix-example-pair"><PrefixCommandName prefix={prefix || '+'} value="/sobre" /><span className="channel-token"><Hash size={14} /><span>rpg</span></span></span>
            </div>
          </aside>
        </div>
      </section>

      <section className="card prefix-preview-card">
        <div className="row">
          <div>
            <h2>Prévia dos comandos com prefixo</h2>
            <p>Esta tabela mostra como alguns comandos ficarão usando o prefixo escolhido.</p>
          </div>
          <span className="status">{prefix || '+'} comandos</span>
        </div>

        <div className="prefix-command-table">
          <div className="prefix-command-row head">
            <span>Comando slash</span>
            <span>Comando com prefixo</span>
            <span>Descrição</span>
          </div>
          {previewCommands.map((command) => (
            <div className="prefix-command-row" key={command.slash}>
              <span><CommandName value={command.slash} /></span>
              <span><PrefixCommandName prefix={prefix || '+'} value={command.slash} /></span>
              <span>{command.description}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="actions command-save-actions command-save-actions-loose">
        <button className="btn btn-secondary" type="button" onClick={() => setPrefix('+')}>Restaurar padrão +</button>
        <button className="btn" type="button" disabled={!enabled || !isValidPrefix}><Save size={16} /> Salvar prefixo</button>
      </div>
    </>
  );
}
