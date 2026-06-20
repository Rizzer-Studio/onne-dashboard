import { PageHeader } from '@/components/AppShell';

export default function ServerSettingsPage() {
  return <>
    <PageHeader title="Configurações do servidor" description="Defina canais, idioma, permissões principais e comportamento padrão do Onne." />
    <section className="card settings-form-card">
      <div className="form-grid">
        <label><span>Canal de boas-vindas</span><input defaultValue="#boas-vindas" /></label>
        <label><span>Canal de logs</span><input defaultValue="#logs-onne" /></label>
        <label><span>Canal de comandos</span><input defaultValue="#comandos" /></label>
        <label><span>Idioma</span><input defaultValue="Português Brasil" /></label>
      </div>
      <div className="row" style={{marginTop:18}}><button className="btn btn-primary">Salvar alterações</button><button className="btn btn-secondary">Restaurar padrão</button></div>
    </section>
  </>;
}
