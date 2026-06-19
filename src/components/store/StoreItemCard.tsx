'use client';

import { useMemo, useState } from 'react';
import { Gift, Heart } from 'lucide-react';
import type { StoreItem } from '@/lib/store-data';
import { CurrencyBadge } from './CurrencyBadge';
import { OnnePlaceholder } from './OnnePlaceholder';

function ProfileEffectStoreCard({ item, onOpen }: { item: StoreItem; onOpen: (item: StoreItem) => void }) {
  const firstVariant = item.colorVariants?.[0];
  const [selectedPreview, setSelectedPreview] = useState(firstVariant?.previewImage ?? item.previewImage);
  const selectedItem = useMemo(() => ({ ...item, previewImage: selectedPreview }), [item, selectedPreview]);
  const hasColorVariants = Boolean(item.colorVariants?.length);

  return (
    <article className="store-item-card effect-shop-card" role="button" tabIndex={0} onClick={() => onOpen(selectedItem)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') onOpen(selectedItem); }}>
      <button
        type="button"
        className={item.isFavorite ? 'effect-favorite active' : 'effect-favorite'}
        aria-label="Salvar nos favoritos"
        onClick={(event) => event.stopPropagation()}
      >
        <Heart size={19} />
      </button>

      <div className="effect-card-stage">
        <div className="effect-avatar-shell onne-effect-preview">
          <OnnePlaceholder size="lg" />
          <span className="effect-avatar-overlay" style={{ background: selectedPreview }} />
        </div>
      </div>

      <div className="effect-card-bottom">
        <div className="effect-title-row">
          <h3>{item.name}</h3>
          {hasColorVariants && (
            <div className="effect-color-dots" aria-label="Variações de cor">
              {item.colorVariants!.map((variant) => (
                <button
                  type="button"
                  key={variant.name}
                  className={selectedPreview === variant.previewImage ? 'dot active' : 'dot'}
                  style={{ background: variant.color }}
                  aria-label={`Usar cor ${variant.name}`}
                  onClick={(event) => { event.stopPropagation(); setSelectedPreview(variant.previewImage); }}
                />
              ))}
            </div>
          )}
        </div>
        <CurrencyBadge price={item.price} currency={item.currency} />
        <div className="effect-hover-actions">
          <button type="button" className="store-btn store-btn-primary" onClick={(event) => { event.stopPropagation(); onOpen(selectedItem); }}>
            {item.price > 0 ? `Resgatar por ${item.price.toLocaleString('pt-BR')}` : `Comprar por ${item.realPrice}`}
          </button>
          <button type="button" className="store-btn store-btn-gift" aria-label="Presentear" onClick={(event) => event.stopPropagation()}>
            <Gift size={19} />
          </button>
        </div>
      </div>
    </article>
  );
}

export function StoreItemCard({ item, onOpen }: { item: StoreItem; onOpen: (item: StoreItem) => void }) {
  const isEffect = item.type === 'profile-effect';
  const isBadge = item.type === 'badge';

  if (isEffect) {
    return <ProfileEffectStoreCard item={item} onOpen={onOpen} />;
  }

  return (
    <article
      className={`store-item-card generic-shop-card store-card-${item.layout ?? 'standard'} store-type-${item.type}`}
      role="button"
      tabIndex={0}
      onClick={() => onOpen(item)}
      onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') onOpen(item); }}
    >
      <button
        type="button"
        className={item.isFavorite ? 'effect-favorite generic-favorite active' : 'effect-favorite generic-favorite'}
        aria-label="Salvar nos favoritos"
        onClick={(event) => event.stopPropagation()}
      >
        <Heart size={19} />
      </button>

      <div className="store-card-art" style={{ background: item.image }}>
        {item.type === 'ranking-banner' && (
          <div className="ranking-store-skeleton">
            <div className="ranking-avatar-preview" />
            <div className="ranking-copy ranking-copy-inline">
              <strong>Nome do usuário</strong>
              <span>Level 1</span>
              <span>XP 191</span>
            </div>
          </div>
        )}
        {isBadge && <div className="badge-store-preview" />}
      </div>

      <div className="store-card-info">
        <h3>{item.name}</h3>
        {item.price > 0 ? <CurrencyBadge price={item.price} currency={item.currency} /> : <span className="real-price-pill">Comprar por {item.realPrice}</span>}
      </div>

      <div className="generic-hover-actions">
        <button type="button" className="store-btn store-btn-primary" onClick={(event) => { event.stopPropagation(); onOpen(item); }}>
          {item.price > 0 ? `Resgatar por ${item.price.toLocaleString('pt-BR')}` : `Comprar por ${item.realPrice}`}
        </button>
        <button type="button" className="store-btn store-btn-gift" aria-label="Presentear" onClick={(event) => event.stopPropagation()}>
          <Gift size={18} />
        </button>
      </div>
    </article>
  );
}
