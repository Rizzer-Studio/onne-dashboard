export type StoreItem = {
  id: string;
  name: string;
  description: string;
  type: 'profile-banner' | 'profile-effect' | 'info-banner' | 'ranking-banner' | 'badge';
  rarity: 'Comum' | 'Raro' | 'Épico' | 'Lendário';
  image: string;
  previewImage: string;
  price: number;
  currency: 'Diamantes' | 'Moedas';
  realPrice: string;
  isFavorite: boolean;
  collection: string;
  layout?: 'wide' | 'tall' | 'standard';
  equipped?: boolean;
  colorVariants?: { name: string; color: string; previewImage: string }[];
};

export type StoreCollection = {
  id: string;
  title: string;
  subtitle: string;
  banner: string;
};

export const storeCollections: StoreCollection[] = [
  {
    id: 'profile-banners',
    title: 'Banners do Perfil',
    subtitle: 'Banners 3:1 usados no perfil público, preview da loja e futuro render do Discord.',
    banner: 'linear-gradient(135deg, rgba(0,156,59,.94), rgba(255,223,0,.82) 38%, rgba(0,39,118,.9) 66%, rgba(239,68,68,.86))'
  },
  {
    id: 'profile-effects',
    title: 'Efeitos do perfil',
    subtitle: 'Efeitos circulares transparentes aplicados no avatar do perfil.',
    banner: 'radial-gradient(circle at 28% 40%, rgba(255,255,255,.72), transparent 12%), radial-gradient(circle at 65% 26%, rgba(6,182,212,.7), transparent 18%), linear-gradient(135deg, #172554, #312e81, #15111f)'
  },
  {
    id: 'info-banners',
    title: 'Banners de Info do Perfil',
    subtitle: 'Fundos usados na área Info do perfil, onde ficam nível, XP, money, diamantes e bio.',
    banner: 'linear-gradient(135deg, rgba(30,27,75,.92), rgba(15,23,42,.94))'
  },
  {
    id: 'ranking-banners',
    title: 'Banners de Ranking',
    subtitle: 'Banners compactos usados no XP & Ranking com avatar, nome, level e XP do usuário.',
    banner: 'linear-gradient(135deg, rgba(15,23,42,.94), rgba(30,41,59,.92))'
  },
  {
    id: 'badges',
    title: 'Insígnias',
    subtitle: 'Pequenos símbolos exibidos na faixa central do perfil.',
    banner: 'linear-gradient(135deg, rgba(88,101,242,.88), rgba(6,182,212,.58), rgba(139,92,246,.82))'
  }
];

export const storeItems: StoreItem[] = [
  {
    id: 'profile-banner-brasil',
    name: 'Brasil',
    description: 'Banner do perfil com verde, amarelo e azul para teste do render padrão.',
    type: 'profile-banner',
    rarity: 'Raro',
    collection: 'profile-banners',
    layout: 'wide',
    image: 'linear-gradient(135deg, #009C3B 0 44%, #FFDF00 45% 70%, #002776 71%)',
    previewImage: 'linear-gradient(135deg, #009C3B 0 44%, #FFDF00 45% 70%, #002776 71%)',
    price: 4100,
    currency: 'Diamantes',
    realPrice: 'R$ 15,99',
    isFavorite: false,
    equipped: true
  },
  {
    id: 'profile-banner-argentina',
    name: 'Argentina',
    description: 'Banner do perfil em azul celeste, branco e detalhe solar para validação visual.',
    type: 'profile-banner',
    rarity: 'Raro',
    collection: 'profile-banners',
    layout: 'wide',
    image: 'radial-gradient(circle at 50% 50%, #F6B40E 0 7%, transparent 8%), linear-gradient(180deg, #74ACDF 0 32%, #FFFFFF 33% 66%, #74ACDF 67% 100%)',
    previewImage: 'radial-gradient(circle at 50% 50%, #F6B40E 0 7%, transparent 8%), linear-gradient(180deg, #74ACDF 0 32%, #FFFFFF 33% 66%, #74ACDF 67% 100%)',
    price: 4100,
    currency: 'Diamantes',
    realPrice: 'R$ 15,99',
    isFavorite: false
  },
  {
    id: 'profile-banner-portugal',
    name: 'Portugal',
    description: 'Banner do perfil com verde e vermelho para teste de contraste no card.',
    type: 'profile-banner',
    rarity: 'Raro',
    collection: 'profile-banners',
    layout: 'wide',
    image: 'linear-gradient(90deg, #006600 0 42%, #FF0000 43% 100%)',
    previewImage: 'linear-gradient(90deg, #006600 0 42%, #FF0000 43% 100%)',
    price: 4100,
    currency: 'Diamantes',
    realPrice: 'R$ 15,99',
    isFavorite: false
  },
  {
    id: 'effect-orb-blue',
    name: 'Orbe Azul',
    description: 'Efeito de bola translúcida que fica por cima da imagem circular do perfil.',
    type: 'profile-effect',
    rarity: 'Épico',
    collection: 'profile-effects',
    image: 'radial-gradient(circle at 34% 24%, rgba(255,255,255,.86), rgba(56,189,248,.74) 23%, rgba(88,101,242,.42) 52%, rgba(2,6,23,.74) 76%)',
    previewImage: 'radial-gradient(circle at 34% 24%, rgba(255,255,255,.86), rgba(56,189,248,.74) 23%, rgba(88,101,242,.42) 52%, rgba(2,6,23,.74) 76%)',
    price: 4100,
    currency: 'Diamantes',
    realPrice: 'R$ 15,99',
    isFavorite: false,
    equipped: true
  },
  {
    id: 'effect-cosmic-ring',
    name: 'Anel Cósmico',
    description: 'Efeito circular com órbita luminosa para destacar o avatar.',
    type: 'profile-effect',
    rarity: 'Lendário',
    collection: 'profile-effects',
    image: 'radial-gradient(circle, transparent 0 42%, rgba(250,204,21,.92) 44% 48%, transparent 50%), radial-gradient(circle at 60% 32%, rgba(139,92,246,.7), transparent 25%), #15111f',
    previewImage: 'radial-gradient(circle, transparent 0 42%, rgba(250,204,21,.92) 44% 48%, transparent 50%), radial-gradient(circle at 60% 32%, rgba(139,92,246,.7), transparent 25%), #15111f',
    colorVariants: [
      { name: 'Vermelho', color: '#ef4444', previewImage: 'radial-gradient(circle, transparent 0 42%, rgba(239,68,68,.96) 44% 48%, transparent 50%), radial-gradient(circle at 60% 32%, rgba(248,113,113,.66), transparent 25%), #15111f' },
      { name: 'Rosa', color: '#ec4899', previewImage: 'radial-gradient(circle, transparent 0 42%, rgba(236,72,153,.96) 44% 48%, transparent 50%), radial-gradient(circle at 60% 32%, rgba(244,114,182,.66), transparent 25%), #15111f' },
      { name: 'Dourado', color: '#facc15', previewImage: 'radial-gradient(circle, transparent 0 42%, rgba(250,204,21,.92) 44% 48%, transparent 50%), radial-gradient(circle at 60% 32%, rgba(139,92,246,.7), transparent 25%), #15111f' }
    ],
    price: 6500,
    currency: 'Diamantes',
    realPrice: 'R$ 22,50',
    isFavorite: false
  },
  {
    id: 'info-galaxy-core',
    name: 'Galaxy Info',
    description: 'Fundo da área Info do perfil, com contraste para bio, nível, XP e moedas.',
    type: 'info-banner',
    rarity: 'Lendário',
    collection: 'info-banners',
    layout: 'wide',
    image: 'radial-gradient(circle at 62% 34%, rgba(250,204,21,.55), transparent 14%), radial-gradient(circle at 35% 72%, rgba(139,92,246,.66), transparent 26%), linear-gradient(135deg, #020617, #312e81, #0f172a)',
    previewImage: 'radial-gradient(circle at 62% 34%, rgba(250,204,21,.55), transparent 14%), radial-gradient(circle at 35% 72%, rgba(139,92,246,.66), transparent 26%), linear-gradient(135deg, #020617, #312e81, #0f172a)',
    price: 6500,
    currency: 'Diamantes',
    realPrice: 'R$ 25,99',
    isFavorite: false,
    equipped: true
  },
  {
    id: 'info-cyber-core',
    name: 'Cyber Info',
    description: 'Fundo de informação com grid escuro e leitura reforçada para a bio.',
    type: 'info-banner',
    rarity: 'Épico',
    collection: 'info-banners',
    layout: 'wide',
    image: 'linear-gradient(135deg, rgba(6,182,212,.20), transparent), repeating-linear-gradient(90deg, rgba(6,182,212,.14) 0 2px, transparent 2px 34px), #06111a',
    previewImage: 'linear-gradient(135deg, rgba(6,182,212,.20), transparent), repeating-linear-gradient(90deg, rgba(6,182,212,.14) 0 2px, transparent 2px 34px), #06111a',
    price: 4100,
    currency: 'Diamantes',
    realPrice: 'R$ 15,99',
    isFavorite: false
  },
  {
    id: 'ranking-galaxy-core',
    name: 'Galaxy Core',
    description: 'Banner de ranking 2:1 com energia espacial para cards RPG e leaderboard.',
    type: 'ranking-banner',
    rarity: 'Lendário',
    collection: 'ranking-banners',
    layout: 'wide',
    image: 'radial-gradient(circle at 62% 34%, rgba(250,204,21,.7), transparent 12%), radial-gradient(circle at 35% 72%, rgba(139,92,246,.76), transparent 25%), linear-gradient(135deg, #020617, #312e81, #0f172a)',
    previewImage: 'radial-gradient(circle at 62% 34%, rgba(250,204,21,.7), transparent 12%), radial-gradient(circle at 35% 72%, rgba(139,92,246,.76), transparent 25%), linear-gradient(135deg, #020617, #312e81, #0f172a)',
    price: 9800,
    currency: 'Diamantes',
    realPrice: 'R$ 35,99',
    isFavorite: true,
    equipped: true
  },
  {
    id: 'ranking-cyber-night',
    name: 'Cyber Night',
    description: 'Banner de ranking escuro com grid neon para uso no perfil global.',
    type: 'ranking-banner',
    rarity: 'Épico',
    collection: 'ranking-banners',
    layout: 'wide',
    image: 'linear-gradient(135deg, rgba(6,182,212,.24), transparent), repeating-linear-gradient(90deg, rgba(6,182,212,.18) 0 2px, transparent 2px 34px), #06111a',
    previewImage: 'linear-gradient(135deg, rgba(6,182,212,.24), transparent), repeating-linear-gradient(90deg, rgba(6,182,212,.18) 0 2px, transparent 2px 34px), #06111a',
    price: 6500,
    currency: 'Diamantes',
    realPrice: 'R$ 25,99',
    isFavorite: false
  },
  {
    id: 'badge-dev',
    name: 'Desenvolvedor',
    description: 'Insígnia para perfis ligados ao desenvolvimento do ecossistema Onne.',
    type: 'badge',
    rarity: 'Lendário',
    collection: 'badges',
    image: 'radial-gradient(circle at 45% 36%, #22d3ee, #2563eb 48%, #020617 72%)',
    previewImage: 'radial-gradient(circle at 45% 36%, #22d3ee, #2563eb 48%, #020617 72%)',
    price: 4100,
    currency: 'Diamantes',
    realPrice: 'R$ 15,99',
    isFavorite: false,
    equipped: true
  },
  {
    id: 'badge-founder',
    name: 'Fundador',
    description: 'Insígnia de prestígio para destacar presença histórica no Onne.',
    type: 'badge',
    rarity: 'Lendário',
    collection: 'badges',
    image: 'radial-gradient(circle at 45% 36%, #facc15, #f97316 48%, #3b0764 76%)',
    previewImage: 'radial-gradient(circle at 45% 36%, #facc15, #f97316 48%, #3b0764 76%)',
    price: 8200,
    currency: 'Diamantes',
    realPrice: 'R$ 29,99',
    isFavorite: false
  },
  {
    id: 'badge-premium',
    name: 'Premium',
    description: 'Insígnia para usuários com assinatura premium ativa.',
    type: 'badge',
    rarity: 'Épico',
    collection: 'badges',
    image: 'radial-gradient(circle at 45% 36%, #a78bfa, #5865F2 48%, #020617 76%)',
    previewImage: 'radial-gradient(circle at 45% 36%, #a78bfa, #5865F2 48%, #020617 76%)',
    price: 2500,
    currency: 'Moedas',
    realPrice: 'R$ 9,99',
    isFavorite: false
  }
];
