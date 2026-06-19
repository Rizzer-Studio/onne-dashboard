import { OnnePlaceholder } from './OnnePlaceholder';

export function DiscordMessagePreview() {
  return (
    <div className="discord-message-preview">
      <div className="preview-avatar small"><OnnePlaceholder size="sm" /></div>
      <div>
        <div className="message-title">Nome do usuário <span>17:11</span></div>
        <p>Prévia da mensagem com a decoração aplicada.</p>
      </div>
      <div className="message-actions">＋ ☺</div>
    </div>
  );
}
