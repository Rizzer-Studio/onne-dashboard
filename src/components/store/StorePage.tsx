'use client';

import { useMemo, useState } from 'react';
import { Coins, Gem } from 'lucide-react';
import { storeCollections, storeItems, type StoreItem } from '@/lib/store-data';
import { StoreItemCard } from './StoreItemCard';
import { StoreItemModal } from './StoreItemModal';
import { OnneInfoCard } from '@/components/AppShell';

export function StorePage() {
  const [items, setItems] = useState<StoreItem[]>(storeItems);
  const [selected, setSelected] = useState<StoreItem | null>(null);
  const [sort, setSort] = useState('Para você');
  const wallet = { moedas: 8250, diamantes: 9885 };
  const selectedItem = useMemo(() => items.find((item) => item.id === selected?.id) ?? selected, [items, selected]);

  function toggleFavorite(id: string) {
    setItems((current) => current.map((item) => item.id === id ? { ...item, isFavorite: !item.isFavorite } : item));
  }

  async function shareItem(id: string) {
    const text = `Confira este item da loja Onne: ${id}`;
    if (navigator.share) {
      await navigator.share({ title: 'Loja Onne', text }).catch(() => undefined);
      return;
    }
    await navigator.clipboard?.writeText(text).catch(() => undefined);
  }

  function shuffleItems() {
    setItems((current) => [...current].sort(() => Math.random() - 0.5));
  }

  return (
    <>
      <OnneInfoCard className="store-notice" />

      <div className="store-page-heading">
        <div><h1 className="page-title">Loja</h1><p className="page-desc">Encontre decorações, banners, molduras e efeitos para personalizar seu perfil Onne.</p></div>
        <div className="store-wallet-toolbar">
          <div className="store-wallet" aria-label="Carteira do usuário">
            <span><Coins size={16} /> {wallet.moedas.toLocaleString('pt-BR')} <small>Moedas</small></span>
            <span><Gem size={16} /> {wallet.diamantes.toLocaleString('pt-BR')} <small>Diamantes</small></span>
          </div>
          <div className="store-toolbar">
            <label>Ordenar por</label>
            <select value={sort} onChange={(event) => setSort(event.target.value)}>
              <option>Para você</option>
              <option>Mais recentes</option>
              <option>Menor preço</option>
              <option>Maior raridade</option>
            </select>
            <button className="store-btn store-btn-secondary" onClick={shuffleItems}>Embaralhar!</button>
          </div>
        </div>
      </div>

      <div className="store-collections">
        {storeCollections.map((collection) => {
          const collectionItems = items.filter((item) => item.collection === collection.id);
          if (collectionItems.length === 0) return null;
          return (
            <section className="store-collection" key={collection.id}>
              <div className="collection-banner" style={{ background: collection.banner }}>
                <div>
                  <span>Coleção</span>
                  <h2>{collection.title}</h2>
                  <p>{collection.subtitle}</p>
                </div>
              </div>
              <div className="store-grid">
                {collectionItems.map((item) => <StoreItemCard key={item.id} item={item} onOpen={setSelected} />)}
              </div>
            </section>
          );
        })}
      </div>

      {selectedItem && (
        <StoreItemModal
          item={selectedItem}
          onClose={() => setSelected(null)}
          onToggleFavorite={toggleFavorite}
          onShare={shareItem}
        />
      )}
    </>
  );
}
