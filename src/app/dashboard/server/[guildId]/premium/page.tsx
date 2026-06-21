import { PageHeader } from '@/components/AppShell';

const paymentMethods = ['Pix', 'Cartão de crédito', 'Cartão de débito', 'Boleto'];

const plans = [
  {
    name: 'Servidor Free',
    badge: 'Atual',
    price: 'R$ 0',
    note: 'para testar',
    action: 'Plano atual',
    featured: false,
    current: true,
  },
  {
    name: 'Servidor Plus',
    badge: 'Popular',
    price: 'R$ 34,90',
    note: 'por mês',
    action: 'Assinar Plus',
    featured: true,
    current: false,
  },
  {
    name: 'Servidor Ultra',
    badge: 'Completo',
    price: 'R$ 59,90',
    note: 'por mês',
    action: 'Assinar Ultra',
    featured: false,
    current: false,
  },
];

const serverFeatures = [
  ['Canais de YouTube monitorados', '1', '3', '10'],
  ['Contadores de membros', '1', '3', '10'],
  ['Temas premium do contador', '—', 'Blue/Pink', 'Blue/Pink/Delux'],
  ['Recompensas por XP', '5', '30', '100'],
  ['Mensagens automáticas avançadas', 'Básico', 'Completo', 'Completo'],
  ['Eventos e logs configuráveis', 'Essencial', 'Avançado', 'Avançado'],
  ['Cupons e campanhas do servidor', '—', '✓', '✓'],
  ['Prioridade em recursos de moderação', '—', '✓', '✓'],
];

export default function ServerPremiumPage() {
  return (
    <>
      <PageHeader title="Premium do Servidor" description="Planos para liberar automações, limites maiores e recursos avançados para este servidor." />

      <section className="premium-shell server-premium-page">
        <div className="premium-hero-grid">
          <div className="premium-mascot-card server" aria-hidden="true">
            <div className="premium-server-stack">
              <span />
              <span />
              <span />
            </div>
            <div className="premium-mascot-glow" />
          </div>

          <div className="premium-payment-card">
            <span className="premium-kicker">Nós aceitamos</span>
            <div className="premium-payment-grid">
              {paymentMethods.map((method) => (
                <div className="premium-payment-item" key={method}>
                  <span className="premium-payment-icon">◆</span>
                  <strong>{method}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="premium-section-title">
          <span>Servidor</span>
          <h2>Premium para servidores</h2>
          <p>Aumente limites, automações e recursos de administração do Onne neste servidor.</p>
        </div>

        <div className="premium-period-toggle" aria-label="Seleção de período">
          <button className="active" type="button">Mensal</button>
          <button type="button">Anual <span>-20%</span></button>
        </div>

        <div className="premium-plan-grid">
          {plans.map((plan) => (
            <article className={`premium-plan-card ${plan.featured ? 'recommended' : ''}`} key={plan.name}>
              {plan.featured && <span className="premium-recommended">Recomendado</span>}
              <span className="premium-plan-badge">{plan.badge}</span>
              <h3>{plan.name}</h3>
              <div className="premium-price"><strong>{plan.price}</strong><span>{plan.note}</span></div>
              <button className={plan.current ? 'btn btn-secondary premium-buy-button' : 'btn btn-primary premium-buy-button'} type="button">
                {plan.action}
              </button>
            </article>
          ))}
        </div>

        <div className="premium-comparison-card server">
          <div className="premium-comparison-header">
            <span>Recurso</span>
            <span>Free</span>
            <span>Plus</span>
            <span>Ultra</span>
          </div>
          {serverFeatures.map(([feature, free, plus, ultra]) => (
            <div className="premium-comparison-row" key={feature}>
              <span>{feature}</span>
              <strong>{free}</strong>
              <strong>{plus}</strong>
              <strong>{ultra}</strong>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
