import { useEffect, useState } from 'react';
import { BottomDrawer } from './BottomDrawer';
import { getReceipts } from '../services/api';
import { Storefront } from '@phosphor-icons/react';

interface Props {
  onClose: () => void;
  monthRef: string;
}

export function MonthMarketsDrawer({ onClose, monthRef }: Props) {
  const [markets, setMarkets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getReceipts(1, 100)
      .then((res) => {
        const filtered = res.data.filter((r: any) => {
          const date = new Date(r.purchasedAt);
          const ref = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
          return ref === monthRef;
        });

        // Agrupa por mercado
        const marketMap = new Map<string, any>();
        for (const r of filtered) {
          const id = r.marketId;
          const existing = marketMap.get(id);
          if (!existing) {
            marketMap.set(id, {
              id,
              name: r.market?.displayName ?? r.market?.name,
              visits: 1,
              total: r.totalAmount,
            });
          } else {
            existing.visits += 1;
            existing.total += r.totalAmount;
          }
        }

        setMarkets(Array.from(marketMap.values()).sort((a, b) => b.total - a.total));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <BottomDrawer title="Gastos por mercado" subtitle={monthRef} onClose={onClose}>
      {loading ? (
        <div style={{ textAlign: 'center', padding: 32, color: 'var(--text-muted)', fontSize: 13 }}>Carregando...</div>
      ) : markets.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 32, color: 'var(--text-muted)', fontSize: 13 }}>Nenhum mercado este mês</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {markets.map((m: any) => (
            <div key={m.id} style={{
              background: 'var(--surface)', borderRadius: 12, padding: '12px 14px',
              border: '1px solid var(--border)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Storefront size={18} weight="duotone" color="var(--amber)" />
                <div>
                  <div style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: 14, color: 'var(--text)' }}>
                    {m.name}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                    {m.visits} visita(s)
                  </div>
                </div>
              </div>
              <div style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: 15, color: 'var(--amber-light)', whiteSpace: 'nowrap' }}>
                R$ {m.total?.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      )}
    </BottomDrawer>
  );
}