# Onne Dashboard MVP v1

Dashboard visual do Onne com arquitetura separada em três ambientes:

- `/dashboard/user` — Dashboard do usuário
- `/dashboard/server/[guildId]` — Gerenciamento do servidor selecionado
- `/dashboard/admin` — Dashboard administrativo

## Rotas principais

### Usuário

- `/dashboard/user`
- `/dashboard/user/servers`
- `/dashboard/user/store`
- `/dashboard/user/ranking`
- `/dashboard/user/premium`
- `/dashboard/user/customization`

### Servidor

- `/dashboard/server/123`
- `/dashboard/server/123/settings`
- `/dashboard/server/123/modules`
- `/dashboard/server/123/economy`
- `/dashboard/server/123/social`
- `/dashboard/server/123/logs`
- `/dashboard/server/123/permissions`

### Admin

- `/dashboard/admin`
- `/dashboard/admin/config`
- `/dashboard/admin/notices`
- `/dashboard/admin/store`
- `/dashboard/admin/coupons`
- `/dashboard/admin/users`
- `/dashboard/admin/subscriptions`
- `/dashboard/admin/audit`
- `/dashboard/admin/count`

## Compatibilidade

As rotas antigas redirecionam para a nova estrutura:

- `/dashboard` → `/dashboard/user`
- `/admin` → `/dashboard/admin`
- `/server/[guildId]` → `/dashboard/server/[guildId]`

## Rodar localmente

```bash
npm install
npm run dev
```

Abrir:

```txt
http://localhost:3000/dashboard/user
```
