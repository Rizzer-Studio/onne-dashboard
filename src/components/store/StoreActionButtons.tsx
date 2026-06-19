import { Gift } from 'lucide-react';
import type { StoreItem } from '@/lib/store-data';
import { CurrencyBadge } from './CurrencyBadge';

export function StoreActionButtons({ item }: { item: StoreItem }) {
  const hasCurrencyPrice = item.price > 0;

  return (
    <div className="store-actions">
      <div className="store-price-line">
        <span>Usando {item.currency}</span>
        {hasCurrencyPrice ? <CurrencyBadge price={item.price} currency={item.currency} /> : <strong>{item.realPrice}</strong>}
      </div>
      {hasCurrencyPrice && <button className="store-btn store-btn-primary">Resgatar por {item.price.toLocaleString('pt-BR')}</button>}
      <div className="store-buy-row">
        <button className={hasCurrencyPrice ? 'store-btn store-btn-secondary' : 'store-btn store-btn-primary'}>Comprar por {item.realPrice}</button>
        <button className="store-btn store-btn-gift" aria-label="Presentear"><Gift size={19} /></button>
      </div>
    </div>
  );
}
