import { PageHeader } from '@/components/AppShell';
import { OnnePlaceholder } from '@/components/store/OnnePlaceholder';

const rows = [
  { name: 'Matheus Felipe', level: 42, xp: 98200, banner: 'radial-gradient(circle at 62% 34%, rgba(250,204,21,.62), transparent 12%), radial-gradient(circle at 35% 72%, rgba(139,92,246,.70), transparent 25%), linear-gradient(135deg, #020617, #312e81, #0f172a)' },
  { name: 'Onne User', level: 39, xp: 90100, banner: 'linear-gradient(135deg, rgba(6,182,212,.24), transparent), repeating-linear-gradient(90deg, rgba(6,182,212,.18) 0 2px, transparent 2px 34px), #06111a' },
  { name: 'Rizzer Dev', level: 36, xp: 82000, banner: 'linear-gradient(135deg, #172554, #312e81, #15111f)' },
  { name: 'Player BR', level: 33, xp: 73900, banner: 'linear-gradient(135deg, #009C3B 0 44%, #FFDF00 45% 70%, #002776 71%)' }
];

export default function Page() {
  return (
    <>
      <PageHeader title="XP & Ranking" description="Acompanhe seu progresso global e ranking por servidor." />

      <div className="card">
        <h3>Meu progresso</h3>
        <div style={{ height: 10, borderRadius: 99, background: '#111827', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: '82%', background: 'linear-gradient(90deg,#2563EB,#06B6D4)' }} />
        </div>
        <p style={{ marginTop: 12 }}>Level 42 · 82% até o próximo nível</p>
      </div>

      <section className="card ranking-list-section">
        <div className="section-title">Ranking global</div>
        <div className="ranking-list">
          {rows.map((row, index) => (
            <article className="ranking-list-banner" key={row.name} style={{ background: row.banner }}>
              <div className="ranking-list-position">#{index + 1}</div>
              <div className="ranking-list-avatar"><OnnePlaceholder size="sm" /></div>
              <div className="ranking-list-copy">
                <strong>{row.name}</strong>
              </div>
              <div className="ranking-list-stats">
                <span>Nível {row.level}</span>
                <span>XP {row.xp.toLocaleString('pt-BR')}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
