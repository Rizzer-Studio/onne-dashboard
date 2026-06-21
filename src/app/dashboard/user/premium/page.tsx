import { PageHeader } from '@/components/AppShell';

const paymentMethods = ['Pix', 'Cartão de crédito', 'Cartão de débito', 'Boleto'];

const plans = [
  {
    name: 'Free',
    badge: 'Atual',
    price: 'R$ 0',
    note: 'Para começar',
    action: 'Plano atual',
    featured: false,
    current: true,
  },
  {
    name: 'Onne Plus',
    badge: 'Popular',
    price: 'R$ 19,90',
    note: 'por mês',
    action: 'Assinar Plus',
    featured: true,
    current: false,
  },
  {
    name: 'Onne Ultra',
    badge: 'Completo',
    price: 'R$ 39,90',
    note: 'por mês',
    action: 'Assinar Ultra',
    featured: false,
    current: false,
  },
];

const userFeatures = [
  ['Banners do perfil equipados', '1', '5', '15'],
  ['Efeitos do perfil', '1 básico', '6 efeitos', 'Todos'],
  ['Banners de ranking', '1', '5', '12'],
  ['Insígnias no perfil', '1', '4', '10'],
  ['Temas premium do contador', '—', 'Blue/Pink', 'Blue/Pink/Delux'],
  ['Limite de favoritos na loja', '5', '25', '100'],
  ['Prioridade em novidades visuais', '—', '✓', '✓'],
  ['Badge premium no perfil', '—', '✓', '✓'],
];

export default function UserPremiumPage() {
  return (
    <>
      <PageHeader title="Premium do Usuário" description="Planos para personalização do perfil, cosméticos e recursos visuais da sua conta Onne." />

      <section className="premium-shell user-premium-page">
        <div className="premium-hero-grid">
          <div className="premium-mascot-card" aria-hidden="true">
            <div className="premium-mascot-orb">O</div>
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
          <span>Assinatura</span>
          <h2>Premium para usuários</h2>
          <p>Desbloqueie mais opções de personalização para o seu perfil Onne.</p>
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

        <div className="premium-comparison-card">
          <div className="premium-comparison-header">
            <span>Recurso</span>
            <span>Free</span>
            <span>Plus</span>
            <span>Ultra</span>
          </div>
          {userFeatures.map(([feature, free, plus, ultra]) => (
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
