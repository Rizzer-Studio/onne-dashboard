'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, Grid3X3, LogOut, Settings, ArrowLeft, CalendarClock, Crown, Info, X, ShieldCheck, Puzzle, LayoutDashboard, Sparkles, Store, UserCog, CheckCircle2, Palette, Menu } from 'lucide-react';
import { adminNav, serverNav, userNav } from '@/lib/data';

type ShellMode = 'user' | 'server' | 'admin';


type PanelTheme = {
  id: string;
  name: string;
  description: string;
  colors: [string, string];
};

const panelThemes: PanelTheme[] = [
  { id: 'venix-core', name: 'Onne Plus', description: 'Cyan e violeta com assinatura visual original da plataforma.', colors: ['#06B6D4', '#8B5CF6'] },
  { id: 'midnight-blue', name: 'Midnight Blue', description: 'Azul profundo com brilho frio e visual mais corporativo.', colors: ['#3B82F6', '#7C3AED'] },
  { id: 'matrix-grid', name: 'Matrix Grid', description: 'Verde neon para um painel mais técnico e agressivo.', colors: ['#10B981', '#A3E635'] },
  { id: 'sunset-warp', name: 'Sunset Warp', description: 'Laranja e âmbar com presença forte para destaque visual.', colors: ['#F97316', '#F59E0B'] },
  { id: 'crimson-pulse', name: 'Crimson Pulse', description: 'Rose e fúcsia com visual premium e mais dramático.', colors: ['#EC4899', '#D946EF'] },
];

export function AppShell({ children, mode = 'user', selectedGuildId = '123' }: { children: React.ReactNode; mode?: ShellMode; selectedGuildId?: string }) {
  const pathname = usePathname();
  const isServerMode = mode === 'server';
  const isAdminMode = mode === 'admin';
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [moduleOpen, setModuleOpen] = useState(false);
  const [appearanceModalOpen, setAppearanceModalOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('venix-core');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [contentResetKey, setContentResetKey] = useState(0);
  const contentRef = useRef<HTMLElement | null>(null);
  const isOnneStaff = true; // MVP/dev: liberado. Em produção, trocar por validação real de equipe Onne/autorizados.

  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [pathname]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('onne-panel-theme') || 'venix-core';
    setSelectedTheme(savedTheme);
    document.documentElement.dataset.panelTheme = savedTheme;
  }, []);


  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const isEditableTarget = (target: EventTarget | null) => {
      if (!(target instanceof HTMLElement)) return false;
      if (target.closest('[data-ignore-dirty="true"]')) return false;
      if (target.closest('.message-picker-modal, .color-picker-modal, .appearance-modal-backdrop, .topbar, .sidebar')) return false;
      return Boolean(
        target.closest('input, textarea, select, .theme-switch, .member-counter-mode-card, .counter-style-card, .panel-theme-card, .option-pill, .prefix-symbol-btn')
      );
    };

    const markDirty = (event: Event) => {
      if (isEditableTarget(event.target)) setHasUnsavedChanges(true);
    };

    content.addEventListener('input', markDirty, true);
    content.addEventListener('change', markDirty, true);
    content.addEventListener('click', markDirty, true);

    return () => {
      content.removeEventListener('input', markDirty, true);
      content.removeEventListener('change', markDirty, true);
      content.removeEventListener('click', markDirty, true);
    };
  }, [pathname]);

  useEffect(() => {
    if (!hasUnsavedChanges) return;
    const beforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', beforeUnload);
    return () => window.removeEventListener('beforeunload', beforeUnload);
  }, [hasUnsavedChanges]);

  function resetUnsavedChanges() {
    setHasUnsavedChanges(false);
    setContentResetKey((value) => value + 1);
    window.dispatchEvent(new CustomEvent('onne:reset-unsaved-changes'));
  }

  function saveUnsavedChanges() {
    setHasUnsavedChanges(false);
  }

  function applyPanelTheme(themeId: string) {
    setSelectedTheme(themeId);
    localStorage.setItem('onne-panel-theme', themeId);
    document.documentElement.dataset.panelTheme = themeId;
  }

  function isActiveHref(href: string) {
    const normalizedHref = href.replace('/dashboard/server/123', `/dashboard/server/${selectedGuildId}`);
    if (normalizedHref === '/dashboard/user' || normalizedHref === `/dashboard/server/${selectedGuildId}` || normalizedHref === '/dashboard/admin') {
      return pathname === normalizedHref;
    }
    return pathname === normalizedHref || pathname.startsWith(`${normalizedHref}/`);
  }

  return <div className={`app ${mobileSidebarOpen ? 'mobile-sidebar-active' : ''}`}>
    <button className={`mobile-sidebar-overlay ${mobileSidebarOpen ? 'is-open' : ''}`} type="button" aria-label="Fechar menu lateral" onClick={() => setMobileSidebarOpen(false)} />
    <aside className={`sidebar ${mobileSidebarOpen ? 'is-open' : ''}`} onClick={(event) => { const target = event.target as HTMLElement; if (target.closest('a')) setMobileSidebarOpen(false); }}>
      <div className="sidebar-mobile-head"><Link href="/dashboard/user" className="brand"><span className="brand-mark">O</span> Onne</Link><button className="sidebar-mobile-close" type="button" aria-label="Fechar menu" onClick={() => setMobileSidebarOpen(false)}><X size={18}/></button></div>

      {!isServerMode && !isAdminMode && <>
        <div className="nav-title">DASHBOARD DO USUÁRIO</div>
        {userNav.map((item) => <Link key={item.href} className={`nav-item ${isActiveHref(item.href) ? 'is-active' : ''}`} href={item.href}><item.icon size={18}/>{item.label}{item.badge && <span className="badge">{item.badge}</span>}</Link>)}
        <div className="sidebar-hint">
          <strong>Gerenciamento de servidor</strong>
          <span>Escolha um servidor em “Meus Servidores” para abrir as opções do bot.</span>
        </div>
      </>}

      {isServerMode && <>
        <Link className="nav-item back-link" href="/dashboard/user/servers"><ArrowLeft size={18}/> Voltar aos servidores</Link>
        <div className="selected-server-box">
          <div className="avatar">O</div>
          <div>
            <strong>Onne Community</strong>
            <span>Servidor selecionado</span>
          </div>
        </div>
        <div className="nav-title">GERENCIAR SERVIDOR</div>
        {serverNav.map((item) => { const href = item.href.replace('/dashboard/server/123', `/dashboard/server/${selectedGuildId}`); return <Link key={item.href} className={`nav-item ${isActiveHref(item.href) ? 'is-active' : ''}`} href={href}><item.icon size={18}/>{item.label}</Link>; })}
        <div className="sidebar-hint">
          <strong>Configurações por servidor</strong>
          <span>Estas opções alteram apenas as funções do bot neste servidor.</span>
        </div>
      </>}

      {isAdminMode && <>
        <Link className="nav-item back-link" href="/dashboard/user"><ArrowLeft size={18}/> Voltar ao usuário</Link>
        <div className="selected-server-box admin-selected-box">
          <div className="avatar">A</div>
          <div>
            <strong>Dashboard Admin</strong>
            <span>MVP/dev liberado</span>
          </div>
        </div>
        <div className="nav-title">ADMINISTRAÇÃO</div>
        {adminNav.map((item) => <Link key={item.href} className={`nav-item ${isActiveHref(item.href) ? 'is-active' : ''}`} href={item.href}><item.icon size={18}/>{item.label}</Link>)}
        <div className="sidebar-hint">
          <strong>Acesso administrativo</strong>
          <span>No MVP está liberado. Em produção, restringir para equipe Onne e usuários autorizados.</span>
        </div>
      </>}

      <div className="profile"><div className="avatar">M</div><div style={{minWidth:0}}><strong style={{fontSize:13}}>Matheus Felipe</strong><p style={{margin:0,color:'#64748B',fontSize:10,overflow:'hidden',textOverflow:'ellipsis'}}>matheus.f.basilio@gmail.com</p></div><Settings size={16}/></div>
    </aside>
    <main className="main">
      <header className="topbar">
        <button className="mobile-menu-button" type="button" aria-label="Abrir menu lateral" onClick={() => setMobileSidebarOpen(true)}><Menu size={20}/><span>Menu</span></button>
        <div className="topbar-subscription-cards" aria-label="Resumo da assinatura">
          <div className="topbar-mini-card topbar-plan-card">
            <Crown size={15} aria-hidden="true" />
            <div>
              <span>ASSINATURA</span>
              <strong>Premium</strong>
            </div>
          </div>
          <div className="topbar-mini-card topbar-renew-card">
            <CalendarClock size={15} aria-hidden="true" />
            <div>
              <span>RENOVAÇÃO</span>
              <strong>10/06/2126</strong>
            </div>
          </div>
        </div>
        <div></div>
        <div className="topbar-actions">
          <div className="topbar-menu-wrap">
            <button className="topbar-icon-button" aria-label="Abrir notificações" onClick={() => { setNotificationsOpen((value) => !value); setModuleOpen(false); }}>
              <Bell size={18}/><span className="notification-dot" />
            </button>
            <div className={`topbar-popover notification-popover ${notificationsOpen ? 'is-open' : 'is-closed'}`} aria-hidden={!notificationsOpen}>
              <div className="popover-header"><strong>Notificações</strong><span>3 novas</span></div>
              <div className="notification-item"><CheckCircle2 size={17}/><div><strong>Cores do perfil liberadas</strong><span>Personalize a cor dos números de Info.</span></div></div>
              <div className="notification-item"><Sparkles size={17}/><div><strong>Nova loja visual</strong><span>Itens cosméticos agora usam Diamantes e Moedas.</span></div></div>
              <div className="notification-item muted"><Info size={17}/><div><strong>Integração futura</strong><span>As notificações reais virão da API do bot.</span></div></div>
            </div>
          </div>
          <div className="topbar-menu-wrap">
            <button className="topbar-icon-button" aria-label="Abrir módulos e atalhos" onClick={() => { setModuleOpen((value) => !value); setNotificationsOpen(false); }}>
              <Grid3X3 size={18}/>
            </button>
            <div className={`topbar-popover modules-popover ${moduleOpen ? 'is-open' : 'is-closed'}`} aria-hidden={!moduleOpen}>
              <div className="popover-header"><strong>Central Onne</strong><span>Módulos</span></div>
              <div className="module-launcher-grid">
                <button className="module-launcher-item" type="button" onClick={() => { setAppearanceModalOpen(true); setModuleOpen(false); }}><Palette size={18}/><span>Aparência</span></button>
                <Link className="module-launcher-item" href="/dashboard/user"><LayoutDashboard size={18}/><span>Dashboard</span></Link>
                <Link className="module-launcher-item" href="/dashboard/user/store"><Store size={18}/><span>Loja</span></Link>
                <Link className="module-launcher-item" href="/dashboard/user/customization"><UserCog size={18}/><span>Perfil</span></Link>
                <Link className="module-launcher-item" href="/dashboard/user/servers"><Puzzle size={18}/><span>Servidores</span></Link>
                {isOnneStaff && <Link className="module-launcher-item admin" href="/dashboard/admin"><ShieldCheck size={18}/><span>Admin</span></Link>}
              </div>
              <p className="module-access-note">Admin está liberado no MVP para desenvolvimento. Em produção, manter restrito à equipe Onne ou contas autorizadas.</p>
            </div>
          </div>
          <Link className="btn btn-secondary" href="/"><LogOut size={16}/> Sair</Link>
        </div>
      </header>
      <section className="content" ref={contentRef} key={`${pathname}-${contentResetKey}`}>{children}</section>
      <UnsavedChangesBar visible={hasUnsavedChanges} onReset={resetUnsavedChanges} onSave={saveUnsavedChanges} />
      {appearanceModalOpen && <div className="appearance-modal-backdrop" role="dialog" aria-modal="true" aria-label="Aparência do painel">
        <div className="appearance-modal-card">
          <button className="appearance-modal-close" type="button" aria-label="Fechar aparência" onClick={() => setAppearanceModalOpen(false)}><X size={18}/></button>
          <div className="appearance-modal-header">
            <Palette size={22}/>
            <div>
              <strong>Aparência do painel</strong>
              <span>Escolha um dos 5 temas visuais do Onne. A seleção é aplicada ao painel inteiro e salva para este usuário neste navegador.</span>
            </div>
          </div>
          <div className="panel-theme-grid appearance-modal-grid">
            {panelThemes.map((theme) => (
              <button key={theme.id} className={`panel-theme-card ${selectedTheme === theme.id ? 'active' : ''}`} type="button" onClick={() => applyPanelTheme(theme.id)}>
                <div className="panel-theme-preview">
                  <span className="theme-line short" />
                  <span className="theme-line" />
                  <span className="theme-box wide" />
                  <span className="theme-box small" />
                  <span className="theme-box small second" />
                  <span className="theme-accent" style={{ background: theme.colors[0] }} />
                  <span className="theme-dot" style={{ background: theme.colors[0] }} />
                  <span className="theme-dot second" style={{ background: theme.colors[1] }} />
                </div>
                <strong>{theme.name}</strong>
                <span>{theme.description}</span>
                {selectedTheme === theme.id && <CheckCircle2 className="theme-selected" size={19}/>}                    
              </button>
            ))}
          </div>
        </div>
      </div>}

    </main>
  </div>
}

export function OnneInfoCard({ className = '' }: { className?: string }) {
  const [visible, setVisible] = useState(true);
  return (
    <div className={`alert onne-info-card ${className} ${visible ? 'is-open' : 'is-dismissed'}`} aria-hidden={!visible}>
      <span className="info-badge" aria-hidden="true"><Info size={18}/></span>
      <div className="onne-info-copy"><strong>ONNE INFO</strong><span>Novo recurso de cores para o seu perfil!</span></div>
      <button className="onne-info-close" type="button" aria-label="Fechar anúncio" onClick={() => setVisible(false)}><X size={18}/></button>
    </div>
  );
}

export function PageHeader({ title, description }: { title: string; description: string }) {
  return <><OnneInfoCard /><h1 className="page-title">{title}</h1><p className="page-desc">{description}</p></>
}


function UnsavedChangesBar({ visible, onReset, onSave }: { visible: boolean; onReset: () => void; onSave: () => void }) {
  return (
    <div className={`unsaved-changes-bar ${visible ? 'is-visible' : ''}`} role="status" aria-live="polite" aria-hidden={!visible}>
      <strong>Cuidado! Você tem alterações que não foram salvas</strong>
      <div className="unsaved-changes-actions">
        <button className="unsaved-reset" type="button" onClick={onReset}>Redefinir</button>
        <button className="unsaved-save" type="button" onClick={onSave}>Salvar</button>
      </div>
    </div>
  );
}
