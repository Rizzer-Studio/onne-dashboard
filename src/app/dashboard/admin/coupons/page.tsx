import { PageHeader } from '@/components/AppShell';
import { AdminSection, AdminStatus } from '@/components/admin/AdminUI';
import { adminCoupons } from '@/lib/admin-data';
import { BadgePercent, Gift } from 'lucide-react';

export default function AdminCouponsPage() {
  return (
    <>
      <PageHeader title="Cupons" description="Crie cupons temporários, descontos por item, descontos gerais e cards promocionais na sidebar." />
      <AdminSection title="Cupons promocionais" description="O cupom pode ter tempo, desconto geral, desconto na loja ou desconto em item específico.">
        <div className="admin-action-row top"><button className="btn"><BadgePercent size={16}/> Criar cupom</button><button className="btn btn-secondary"><Gift size={16}/> Prévia do card sidebar</button></div>
        <div className="admin-table admin-coupon-table">
          <div className="admin-table-head"><span>Código</span><span>Destino</span><span>Desconto</span><span>Tempo</span><span>Sidebar</span><span>Status</span><span>Ações</span></div>
          {adminCoupons.map((coupon) => (
            <div className="admin-table-row" key={coupon.code}>
              <strong>{coupon.code}</strong><span>{coupon.target}</span><span>{coupon.discount}</span><span>{coupon.duration}</span><span>{coupon.sidebar}</span><AdminStatus value={coupon.status}/><span><button>Editar</button><button>Remover</button></span>
            </div>
          ))}
        </div>
      </AdminSection>
    </>
  );
}
