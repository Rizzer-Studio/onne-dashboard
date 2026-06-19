import { Coins, Gem } from 'lucide-react';

export function CurrencyBadge({ price, currency }: { price: number; currency: string }) {
  const Icon = currency === 'Moedas' ? Coins : Gem;

  return (
    <span className="currency-badge">
      <Icon size={16} /> {price.toLocaleString('pt-BR')} <small>{currency}</small>
    </span>
  );
}
