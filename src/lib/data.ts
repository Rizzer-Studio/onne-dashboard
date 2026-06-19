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
  { label: 'Dashboard', href: '/dashboard/server/123', icon: LayoutDashboard },
  { label: 'Configurações', href: '/dashboard/server/123/settings', icon: Settings },
  { label: 'Módulos', href: '/dashboard/server/123/modules', icon: Blocks },
  { label: 'Moderação', href: '/dashboard/server/123/moderation', icon: Shield },
  { label: 'Economia/RPG', href: '/dashboard/server/123/economy', icon: Coins },
  { label: 'Social', href: '/dashboard/server/123/social', icon: Users },
  { label: 'Logs', href: '/dashboard/server/123/logs', icon: ScrollText },
  { label: 'Permissões', href: '/dashboard/server/123/permissions', icon: Lock }
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
