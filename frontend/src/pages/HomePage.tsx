import { useEffect, useState } from 'react';
import { getHomeInsights, updateLocation, getStoredUserId } from '../services/api';
import { Card, Button, SectionLabel, EmptyState, InsightCard } from '../components/ui';
import { PageLoading } from '../components/PageLoading';
import { PageError } from '../components/PageError';

export function HomePage() {
  const [insights, setInsights] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [locating, setLocating] = useState(false);
  const [locMsg, setLocMsg] = useState<string | null>(null);
  const userId = getStoredUserId();

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    getHomeInsights(userId)
      .then((res) => setInsights(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [userId]);

  async function handleSaveLocation() {
    if (!navigator.geolocation) return setLocMsg('Não suportado.');
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          await updateLocation(pos.coords.latitude, pos.coords.longitude);
          setLocMsg('✓ Localização salva!');
        } finally { setLocating(false); }
      },
      () => { setLocMsg('Permissão negada.'); setLocating(false); }
    );
  }

  if (loading) return <PageLoading />;
  if (error) return <PageError message={error} onRetry={() => window.location.reload()} />;

  const stats = [
    { label: 'este mês', value: `R$ ${insights?.month?.totalSpent?.toFixed(2) ?? '0.00'}`, color: 'var(--green-light)' },
    { label: 'notas', value: String(insights?.month?.receiptsCount ?? 0), color: 'var(--text)' },
    { label: 'mercados', value: String(insights?.month?.marketsCount ?? 0), color: 'var(--amber-light)' },
  ];

  return (
    <div style={{ paddingBottom: 24 }}>
      {/* Header */}
      <div style={{ background: 'var(--header-bg)', padding: '16px 16px 20px', borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -60, left: -60, width: 200, height: 200, background: 'var(--glow-1)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 20, right: -40, width: 160, height: 160, background: 'var(--glow-2)', pointerEvents: 'none' }} />
        <p style={{ margin: '0 0 14px', fontSize: 12, color: 'var(--text-muted)', fontFamily: 'Nunito Sans', position: 'relative' }}>
          bom dia 👋 — resumo do mês
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, position: 'relative' }}>
          {stats.map((item) => (
            <div key={item.label} style={{
              background: 'var(--stat-card-bg)',
              borderRadius: 14,
              padding: '12px',
              border: '1px solid var(--stat-card-border)',
              boxShadow: 'var(--stat-card-shadow)',
            }}>
              <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 900, fontSize: 16, color: item.color, lineHeight: 1, marginBottom: 4 }}>
                {item.value}
              </div>
              <div style={{ fontSize: 10, color: 'var(--text-subtle)' }}>{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '16px 16px 0', display: 'flex', flexDirection: 'column', gap: 16 }}>

        {insights?.topMarket && (
          <div>
            <SectionLabel>Mercado favorito</SectionLabel>
            <InsightCard label="mais frequentado" value={insights.topMarket.name}>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
                {insights.topMarket.visits} visita(s) · R$ {insights.topMarket.totalSpent?.toFixed(2)}
              </div>
            </InsightCard>
          </div>
        )}

        {insights?.priceHighlights?.lowestRecentPrices?.length > 0 && (
          <div>
            <SectionLabel>Melhores preços recentes</SectionLabel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {insights.priceHighlights.lowestRecentPrices.slice(0, 3).map((item: any) => (
                <Card key={item.productId}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: 14, color: 'var(--text)' }}>{item.productName}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{item.marketName}</div>
                    </div>
                    <div style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: 17, color: 'var(--green-light)' }}>
                      R$ {item.price?.toFixed(2)}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {insights?.priceHighlights?.biggestRecentIncreases?.length > 0 && (
          <div>
            <SectionLabel>Maiores altas recentes</SectionLabel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {insights.priceHighlights.biggestRecentIncreases.slice(0, 3).map((item: any) => (
                <Card key={item.productId}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: 14, color: 'var(--text)' }}>{item.productName}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{item.marketName}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: 15, color: '#e05050' }}>
                        R$ {item.price?.toFixed(2)}
                      </div>
                      <div style={{ fontSize: 11, color: '#e05050' }}>+{item.increasePercentage}%</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {!insights?.topMarket && (
          <EmptyState icon="🛒" title="Nenhuma compra ainda" description="Importe sua primeira nota fiscal para ver seus insights aqui." />
        )}

        <div>
          <SectionLabel>Minha localização</SectionLabel>
          <Card>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 12 }}>
              Para receber recomendações de mercados próximos.
            </p>
            <Button onClick={handleSaveLocation} disabled={locating} variant="secondary" fullWidth>
              {locating ? 'Obtendo...' : '📍 Usar localização atual'}
            </Button>
            {locMsg && (
              <div style={{ fontSize: 13, marginTop: 8, color: locMsg.includes('✓') ? 'var(--green-light)' : '#ef4444', textAlign: 'center', fontFamily: 'Nunito', fontWeight: 700 }}>
                {locMsg}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}