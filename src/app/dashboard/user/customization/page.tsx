"use client";

import { useMemo, useState, type CSSProperties } from "react";
import { PageHeader } from "@/components/AppShell";
import {
  BadgeCheck,
  Camera,
  Check,
  Palette,
  Pencil,
  Sparkles,
  UserRound,
  X,
  Trophy,
  Zap,
  Star,
  Coins,
  Gem,
} from "lucide-react";
import { storeItems, type StoreItem } from "@/lib/store-data";
import { OnnePlaceholder } from "@/components/store/OnnePlaceholder";

type UserProfileCustomization = {
  avatar: string;
  name: string;
  pronoun: string;
  status: string;
  bio: string;
  primaryColor: string;
  nameColor: string;
  borderColor: string;
  borderColor2: string;
  rankingBorderColor: string;
  rankingBorderColor2: string;
  profileBanner: string | null;
  profileEffect: string | null;
  infoBanner: string | null;
  rankingBanner: string | null;
  badges: string[];
};

const initialProfile: UserProfileCustomization = {
  avatar: "Placeholder: logo Onne",
  name: "Nome do usuário",
  pronoun: "#DEV",
  status: "Onne add no seu servidor...",
  bio: "Área da bio do perfil. Coloque links, descrição, conquistas e informações públicas.",
  primaryColor: "#5865F2",
  nameColor: "#FFFFFF",
  borderColor: "#FACC15",
  borderColor2: "#00FF66",
  rankingBorderColor: "#FACC15",
  rankingBorderColor2: "#00FF66",
  profileBanner: "profile-banner-brasil",
  profileEffect: "effect-orb-blue",
  infoBanner: "info-galaxy-core",
  rankingBanner: "ranking-galaxy-core",
  badges: ["badge-dev"],
};

const tabs = [
  { key: "profile-banner", label: "Banners" },
  { key: "profile-effect", label: "Efeitos" },
  { key: "info-banner", label: "Info" },
  { key: "ranking-banner", label: "Ranking" },
  { key: "badge", label: "Insígnias" },
] as const;

const colorPresets = [
  "#FFFFFF",
  "#5865F2",
  "#06B6D4",
  "#8B5CF6",
  "#FACC15",
  "#00FF66",
  "#EF4444",
  "#F472B6",
];

function normalizeHex(value: string, fallback: string) {
  const clean = value.trim();
  if (/^#[0-9A-Fa-f]{6}$/.test(clean)) return clean.toUpperCase();
  if (/^[0-9A-Fa-f]{6}$/.test(clean)) return `#${clean}`.toUpperCase();
  return fallback;
}

function ColorToken({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="color-token-field">
      <div className="color-token-top">
        <span>{label}</span>
        <strong>{value.toUpperCase()}</strong>
      </div>
      <div className="color-token-control">
        <span className="color-token-preview" style={{ background: value }} />
        <input
          className="color-token-input"
          value={value.toUpperCase()}
          maxLength={7}
          onChange={(event) =>
            onChange(normalizeHex(event.target.value, value))
          }
          onBlur={(event) => onChange(normalizeHex(event.target.value, value))}
          aria-label={label}
        />
      </div>
      <div
        className="color-token-presets"
        aria-label={`Cores rápidas para ${label}`}
      >
        {colorPresets.map((preset) => (
          <button
            key={preset}
            type="button"
            className={
              preset.toUpperCase() === value.toUpperCase()
                ? "color-preset active"
                : "color-preset"
            }
            style={{ background: preset }}
            onClick={() => onChange(preset)}
            aria-label={`${label} ${preset}`}
          />
        ))}
      </div>
    </div>
  );
}

type TabKey = (typeof tabs)[number]["key"];

function findItem(id: string | null) {
  return id ? (storeItems.find((item) => item.id === id) ?? null) : null;
}

function getItemBackground(id: string | null, fallback: string) {
  return findItem(id)?.previewImage ?? fallback;
}

function cleanBio(value: string) {
  return value.slice(0, 130);
}

function ProfileRenderPreview({
  profile,
}: {
  profile: UserProfileCustomization;
}) {
  const profileBanner = getItemBackground(
    profile.profileBanner,
    "linear-gradient(135deg, #111827, #05070A)",
  );
  const profileEffect = findItem(profile.profileEffect);
  const infoBanner = getItemBackground(
    profile.infoBanner,
    "linear-gradient(135deg, #020617, #111827)",
  );
  const equippedBadges = profile.badges
    .map((id) => findItem(id))
    .filter(Boolean) as StoreItem[];

  return (
    <section
      className="profile-render-card compact-profile-render gradient-profile-border"
      style={
        {
          "--profile-border-1": profile.borderColor,
          "--profile-border-2": profile.borderColor2,
        } as CSSProperties
      }
    >
      <div className="render-banner" style={{ background: profileBanner }}>
        <span className="render-watermark">Onne Profile</span>
        <div className="render-avatar-wrap">
          <OnnePlaceholder size="lg" />
          {profileEffect && (
            <span
              className="render-avatar-orb"
              style={{ background: profileEffect.previewImage }}
            />
          )}
        </div>
        <div className="render-identity">
          <h2 style={{ color: profile.nameColor }}>{profile.name}</h2>
          <strong>{profile.pronoun || "Pronome"}</strong>
          <span>{profile.status || "Status do usuário"}</span>
        </div>
      </div>

      <div className="render-badges" aria-label="Área padrão de insígnias">
        {equippedBadges.length > 0 ? (
          equippedBadges.map((badge) => (
            <span
              key={badge.id}
              className="render-badge-icon"
              style={{ background: badge.previewImage }}
              title={badge.name}
            >
              ★
            </span>
          ))
        ) : (
          <span className="empty-badge-slot">Sem insígnias equipadas</span>
        )}
      </div>

      <div className="render-info" style={{ background: `${infoBanner}` }}>
        <div className="render-info-overlay" />
        <div className="render-info-content">
          <h3>Info</h3>
          <div
            className="render-stats-grid"
            aria-label="Informações globais do perfil"
          >
            <div>
              <span><Trophy size={11} /> Nível</span>
              <strong style={{ color: profile.primaryColor }}>1</strong>
            </div>
            <div>
              <span><Zap size={11} /> XP</span>
              <strong style={{ color: profile.primaryColor }}>191</strong>
            </div>
            <div>
              <span><Star size={11} /> Rep</span>
              <strong style={{ color: profile.primaryColor }}>0</strong>
            </div>
            <div>
              <span><Coins size={11} /> Money</span>
              <strong style={{ color: profile.primaryColor }}>250</strong>
            </div>
            <div>
              <span><Gem size={11} /> Diamantes</span>
              <strong style={{ color: profile.primaryColor }}>9.885</strong>
            </div>
          </div>
          <p className="render-joined">Entrou no servidor · 17/05/2026</p>
          <p className="render-bio">{cleanBio(profile.bio)}</p>
          <footer>Onne profile · Atualize no site https://onne.app.br</footer>
        </div>
      </div>
    </section>
  );
}

function RankingRenderPreview({
  profile,
}: {
  profile: UserProfileCustomization;
}) {
  const rankingBanner = getItemBackground(
    profile.rankingBanner,
    "linear-gradient(135deg, #111827, #05070A)",
  );

  return (
    <section
      className="ranking-render-card gradient-ranking-border"
      style={
        {
          background: rankingBanner,
          "--ranking-border-1": profile.rankingBorderColor,
          "--ranking-border-2": profile.rankingBorderColor2,
        } as CSSProperties
      }
    >
      <div className="ranking-render-overlay" />
      <div className="ranking-render-content">
        <div className="ranking-render-avatar">
          <OnnePlaceholder size="sm" />
        </div>
        <div className="ranking-render-text">
          <strong style={{ color: profile.nameColor }}>{profile.name}</strong>
          <div className="ranking-render-stats">
            <span>Nível 1</span>
            <span>XP 191</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Page() {
  const [profile, setProfile] = useState(initialProfile);
  const [activeTab, setActiveTab] = useState<TabKey>("profile-banner");
  const [isOwnedModalOpen, setOwnedModalOpen] = useState(false);

  const ownedItems = useMemo(
    () =>
      storeItems.map((item) => ({
        ...item,
        equipped:
          item.id === profile.profileBanner ||
          item.id === profile.profileEffect ||
          item.id === profile.infoBanner ||
          item.id === profile.rankingBanner ||
          profile.badges.includes(item.id),
      })),
    [profile],
  );

  const filteredItems = ownedItems.filter((item) => item.type === activeTab);

  function update<K extends keyof UserProfileCustomization>(
    key: K,
    value: UserProfileCustomization[K],
  ) {
    setProfile((current) => ({ ...current, [key]: value }));
  }

  function equipItem(item: StoreItem) {
    setProfile((current) => {
      if (item.type === "profile-banner")
        return { ...current, profileBanner: item.id };
      if (item.type === "profile-effect")
        return { ...current, profileEffect: item.id };
      if (item.type === "info-banner")
        return { ...current, infoBanner: item.id };
      if (item.type === "ranking-banner")
        return { ...current, rankingBanner: item.id };
      if (item.type === "badge")
        return {
          ...current,
          badges: current.badges.includes(item.id)
            ? current.badges
            : [...current.badges, item.id],
        };
      return current;
    });
  }

  function removeItem(item: StoreItem) {
    setProfile((current) => {
      if (item.type === "profile-banner")
        return { ...current, profileBanner: null };
      if (item.type === "profile-effect")
        return { ...current, profileEffect: null };
      if (item.type === "info-banner") return { ...current, infoBanner: null };
      if (item.type === "ranking-banner")
        return { ...current, rankingBanner: null };
      if (item.type === "badge")
        return {
          ...current,
          badges: current.badges.filter((id) => id !== item.id),
        };
      return current;
    });
  }

  return (
    <>
      <PageHeader
        title="Personalização"
        description="Configure a identidade do perfil. Este mesmo visual será usado no preview da loja e no futuro render do Discord."
      />

      <div className="customization-workbench customization-layout-v3">
        <section className="card customization-panel">
          <div className="section-title">
            <UserRound size={20} /> Identidade do perfil
          </div>

          <div className="avatar-editor">
            <div className="avatar-editor-preview">
              <OnnePlaceholder size="lg" />
              <button className="avatar-upload-btn" type="button">
                <Camera size={16} />
              </button>
            </div>
            <div>
              <strong>Imagem de perfil circular</strong>
              <p>
                Placeholder com a logo do Onne. Depois pode receber avatar real
                do Discord ou upload.
              </p>
            </div>
          </div>

          <div className="form two-columns">
            <label className="field">
              Imagem perfil
              <input
                className="input"
                value={profile.avatar}
                onChange={(e) => update("avatar", e.target.value)}
              />
            </label>
            <label className="field">
              Nome
              <input
                className="input"
                value={profile.name}
                onChange={(e) => update("name", e.target.value)}
              />
            </label>
            <label className="field">
              Pronome
              <input
                className="input"
                value={profile.pronoun}
                onChange={(e) => update("pronoun", e.target.value)}
              />
            </label>
            <label className="field">
              Status
              <input
                className="input"
                value={profile.status}
                onChange={(e) => update("status", e.target.value)}
              />
            </label>
            <label className="field full">
              Bio
              <textarea
                className="input bio-textarea"
                maxLength={130}
                value={profile.bio}
                onChange={(e) => update("bio", cleanBio(e.target.value))}
              />
              <span className="field-counter">
                {profile.bio.length}/130 caracteres · máximo 3 linhas
              </span>
            </label>
          </div>

          <div className="section-title appearance-title">
            <Palette size={20} /> Aparência do perfil
          </div>
          <div className="appearance-groups">
            <div className="appearance-group">
              <div className="appearance-group-header">
                <strong>Cores gerais</strong>
                <span>Cor do nome e números da área Info.</span>
              </div>
              <div className="color-token-grid">
                <ColorToken
                  label="Cor do nome"
                  value={profile.nameColor}
                  onChange={(value) => update("nameColor", value)}
                />
                <ColorToken
                  label="Cor info"
                  value={profile.primaryColor}
                  onChange={(value) => update("primaryColor", value)}
                />
              </div>
            </div>

            <div className="appearance-group">
              <div className="appearance-group-header">
                <strong>Borda do Preview do Perfil</strong>
                <span>Duas cores com transição diagonal suave.</span>
              </div>
              <div className="color-token-grid">
                <ColorToken
                  label="Cor 1"
                  value={profile.borderColor}
                  onChange={(value) => update("borderColor", value)}
                />
                <ColorToken
                  label="Cor 2"
                  value={profile.borderColor2}
                  onChange={(value) => update("borderColor2", value)}
                />
              </div>
            </div>

            <div className="appearance-group">
              <div className="appearance-group-header">
                <strong>Borda do Preview do Ranking</strong>
                <span>Usada no card compacto do XP & Ranking.</span>
              </div>
              <div className="color-token-grid">
                <ColorToken
                  label="Cor 1"
                  value={profile.rankingBorderColor}
                  onChange={(value) => update("rankingBorderColor", value)}
                />
                <ColorToken
                  label="Cor 2"
                  value={profile.rankingBorderColor2}
                  onChange={(value) => update("rankingBorderColor2", value)}
                />
              </div>
            </div>
          </div>

          <div className="row customization-actions">
            <button className="btn btn-primary">
              <Check size={16} /> Salvar perfil
            </button>
            <button
              className="btn btn-secondary"
              type="button"
              onClick={() => setOwnedModalOpen(true)}
            >
              <Pencil size={16} /> Gerenciar conteúdos
            </button>
          </div>
        </section>

        <div className="preview-stack-panel">
          <section className="card preview-panel-card profile-preview-panel-card">
            <div className="section-title">
              <Sparkles size={20} /> Preview do perfil
            </div>
            <ProfileRenderPreview profile={profile} />
          </section>

          <section className="card preview-panel-card ranking-preview-panel-card">
            <div className="section-title">
              <Sparkles size={20} /> Preview do ranking
            </div>
            <RankingRenderPreview profile={profile} />
          </section>
        </div>
      </div>

      <section className="card owned-section-full owned-section-summary">
        <div className="owned-summary-header">
          <div>
            <div className="section-title">
              <Sparkles size={20} /> Conteúdos adquiridos
            </div>
            <p className="muted-text">
              Gerencie os itens comprados em uma janela separada. Equipe
              banners, efeitos, ranking e insígnias sem poluir a página.
            </p>
          </div>
          <button
            className="btn btn-primary owned-edit-btn"
            type="button"
            onClick={() => setOwnedModalOpen(true)}
          >
            <Pencil size={16} /> Editar conteúdos
          </button>
        </div>
        <div className="owned-empty-inline">
          <Sparkles size={18} />
          <span>
            Abra o gerenciador para equipar banners, efeitos, ranking e
            insígnias.
          </span>
        </div>
      </section>

      {isOwnedModalOpen && (
        <div
          className="owned-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Conteúdos adquiridos"
        >
          <div className="owned-modal-card">
            <div className="owned-modal-header">
              <div>
                <span className="eyebrow">Personalização</span>
                <h2>Conteúdos adquiridos</h2>
                <p>
                  Escolha uma coleção e equipe ou remova os itens do perfil.
                </p>
              </div>
              <button
                className="modal-icon-button"
                type="button"
                onClick={() => setOwnedModalOpen(false)}
                aria-label="Fechar"
              >
                <X size={20} />
              </button>
            </div>

            <div className="owned-modal-tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  className={
                    activeTab === tab.key ? "owned-tab active" : "owned-tab"
                  }
                  onClick={() => setActiveTab(tab.key)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="owned-modal-content">
              <h3>{tabs.find((tab) => tab.key === activeTab)?.label}</h3>
              {filteredItems.length > 0 ? (
                <div className="owned-modal-grid">
                  {filteredItems.map((item) => (
                    <div
                      className={`owned-card owned-card-${item.type}`}
                      key={item.id}
                    >
                      <div
                        className={
                          item.type === "profile-effect"
                            ? "owned-card-thumb effect"
                            : "owned-card-thumb"
                        }
                        style={{ background: item.image }}
                      >
                        {item.type === "profile-effect" && (
                          <OnnePlaceholder size="sm" />
                        )}
                        {item.type === "badge" && (
                          <span className="owned-badge-star">★</span>
                        )}
                      </div>
                      <div className="owned-card-body">
                        <strong>{item.name}</strong>
                        <span>{item.rarity}</span>
                        {item.equipped && <em>● Equipado</em>}
                      </div>
                      {item.equipped ? (
                        <button
                          className="btn btn-secondary"
                          onClick={() => removeItem(item)}
                        >
                          <X size={16} /> Remover
                        </button>
                      ) : (
                        <button
                          className="btn btn-primary"
                          onClick={() => equipItem(item)}
                        >
                          <BadgeCheck size={16} /> Equipar
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="owned-empty-state">
                  <div className="owned-empty-preview">
                    <Sparkles size={28} />
                  </div>
                  <strong>Nenhum item aqui</strong>
                  <p>
                    Quando você comprar itens desta coleção, eles aparecerão
                    aqui para equipar no perfil.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
