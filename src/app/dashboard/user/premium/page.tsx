import { PageHeader } from '@/components/AppShell';
import { BadgeCheck, CreditCard, Gem, Landmark, ReceiptText, ShieldCheck, Sparkles, Star, WalletCards, X } from 'lucide-react';

const userFeatures = [
  ['Banners e efeitos exclusivos do perfil', true, true, true],
  ['Mais slots de itens cosméticos equipados', 'Básico', 'Avançado', 'Completo'],
  ['Temas premium para o perfil', false, true, true],
  ['Badge Premium no perfil do Onne', false, true, true],
  ['Prioridade em recursos visuais novos', false, false, true],
  ['Limite ampliado para personalização', 'Normal', '2x', '4x'],
  ['Descontos em itens selecionados da loja', false, '5%', '10%']
];

export default function UserPremiumPage() {
  return <>
    <PageHeader title="Premium do Usuário" description="Assinatura individual para liberar cosméticos, benefícios de perfil e recursos visuais exclusivos." />
    <main className="premium-page">
      <section className="premium-hero">
        <div className="premium-mascot"><div className="premium-mascot-mark">O</div></div>
        <div className="premium-payment">
          <h2>Nós aceitamos</h2>
          <div className="premium-payment-grid">
            <div className="premium-payment-item"><Gem size={28}/><span>Pix</span></div>
            <div className="premium-payment-item"><CreditCard size={28}/><span>Cartão de Crédito</span></div>
            <div className="premium-payment-item"><WalletCards size={28}/><span>Cartão de Débito</span></div>
            <div className="premium-payment-item"><ReceiptText size={28}/><span>Boleto</span></div>
          </div>
        </div>
      </section>

      <section className="premium-plans-section">
        <h2>Premium para Usuários</h2>
        <div className="premium-billing-toggle"><button className="active">Mensal</button><button>Anual <span>-20%</span></button></div>
        <div className="premium-plan-grid">
          <article className="premium-plan-card"><h3>Free</h3><div className="premium-price">R$ 0<small>/mensal</small></div><p>Recursos básicos para usar o Onne e testar a personalização.</p><button className="btn btn-secondary">Plano atual</button></article>
          <article className="premium-plan-card highlight"><span className="premium-recommended">RECOMENDADO</span><h3>Plus</h3><div className="premium-price">R$ 14,99<small>/mensal</small></div><p>Mais cosméticos, badges e vantagens de perfil.</p><button className="btn btn-primary">Assinar Plus</button></article>
          <article className="premium-plan-card"><h3>Delux</h3><div className="premium-price">R$ 29,99<small>/mensal</small></div><p>Experiência completa com recursos visuais premium.</p><button className="btn btn-primary">Assinar Delux</button></article>
        </div>
      </section>

      <section className="premium-feature-table">
        <table><thead><tr><th>Recurso</th><th>Free</th><th>Plus</th><th className="featured-col">Delux</th></tr></thead><tbody>
          {userFeatures.map(([name, free, plus, delux]) => <tr key={String(name)}><td>{name}</td>{[free, plus, delux].map((value, index) => <td key={index} className={index===2?'featured-col':''}>{value === true ? <BadgeCheck className="premium-check"/> : value === false ? <X className="premium-x"/> : <strong>{value}</strong>}</td>)}</tr>)}
        </tbody></table>
      </section>
    </main>
  </>;
}
