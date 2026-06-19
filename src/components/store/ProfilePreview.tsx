'use client';

import { useState } from 'react';
import { Gem, Coins, Star, Trophy, Zap } from 'lucide-react';
import type { StoreItem } from '@/lib/store-data';
import { OnnePlaceholder } from './OnnePlaceholder';

function getPreviewBackground(item: StoreItem, type: StoreItem['type']) {
  return item.type === type ? item.previewImage : undefined;
}

export function ProfilePreview({ item }: { item: StoreItem }) {
  const [selectedPreview, setSelectedPreview] = useState(item.previewImage);
  const previewItem = { ...item, previewImage: selectedPreview };
  const profileBanner = getPreviewBackground(previewItem, 'profile-banner') ?? 'linear-gradient(135deg, #009C3B 0 44%, #FFDF00 45% 70%, #002776 71%)';
  const infoBanner = getPreviewBackground(previewItem, 'info-banner') ?? 'radial-gradient(circle at 62% 34%, rgba(250,204,21,.55), transparent 14%), radial-gradient(circle at 35% 72%, rgba(139,92,246,.66), transparent 26%), linear-gradient(135deg, #020617, #312e81, #0f172a)';
  const rankingBanner = getPreviewBackground(previewItem, 'ranking-banner') ?? 'radial-gradient(circle at 62% 34%, rgba(250,204,21,.7), transparent 12%), radial-gradient(circle at 35% 72%, rgba(139,92,246,.76), transparent 25%), linear-gradient(135deg, #020617, #312e81, #0f172a)';
  const effect = previewItem.type === 'profile-effect' ? selectedPreview : 'radial-gradient(circle at 34% 24%, rgba(255,255,255,.86), rgba(56,189,248,.74) 23%, rgba(88,101,242,.42) 52%, rgba(2,6,23,.74) 76%)';
  const hasColorVariants = Boolean(item.type === 'profile-effect' && item.colorVariants?.length);

  if (item.type === 'ranking-banner') {
    return (
      <section className="store-profile-preview-wrap ranking-modal-preview-wrap">
        <section className="ranking-render-card store-modal-ranking-render" style={{ background: rankingBanner }}>
          <div className="ranking-render-overlay" />
          <div className="ranking-render-content">
            <div className="ranking-render-user">
              <div className="ranking-render-avatar">
                <OnnePlaceholder size="sm" />
              </div>
              <strong>Nome do usuário</strong>
            </div>
            <div className="ranking-render-stats">
              <span>Nível 1</span>
              <span>XP 191</span>
            </div>
          </div>
        </section>
      </section>
    );
  }

  return (
    <section className="store-profile-preview-wrap">
      {hasColorVariants && (
        <div className="modal-effect-colors" aria-label="Cores do efeito">
          {item.colorVariants!.map((variant) => (
            <button
              key={variant.name}
              type="button"
              className={selectedPreview === variant.previewImage ? 'dot active' : 'dot'}
              style={{ background: variant.color }}
              aria-label={`Usar cor ${variant.name}`}
              onClick={() => setSelectedPreview(variant.previewImage)}
            />
          ))}
        </div>
      )}

      <section className="profile-render-card compact-profile-render store-modal-render" style={{ borderColor: '#FACC15' }}>
        <div className="render-banner" style={{ background: profileBanner }}>
          <span className="render-watermark">Onne Profile</span>
          <div className="render-avatar-wrap">
            <OnnePlaceholder size="lg" />
            <span className="render-avatar-orb" style={{ background: effect }} />
          </div>
          <div className="render-identity">
            <h2>Nome do usuário</h2>
            <strong>#DEV</strong>
            <span>Onne add no seu servidor...</span>
          </div>
        </div>

        <div className="render-badges" aria-label="Área padrão de insígnias">
          <span className="render-badge-icon" style={{ background: 'radial-gradient(circle at 45% 36%, #22d3ee, #2563eb 48%, #020617 72%)' }}>★</span>
          {previewItem.type === 'badge' && <span className="render-badge-icon" style={{ background: previewItem.previewImage }}>★</span>}
        </div>

        <div className="render-info" style={{ background: infoBanner }}>
          <div className="render-info-overlay" />
          <div className="render-info-content">
            <h3>Info</h3>
            <div className="render-stats-grid" aria-label="Informações globais do perfil">
              <div><span><Trophy size={11} /> Nível</span><strong>1</strong></div>
              <div><span><Zap size={11} /> XP</span><strong>191</strong></div>
              <div><span><Star size={11} /> Rep</span><strong>0</strong></div>
              <div><span><Coins size={11} /> Money</span><strong>250</strong></div>
              <div><span><Gem size={11} /> Diamantes</span><strong>9.885</strong></div>
            </div>
            <p className="render-joined">Entrou no servidor · 17/05/2026</p>
            <p className="render-bio">Área da bio do perfil. Coloque links, descrição, conquistas e informações públicas.</p>
            <footer>Onne profile · Atualize no site https://onne.app.br</footer>
          </div>
        </div>
      </section>
    </section>
  );
}
