import { useEffect, useState } from 'react';
import { getHomeInsights, updateLocation, getStoredUserId } from '../services/api';
import { Card, Button, SectionLabel, EmptyState } from '../components/ui';

export function HomePage() {
  const [insights, setInsights] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [locating, setLocating] = useState(false);
  const [locMsg, setLocMsg] = useState<string | null>(null);
  const userId = getStoredUserId();

  useEffect(() => {
    if (!userId) return;
    getHomeInsights(userId)
      .then((res) => setInsights(res.data))
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

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', color: 'var(--text-muted)', fontFamily: 'Nunito' }}>
      Carregando...
    </div>
  );

  return (
    <div style={{ paddingBottom: 24 }}>
      <div style={{
        background: 'linear-gradient(160deg, #f0f7f0 0%, #e8f4e8 100%)',
        padding: '16px 20px 20px',
        borderBottom: '1.5px solid var(--border)',
      }}>
        <p style={{ margin: '0 0 12px', fontSize: 13, color: 'var(--text-muted)', fontFamily: 'Nunito Sans' }}>
          bom dia 👋 — resumo do mês
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {[
            { label: 'este mês', value: `R$ ${insights?.month?.totalSpent?.toFixed(2) ?? '0.00'}`, accent: true },
            { label: 'notas', value: String(insights?.month?.receiptsCount ?? 0), accent: false },
            { label: 'mercados', value: String(insights?.month?.marketsCount ?? 0), accent: false },
          ].map((item) => (
            <div key={item.label} style={{
              background: '#fff',
              borderRadius: 14,
              padding: '10px 12px',
              boxShadow: '0 3px 0 var(--green-muted), 0 5px 12px rgba(80,140,80,0.07)',
            }}>
              <div style={{
                fontFamily: 'Nunito, sans-serif',
                fontWeight: 800,
                fontSize: 17,
                color: item.accent ? 'var(--green)' : 'var(--text)',
              }}>
                {item.value}
              </div>
              <div style={{ fontSize: 10, color: 'var(--text-subtle)', marginTop: 2 }}>{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '16px 16px 0', display: 'flex', flexDirection: 'column', gap: 16 }}>

        {insights?.topMarket && (
          <div>
            <SectionLabel>Mercado favorito</SectionLabel>
            <Card>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: 16, color: 'var(--text)' }}>
                    {insights.topMarket.name}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
                    {insights.topMarket.visits} visita(s) · R$ {insights.topMarket.totalSpent?.toFixed(2)}
                  </div>
                </div>
                <div style={{
                  background: 'var(--green-light)',
                  color: 'var(--green)',
                  fontSize: 10,
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: 20,
                  fontFamily: 'Nunito',
                }}>fav ★</div>
              </div>
            </Card>
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
                      <div style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: 14 }}>{item.productName}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{item.marketName}</div>
                    </div>
                    <div style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: 17, color: 'var(--green)' }}>
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
                      <div style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: 14 }}>{item.productName}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{item.marketName}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: 15, color: '#ef4444' }}>
                        R$ {item.price?.toFixed(2)}
                      </div>
                      <div style={{ fontSize: 11, color: '#ef4444' }}>
                        +{item.increasePercentage}%
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {!insights?.topMarket && (
          <EmptyState
            icon="🛒"
            title="Nenhuma compra ainda"
            description="Importe sua primeira nota fiscal para ver seus insights aqui."
          />
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
              <div style={{
                fontSize: 13,
                marginTop: 8,
                color: locMsg.includes('✓') ? 'var(--green)' : '#ef4444',
                textAlign: 'center',
                fontFamily: 'Nunito',
                fontWeight: 700,
              }}>{locMsg}</div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}