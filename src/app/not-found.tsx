import Link from 'next/link';
import { AlertTriangle, ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return <main className="not-found-page">
    <section className="not-found-card">
      <div className="not-found-icon"><AlertTriangle size={34} /></div>
      <span className="not-found-kicker">404</span>
      <h1>Página não encontrada</h1>
      <p>Essa rota não existe ou ainda não está disponível no Dashboard Onne.</p>
      <div className="not-found-actions">
        <Link className="btn btn-secondary" href="/dashboard/user"><ArrowLeft size={16}/> Voltar ao dashboard</Link>
        <Link className="btn" href="/"><Home size={16}/> Início</Link>
      </div>
    </section>
  </main>;
}
