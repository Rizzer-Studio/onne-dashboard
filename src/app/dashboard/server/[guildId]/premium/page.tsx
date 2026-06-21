import { PageHeader } from '@/components/AppShell';
import { BadgeCheck, Bot, CreditCard, Gem, Megaphone, ReceiptText, ShieldCheck, Sparkles, UsersRound, WalletCards, X } from 'lucide-react';

const serverFeatures = [
  ['Canais de YouTube monitorados', 1, 3, 10],
  ['Contadores de membros por servidor', 1, 3, 8],
  ['Temas GIF premium para contador', false, true, true],
  ['Mensagens automáticas avançadas', 'Básico', 'Avançado', 'Completo'],
  ['Registro avançado de eventos', false, true, true],
  ['Regras extras de moderação', false, true, true],
  ['Prioridade para recursos beta do servidor', false, false, true]
];

export default function ServerPremiumPage() {
  return <>
    <PageHeader title="Premium do Servidor" description="Assinatura separada para liberar automações, limites maiores e recursos avançados neste servidor." />
    <main className="premium-page">
      <section className="premium-hero">
        <div className="premium-mascot"><div className="premium-mascot-mark"><Bot size={82}/></div></div>
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
        <h2>Premium para Servidores</h2>
        <div className="premium-billing-toggle"><button className="active">Mensal</button><button>Anual <span>-20%</span></button></div>
        <div className="premium-plan-grid">
          <article className="premium-plan-card"><h3>Free</h3><div className="premium-price">R$ 0<small>/mensal</small></div><p>Configuração essencial para servidores pequenos.</p><button className="btn btn-secondary">Plano atual</button></article>
          <article className="premium-plan-card"><h3>Básico</h3><div className="premium-price">R$ 34,99<small>/mensal</small></div><p>Mais automações, limites e ferramentas de comunidade.</p><button className="btn btn-primary">Assinar Básico</button></article>
          <article className="premium-plan-card highlight"><span className="premium-recommended">RECOMENDADO</span><h3>Completo</h3><div className="premium-price">R$ 59,99<small>/mensal</small></div><p>Pacote completo para servidores ativos e equipes grandes.</p><button className="btn btn-primary">Assinar Completo</button></article>
        </div>
      </section>

      <section className="premium-feature-table">
        <table><thead><tr><th>Recurso</th><th>Free</th><th>Básico</th><th className="featured-col">Completo</th></tr></thead><tbody>
          {serverFeatures.map(([name, free, basic, complete]) => <tr key={String(name)}><td>{name}</td>{[free, basic, complete].map((value, index) => <td key={index} className={index===2?'featured-col':''}>{value === true ? <BadgeCheck className="premium-check"/> : value === false ? <X className="premium-x"/> : <strong>{value}</strong>}</td>)}</tr>)}
        </tbody></table>
      </section>
    </main>
  </>;
}
