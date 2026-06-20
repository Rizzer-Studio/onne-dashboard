import { Crown, LayoutDashboard, Server, ShoppingBag, Trophy, Settings, Shield, ScrollText, Users, Coins, Sparkles, Lock, Palette, Blocks, BadgeDollarSign, Megaphone, BadgePercent, CreditCard, UserCog, Activity, Bot } from 'lucide-react';

export const userNav = [
  { label: 'Visão Geral', href: '/dashboard/user', icon: LayoutDashboard },
  { label: 'Meus Servidores', href: '/dashboard/user/servers', icon: Server },
  { label: 'Loja', href: '/dashboard/user/store', icon: ShoppingBag },
  { label: 'XP & Ranking', href: '/dashboard/user/ranking', icon: Trophy },
  { label: 'Premium', href: '/dashboard/user/premium', icon: Crown, badge: 'PRO' },
  { label: 'Personalização', href: '/dashboard/user/customization', icon: Palette }
];

export const serverNav = [
  { label: 'Visão Geral', href: '/dashboard/server/123', icon: LayoutDashboard },
  { label: 'Premium', href: '/dashboard/server/123/premium', icon: Crown },
  { label: 'Logs', href: '/dashboard/server/123/logs', icon: ScrollText },
  { label: 'Comandos Onne', href: '/dashboard/server/123/onne-commands', icon: Bot },
  { label: 'Comandos por Prefixo', href: '/dashboard/server/123/prefix-commands', icon: Settings },
  { label: 'Canais de Comandos', href: '/dashboard/server/123/command-channels', icon: Megaphone },
  { label: 'Entrada/Saída', href: '/dashboard/server/123/welcome-goodbye', icon: Megaphone },
  { label: 'Autorole', href: '/dashboard/server/123/autorole', icon: Users },
  { label: 'Contador de Membros', href: '/dashboard/server/123/member-counter', icon: Activity },
  { label: 'Permissões', href: '/dashboard/server/123/permissions', icon: Lock },
  { label: 'Bloqueador de Convites', href: '/dashboard/server/123/invite-blocker', icon: Shield },
  { label: 'Canais de Armadilha', href: '/dashboard/server/123/trap-channels', icon: Shield },
  { label: 'Registro de Punições', href: '/dashboard/server/123/punishment-logs', icon: ScrollText },
  { label: 'Punições de Avisos', href: '/dashboard/server/123/warning-punishments', icon: Shield },
  { label: 'Motivos de Punição', href: '/dashboard/server/123/punishment-reasons', icon: ScrollText },
  { label: 'Registro de Eventos', href: '/dashboard/server/123/event-logs', icon: Activity },
  { label: 'Recompensas por XP', href: '/dashboard/server/123/xp-rewards', icon: Sparkles },
  { label: 'Bônus de XP', href: '/dashboard/server/123/xp-bonus', icon: Sparkles },
  { label: 'Bloqueios de XP', href: '/dashboard/server/123/xp-blocks', icon: Shield },
  { label: 'Mensagens de Level', href: '/dashboard/server/123/level-up-messages', icon: Trophy },
  { label: 'Resetar XP', href: '/dashboard/server/123/reset-xp', icon: Settings },
  { label: 'Notificações do YouTube', href: '/dashboard/server/123/youtube-notifications', icon: Megaphone }
];

export const servers = [
  { id: '123', name: 'Onne Community', members: '12.430', bot: 'Online', plan: 'Free', icon: 'O' },
  { id: '456', name: 'Rizzer Studio', members: '2.187', bot: 'Online', plan: 'Premium', icon: 'R' },
  { id: '789', name: 'Dev Lab Brasil', members: '842', bot: 'Ausente', plan: 'Free', icon: 'D' }
];

export const modules = [
  ['XP & Ranking', 'Sistema de XP, níveis, ranking global e por servidor.', true, Trophy],
  ['Economia', 'OnCash, OnDima, banco, transações e loja.', true, BadgeDollarSign],
  ['RPG', 'Profissões, mineração, fazenda, exploração e inventário.', true, Sparkles],
  ['Moderação', 'Punições, anti-spam, logs e proteção do servidor.', false, Shield],
  ['Social', 'Amizades, perfil social, badges e banners.', true, Users],
  ['Logs', 'Auditoria de ações, erros, comandos e eventos.', true, ScrollText]
] as const;

export const products = [
  ['Banner Cyberpunk', 'Banner', 'Épico', '2.500 OnCash'],
  ['Moldura Arcana', 'Moldura', 'Lendário', '8.000 OnCash'],
  ['Badge Dev', 'Badge', 'Raro', '1.200 OnCash'],
  ['Cor Azul Neon', 'Cor', 'Comum', '500 OnCash']
];


export const adminNav = [
  { label: 'Visão Geral', href: '/dashboard/admin', icon: LayoutDashboard },
  { label: 'Configurações', href: '/dashboard/admin/config', icon: Settings },
  { label: 'Avisos', href: '/dashboard/admin/notices', icon: Megaphone },
  { label: 'Onne', href: '/dashboard/admin/onne', icon: Bot },
  { label: 'Loja', href: '/dashboard/admin/store', icon: ShoppingBag },
  { label: 'Cupons', href: '/dashboard/admin/coupons', icon: BadgePercent },
  { label: 'Usuários', href: '/dashboard/admin/users', icon: UserCog },
  { label: 'Assinaturas', href: '/dashboard/admin/subscriptions', icon: CreditCard },
  { label: 'Auditoria', href: '/dashboard/admin/audit', icon: Activity }
];
