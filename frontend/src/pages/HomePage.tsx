import { useEffect, useState } from 'react';
import { ScanSmiley } from '@phosphor-icons/react';
import { getHomeInsights, updateLocation, getStoredUserId, previewNfce, importNfce } from '../services/api';
import { Card, SectionLabel, EmptyState, InsightCard } from '../components/ui';
import { PageLoading } from '../components/PageLoading';
import { PageError } from '../components/PageError';
import { QrCodeScanner } from '../components/QrCodeScanner';
import { ReceiptPreviewCard } from '../components/ReceiptPreviewCard';
import { Toast } from '../components/Toast';

export function HomePage() {
  const userId = getStoredUserId();

  const [insights, setInsights] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showScanner, setShowScanner] = useState(false);
  const [scanUrl, setScanUrl] = useState('');
  const [preview, setPreview] = useState<any>(null);
  const [scanLoading, setScanLoading] = useState(false);
  const [importing, setImporting] = useState(false);
  const [scanError, setScanError] = useState<string | null>(null);
  const [imported, setImported] = useState(false);
  const [importedMarket, setImportedMarket] = useState<{ id: string; name: string } | null>(null);

  useEffect(() => {
    if (!userId) return;
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try { await updateLocation(pos.coords.latitude, pos.coords.longitude); } catch {}
      },
      undefined,
      { timeout: 8000, maximumAge: 1000 * 60 * 10 }
    );
  }, [userId]);

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    getHomeInsights(userId)
      .then((res) => setInsights(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [userId]);

  async function handleScan(result: string) {
    setShowScanner(false);
    setScanUrl(result);
    setScanLoading(true);
    setScanError(null);
    setPreview(null);
    setImported(false);
    setImportedMarket(null);
    try {
      const res = await previewNfce(result);
      setPreview(res.data);
    } catch (err: any) {
      setScanError(err.message);
    } finally {
      setScanLoading(false);
    }
  }

  async function handleImport() {
    try {
      setImporting(true);
      const res = await importNfce(scanUrl);
      setImportedMarket({
        id: res.data?.receipt?.marketId ?? res.data?.receipt?.market?.id ?? '',
        name: res.data?.receipt?.market?.name ?? '',
      });
      setImported(true);
      setPreview(null);
      setScanUrl('');
      if (userId) {
        const updated = await getHomeInsights(userId);
        setInsights(updated.data);
      }
    } catch (err: any) {
      setScanError(err.message);
    } finally {
      setImporting(false);
    }
  }

  if (loading) return <PageLoading />;
  if (error) return <PageError message={error} onRetry={() => window.location.reload()} />;

  const hasMonthData = (insights?.month?.totalSpent ?? 0) > 0 || (insights?.month?.receiptsCount ?? 0) > 0;

  const stats = [
    { label: 'este mês', value: `R$ ${insights?.month?.totalSpent?.toFixed(2) ?? '0.00'}`, color: 'var(--green-light)' },
    { label: 'notas', value: String(insights?.month?.receiptsCount ?? 0), color: 'var(--text)' },
    { label: 'mercados', value: String(insights?.month?.marketsCount ?? 0), color: 'var(--amber-light)' },
  ];

  return (
    <div style={{ paddingBottom: 24 }}>

      {showScanner && (
        <QrCodeScanner onScan={handleScan} onClose={() => setShowScanner(false)} />
      )}

      {/* Header */}
      <div style={{
        background: 'var(--header-bg)',
        padding: '16px 16px 20px',
        borderBottom: '1px solid var(--border)',
        position: 'relative',
        overflow: 'hidden',
      }}>
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

      {!hasMonthData && insights?.topMarket && (
        <div style={{ padding: '8px 16px 0' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'var(--insight-bg)', border: '1px solid var(--insight-border)',
            borderRadius: 20, padding: '4px 12px',
            fontSize: 11, color: 'var(--amber)', fontFamily: 'Nunito', fontWeight: 700,
          }}>
            📊 Exibindo dados históricos
          </div>
        </div>
      )}

      {/* Scan CTA */}
      <div style={{ padding: '16px 16px 0' }}>
        <button
          onClick={() => {
            setPreview(null);
            setScanError(null);
            setImported(false);
            setImportedMarket(null);
            setShowScanner(true);
          }}
          disabled={scanLoading}
          style={{
            width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 10, padding: '15px 20px', borderRadius: 16, border: 'none',
            cursor: scanLoading ? 'not-allowed' : 'pointer',
            opacity: scanLoading ? 0.7 : 1,
            background: 'var(--green)', color: '#fff',
            fontFamily: 'Nunito, sans-serif', fontSize: 16, fontWeight: 800,
            boxShadow: 'var(--shadow-btn)',
          }}
        >
          <ScanSmiley size={22} weight="duotone" />
          {scanLoading ? 'Lendo nota...' : 'Escanear nota fiscal'}
        </button>

        {scanError && <Toast message={scanError} type="error" onClose={() => setScanError(null)} />}

        {(preview || imported) && (
          <div style={{ marginTop: 12 }}>
            <ReceiptPreviewCard
              preview={preview ?? {}}
              onConfirm={handleImport}
              loading={importing}
              importedMarket={imported ? importedMarket : null}
            />
          </div>
        )}
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

        {!insights?.topMarket && !insights?.priceHighlights?.lowestRecentPrices?.length && !preview && !imported && (
          <EmptyState
            icon="🛒"
            title="Nenhuma compra ainda"
            description="Escaneie sua primeira nota fiscal para ver seus insights aqui."
          />
        )}

      </div>
    </div>
  );
}