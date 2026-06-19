import { PageHeader } from '@/components/AppShell';
import { AdminSection, AdminStatus } from '@/components/admin/AdminUI';
import { adminStoreItems } from '@/lib/admin-data';
import { Edit3, PackagePlus } from 'lucide-react';

export default function AdminStorePage() {
  return (
    <>
      <PageHeader title="Loja e preços" description="Gerencie preço, moeda, disponibilidade, coleções e cadastro dos itens vendidos na loja." />
      <AdminSection title="Itens da loja" description="CRUD visual preparado para criar, editar, remover e controlar disponibilidade dos cosméticos.">
        <div className="admin-action-row top"><button className="btn"><PackagePlus size={16}/> Adicionar item</button><button className="btn btn-secondary"><Edit3 size={16}/> Editar coleção</button></div>
        <div className="admin-table admin-store-table">
          <div className="admin-table-head"><span>Item</span><span>Tipo</span><span>Coleção</span><span>Preço</span><span>Status</span><span>Ações</span></div>
          {adminStoreItems.map((item) => (
            <div className="admin-table-row" key={item.name}>
              <strong>{item.name}</strong><span>{item.type}</span><span>{item.collection}</span><span>{item.price} {item.currency}</span><AdminStatus value={item.available}/><span><button>Editar</button><button>Remover</button></span>
            </div>
          ))}
        </div>
      </AdminSection>
    </>
  );
}
