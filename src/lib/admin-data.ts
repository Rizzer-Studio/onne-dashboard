export const adminStats = [
  { label: 'Usuários monitorados', value: '12.482' },
  { label: 'Assinaturas ativas', value: '842' },
  { label: 'Itens na loja', value: '128' },
  { label: 'Avisos ativos', value: '03' },
];

export const adminUsers = [
  { id: 'ONNE-U-0001', name: 'Matheus Felipe', plan: 'Premium', started: '10/06/2026', ends: '10/06/2126', status: 'Ativo', warnings: 0, purchases: 18 },
  { id: 'ONNE-U-0002', name: 'Onne User', plan: 'Free', started: '-', ends: '-', status: 'Observação', warnings: 1, purchases: 3 },
  { id: 'ONNE-U-0003', name: 'Rizzer Dev', plan: 'Premium Plus', started: '12/06/2026', ends: '12/07/2026', status: 'Ativo', warnings: 0, purchases: 27 },
];

export const adminStoreItems = [
  { name: 'Brasil', type: 'Banner do perfil', currency: 'Diamantes', price: '4.100', available: 'Ativo', collection: 'Banners do perfil' },
  { name: 'Anel Cósmico', type: 'Efeito do perfil', currency: 'Diamantes', price: '6.500', available: 'Ativo', collection: 'Efeitos do perfil' },
  { name: 'Galaxy Info', type: 'Banner de info', currency: 'Diamantes', price: '6.500', available: 'Ativo', collection: 'Banners de info' },
  { name: 'Galaxy Core', type: 'Banner de ranking', currency: 'Diamantes', price: '9.800', available: 'Ativo', collection: 'Banners de ranking' },
  { name: 'Premium', type: 'Insígnia', currency: 'Moedas', price: '2.500', available: 'Pausado', collection: 'Insígnias' },
];

export const adminCoupons = [
  { code: 'ONNEPLUS20', target: 'Loja inteira', discount: '20%', duration: '48h', status: 'Ativo', sidebar: 'Sim' },
  { code: 'BANNER50', target: 'Banner Brasil', discount: '50%', duration: '24h', status: 'Agendado', sidebar: 'Não' },
  { code: 'PREMIUM10', target: 'Assinatura Premium', discount: '10%', duration: '7 dias', status: 'Ativo', sidebar: 'Sim' },
];

export const adminPlans = [
  { name: 'Free', price: 'R$ 0,00', cycle: 'Mensal', users: '11.640', status: 'Base' },
  { name: 'Premium', price: 'R$ 15,99', cycle: 'Mensal', users: '728', status: 'Ativo' },
  { name: 'Premium Plus', price: 'R$ 29,99', cycle: 'Mensal', users: '114', status: 'Ativo' },
];

export const adminNotices = [
  { title: 'Novo recurso de cores', message: 'Novo recurso de cores para o seu perfil!', status: 'Ativo', audience: 'Todos' },
  { title: 'Cupom Premium', message: 'Use ONNEPLUS20 por tempo limitado.', status: 'Agendado', audience: 'Free' },
];

export const adminAuditEvents = [
  { user: 'ONNE-U-0001', action: 'Comprou item', detail: 'Brasil • 4.100 Diamantes', risk: 'Baixo', date: 'Hoje, 13:42' },
  { user: 'ONNE-U-0002', action: 'Tentativa suspeita', detail: 'Pagamento recusado repetido', risk: 'Médio', date: 'Hoje, 12:11' },
  { user: 'ONNE-U-0003', action: 'Assinatura atualizada', detail: 'Premium Plus renovado', risk: 'Baixo', date: 'Ontem, 22:04' },
];
