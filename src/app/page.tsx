import Link from 'next/link';
import { Bot, ShieldCheck, Sparkles } from 'lucide-react';

export default function LoginPage() {
  return <main style={{minHeight:'100vh',display:'grid',placeItems:'center',padding:24}}>
    <section className="card" style={{width:'min(520px,100%)',textAlign:'center'}}>
      <div className="brand" style={{justifyContent:'center',paddingBottom:10}}><span className="brand-mark">O</span> Onne</div>
      <h1 className="page-title">Dashboard do seu bot Discord</h1>
      <p className="page-desc">Entre pelo Discord para acessar seu dashboard de usuário. O painel de gerenciamento do bot só aparece depois que você selecionar um servidor.</p>
      <Link className="btn btn-primary" style={{width:'100%',height:48}} href="/dashboard/user"><Bot size={18}/> Entrar com Discord</Link>
      <div className="grid grid-3" style={{marginTop:20}}>
        <div className="card"><ShieldCheck size={22}/><p>OAuth Discord</p></div>
        <div className="card"><Sparkles size={22}/><p>UI Premium</p></div>
        <div className="card"><Bot size={22}/><p>Bot API</p></div>
      </div>
    </section>
  </main>
}
