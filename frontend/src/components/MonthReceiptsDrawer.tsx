import { useEffect, useState } from 'react';
import { BottomDrawer } from './BottomDrawer';
import { getReceipts } from '../services/api';
import { Receipt } from '@phosphor-icons/react';

interface Props {
  onClose: () => void;
  monthRef: string; // ex: "2026-05"
}

export function MonthReceiptsDrawer({ onClose, monthRef }: Props) {
  const [receipts, setReceipts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getReceipts(1, 50)
      .then((res) => {
        const filtered = res.data.filter((r: any) => {
          const date = new Date(r.purchasedAt);
          const ref = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
          return ref === monthRef;
        });
        setReceipts(filtered);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <BottomDrawer title="Notas do mês" subtitle={monthRef} onClose={onClose}>
      {loading ? (
        <div style={{ textAlign: 'center', padding: 32, color: 'var(--text-muted)', fontSize: 13 }}>Carregando...</div>
      ) : receipts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 32, color: 'var(--text-muted)', fontSize: 13 }}>Nenhuma nota este mês</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {receipts.map((r: any) => (
            <div key={r.id} style={{
              background: 'var(--surface)', borderRadius: 12, padding: '12px 14px',
              border: '1px solid var(--border)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Receipt size={18} weight="duotone" color="var(--green-light)" />
                <div>
                  <div style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: 14, color: 'var(--text)' }}>
                    {r.market?.displayName ?? r.market?.name}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                    {new Date(r.purchasedAt).toLocaleDateString('pt-BR')} · {r.items?.length ?? 0} itens
                  </div>
                </div>
              </div>
              <div style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: 15, color: 'var(--green-light)', whiteSpace: 'nowrap' }}>
                R$ {r.totalAmount?.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      )}
    </BottomDrawer>
  );
}