import { useEffect, useState } from 'react';
import { X, TrendUp, TrendDown, Storefront } from '@phosphor-icons/react';
import { getProductPriceHistory, getProductMarketComparison } from '../services/api';

interface Props {
  productId: string;
  productName: string;
  onClose: () => void;
}

export function PriceHistoryDrawer({ productId, productName, onClose }: Props) {
  const [history, setHistory] = useState<any>(null);
  const [comparison, setComparison] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getProductPriceHistory(productId),
      getProductMarketComparison(productId),
    ]).then(([hist, comp]) => {
      setHistory(hist.data);
      setComparison(comp.data);
    }).catch(() => {}).finally(() => setLoading(false));
  }, [productId]);

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit', month: 'short', year: '2-digit',
    });
  }

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(4px)',
          zIndex: 400,
        }}
      />

      {/* Drawer */}
      <div style={{
        position: 'fixed',
        bottom: 0, left: 0, right: 0,
        background: 'var(--card)',
        borderRadius: '20px 20px 0 0',
        zIndex: 401,
        maxHeight: '80dvh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 -8px 40px rgba(0,0,0,0.3)',
      }}>
        {/* Handle */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 4px' }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: 'var(--border)' }} />
        </div>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '8px 20px 16px' }}>
          <div>
            <div style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: 16, color: 'var(--text)', lineHeight: 1.3 }}>
              {productName}
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>
              histórico de preços
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
            <X size={20} weight="bold" color="var(--text-muted)" />
          </button>
        </div>

        {/* Content */}
        <div style={{ overflowY: 'auto', padding: '0 20px 32px', flex: 1 }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)', fontSize: 13 }}>
              Carregando...
            </div>
          ) : (
            <>
              {/* Summary */}
              {history?.summary && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 20 }}>
                  {[
                    { label: 'menor', value: history.summary.lowestPrice, color: 'var(--green-light)' },
                    { label: 'média', value: history.summary.averagePrice, color: 'var(--text)' },
                    { label: 'maior', value: history.summary.highestPrice, color: '#e05050' },
                  ].map((s) => (
                    <div key={s.label} style={{
                      background: 'var(--surface)',
                      borderRadius: 12,
                      padding: '10px',
                      border: '1px solid var(--border)',
                      textAlign: 'center',
                    }}>
                      <div style={{ fontFamily: 'Nunito', fontWeight: 900, fontSize: 15, color: s.color }}>
                        R$ {s.value?.toFixed(2)}
                      </div>
                      <div style={{ fontSize: 10, color: 'var(--text-subtle)', marginTop: 2 }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Comparação por mercado */}
              {comparison?.markets?.length > 0 && (
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 10, color: 'var(--amber)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 10 }}>
                    Comparação por mercado
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {comparison.markets.map((m: any) => (
                      <div key={m.market.id} style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        background: 'var(--surface)', borderRadius: 12, padding: '10px 14px',
                        border: m.rank === 1 ? '1px solid rgba(74,180,110,0.3)' : '1px solid var(--border)',
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <Storefront size={16} weight="duotone" color={m.rank === 1 ? 'var(--green-light)' : 'var(--text-muted)'} />
                          <div>
                            <div style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: 13, color: 'var(--text)' }}>
                              {m.market.name}
                            </div>
                            <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>
                              atualizado {formatDate(m.latestObservedAt)}
                            </div>
                          </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: 15, color: m.rank === 1 ? 'var(--green-light)' : 'var(--text)' }}>
                            R$ {m.latestPrice?.toFixed(2)}
                          </div>
                          {m.rank > 1 && (
                            <div style={{ fontSize: 10, color: '#e05050' }}>
                              +R$ {m.differenceFromBest?.toFixed(2)}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Histórico cronológico */}
              {history?.history?.length > 0 && (
                <div>
                  <div style={{ fontSize: 10, color: 'var(--amber)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 10 }}>
                    Histórico
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {[...history.history].reverse().slice(0, 10).map((entry: any, i: number, arr: any[]) => {
                      const prev = arr[i + 1];
                      const diff = prev ? entry.price - prev.price : 0;
                      return (
                        <div key={entry.id} style={{
                          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                          padding: '8px 12px', borderRadius: 10,
                          background: 'var(--surface)', border: '1px solid var(--border)',
                        }}>
                          <div>
                            <div style={{ fontSize: 12, color: 'var(--text)', fontFamily: 'Nunito', fontWeight: 600 }}>
                              {entry.market.name}
                            </div>
                            <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>
                              {formatDate(entry.observedAt)}
                            </div>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            {diff !== 0 && (
                              diff > 0
                                ? <TrendUp size={14} color="#e05050" />
                                : <TrendDown size={14} color="var(--green-light)" />
                            )}
                            <div style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: 14, color: 'var(--text)' }}>
                              R$ {entry.price?.toFixed(2)}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}