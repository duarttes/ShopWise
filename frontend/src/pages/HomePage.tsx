import { useEffect, useState } from 'react';
import { ScanSmiley } from '@phosphor-icons/react';
import { getHomeInsights, updateLocation, getStoredUserId, previewNfce, importNfce } from '../services/api';
import { Card, Button, SectionLabel, EmptyState, InsightCard } from '../components/ui';
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
  const [locating, setLocating] = useState(false);
  const [locMsg, setLocMsg] = useState<string | null>(null);

  const [showScanner, setShowScanner] = useState(false);
  const [scanUrl, setScanUrl] = useState('');
  const [preview, setPreview] = useState<any>(null);
  const [scanLoading, setScanLoading] = useState(false);
  const [importing, setImporting] = useState(false);
  const [scanError, setScanError] = useState<string | null>(null);
  const [imported, setImported] = useState(false);
  const hasMonthData = (insights?.month?.totalSpent ?? 0) > 0;

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

  async function handleScan(result: string) {
    setShowScanner(false);
    setScanUrl(result);
    setScanLoading(true);
    setScanError(null);
    setPreview(null);
    setImported(false);
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
      await importNfce(scanUrl);
      setImported(true);
      setPreview(null);
      setScanUrl('');
      if (userId) {
        const res = await getHomeInsights(userId);
        setInsights(res.data);
      }
    } catch (err: any) {
      setScanError(err.message);
    } finally {
      setImporting(false);
    }
  }

  if (loading) return <PageLoading />;
  if (error) return <PageError message={error} onRetry={() => window.location.reload()} />;

  const stats = [
    {
      label: hasMonthData ? 'este mês' : 'histórico',
      value: hasMonthData
        ? `R$ ${insights?.month?.totalSpent?.toFixed(2)}`
        : `R$ ${insights?.allTime?.totalSpent?.toFixed(2) ?? '0.00'}`,
      color: 'var(--green-light)',
    },
    {
      label: 'notas',
      value: String(hasMonthData ? insights?.month?.receiptsCount : (insights?.allTime?.receiptsCount ?? 0)),
      color: 'var(--text)',
    },
    {
      label: 'mercados',
      value: String(hasMonthData ? insights?.month?.marketsCount : (insights?.allTime?.marketsCount ?? 0)),
      color: 'var(--amber-light)',
    },
  ];

  return (
    <div style={{ paddingBottom: 24 }}>

      {showScanner && (
        <QrCodeScanner
          onScan={handleScan}
          onClose={() => setShowScanner(false)}
        />
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

      {/* Scan CTA */}
      <div style={{ padding: '16px 16px 0' }}>
        <button
          onClick={() => {
            setPreview(null);
            setScanError(null);
            setImported(false);
            setShowScanner(true);
          }}
          disabled={scanLoading}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            padding: '15px 20px',
            borderRadius: 16,
            border: 'none',
            cursor: scanLoading ? 'not-allowed' : 'pointer',
            opacity: scanLoading ? 0.7 : 1,
            background: 'var(--green)',
            color: '#fff',
            fontFamily: 'Nunito, sans-serif',
            fontSize: 16,
            fontWeight: 800,
            boxShadow: 'var(--shadow-btn)',
          }}
        >
          <ScanSmiley size={22} weight="duotone" />
          {scanLoading ? 'Lendo nota...' : 'Escanear nota fiscal'}
        </button>

        {scanError && <Toast message={scanError} type="error" onClose={() => setScanError(null)} />}

        {preview && (
          <div style={{ marginTop: 12 }}>
            <ReceiptPreviewCard
              preview={preview}
              onConfirm={handleImport}
              loading={importing}
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