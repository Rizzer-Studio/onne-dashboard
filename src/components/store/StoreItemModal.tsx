import { Heart, Link2, X } from 'lucide-react';
import type { StoreItem } from '@/lib/store-data';
import { ProfilePreview } from './ProfilePreview';
import { StoreActionButtons } from './StoreActionButtons';
import { OnnePlaceholder } from './OnnePlaceholder';

export function StoreItemModal({
  item,
  onClose,
  onToggleFavorite,
  onShare
}: {
  item: StoreItem;
  onClose: () => void;
  onToggleFavorite: (id: string) => void;
  onShare: (id: string) => void;
}) {
  return (
    <div className="store-modal-overlay" role="dialog" aria-modal="true" onMouseDown={onClose}>
      <div className="store-modal" onMouseDown={(event) => event.stopPropagation()}>
        <div className="store-modal-controls">
          <button className={item.isFavorite ? 'store-icon-btn active' : 'store-icon-btn'} onClick={() => onToggleFavorite(item.id)} aria-label="Salvar nos favoritos"><Heart size={19} /></button>
          <button className="store-icon-btn" onClick={() => onShare(item.id)} aria-label="Compartilhar"><Link2 size={19} /></button>
          <button className="store-icon-btn close" onClick={onClose} aria-label="Fechar"><X size={20} /></button>
        </div>

        <aside className="store-modal-left">
          <div className={item.type === 'profile-effect' ? 'store-item-hero effect-modal-hero' : 'store-item-hero'} style={{ background: item.type === 'profile-effect' ? 'linear-gradient(135deg, rgba(21,17,31,.95), rgba(15,23,42,.86))' : item.image }}>
            {item.type === 'profile-effect' && (
              <div className="modal-effect-logo-preview">
                <OnnePlaceholder size="lg" />
                <span className="effect-avatar-overlay" style={{ background: item.previewImage }} />
              </div>
            )}
          </div>
          <div>
            <span className={`rarity rarity-${item.rarity.toLowerCase()}`}>{item.rarity}</span>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
          </div>
          <StoreActionButtons item={item} />
        </aside>

        <ProfilePreview item={item} />
      </div>
    </div>
  );
}
