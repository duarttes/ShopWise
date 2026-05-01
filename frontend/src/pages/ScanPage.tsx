import { useState } from 'react';
import { previewNfce, importNfce, login, getStoredUserId } from '../services/api';
import { ReceiptPreviewCard } from '../components/ReceiptPreviewCard';
import { QrCodeScanner } from '../components/QrCodeScanner';
import { Button, Input, Card, PageHeader } from '../components/ui';

export function ScanPage({ onLoginSuccess }: { onLoginSuccess?: () => void } = {}) {
  const [userId, setUserId] = useState<string | null>(getStoredUserId());
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [url, setUrl] = useState('');
  const [preview, setPreview] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [importing, setImporting] = useState(false);
  const [imported, setImported] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showScanner, setShowScanner] = useState(false);

  async function handleLogin() {
    try {
      setLoginError(null);
      const res = await login(email, password);
      setUserId(res.data.user.id);
      onLoginSuccess?.();
    } catch {
      setLoginError('Email ou senha incorretos.');
    }
  }

  async function handlePreview(scanUrl?: string) {
    const target = scanUrl ?? url;
    if (!target) return;
    try {
      setLoading(true);
      setError(null);
      setPreview(null);
      setImported(false);
      const res = await previewNfce(target);
      setPreview(res.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleImport() {
    try {
      setImporting(true);
      await importNfce(url);
      setImported(true);
      setPreview(null);
      setUrl('');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setImporting(false);
    }
  }

  function handleScan(result: string) {
    setShowScanner(false);
    setUrl(result);
    handlePreview(result);
  }

  if (!userId) {
    return (
      <div style={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 24,
        background: 'linear-gradient(160deg, #f0f7f0 0%, #e8f4e8 100%)',
      }}>
        <div style={{ marginBottom: 40, textAlign: 'center' }}>
          <div style={{ fontSize: 56, marginBottom: 10 }}>🛍️</div>
          <h1 style={{ fontFamily: 'Nunito', fontWeight: 900, fontSize: 32, margin: '0 0 6px', color: 'var(--text)', letterSpacing: '-0.5px' }}>
            Shop<span style={{ color: 'var(--green)' }}>Wise</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 14, margin: 0 }}>Inteligência de preços nas suas compras</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Input type="email" value={email} onChange={setEmail} placeholder="Email" />
          <Input type="password" value={password} onChange={setPassword} placeholder="Senha"
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()} />
          <Button onClick={handleLogin} variant="primary" fullWidth>Entrar</Button>
          {loginError && (
            <div style={{ textAlign: 'center', fontSize: 13, color: '#ef4444', fontFamily: 'Nunito', fontWeight: 700 }}>
              {loginError}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      {showScanner && <QrCodeScanner onScan={handleScan} onClose={() => setShowScanner(false)} />}
      <PageHeader title="Importar nota" subtitle="Escaneie ou cole a URL do QR code" />
      <div style={{ padding: '8px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Button onClick={() => setShowScanner(true)} variant="primary" fullWidth>
          📷 Escanear QR code
        </Button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--text-subtle)', fontSize: 13 }}>
          <div style={{ flex: 1, height: 1.5, background: 'var(--border)', borderRadius: 1 }} />
          ou cole a URL
          <div style={{ flex: 1, height: 1.5, background: 'var(--border)', borderRadius: 1 }} />
        </div>
        <Input value={url} onChange={setUrl} placeholder="https://www.nfce.fazenda.sp.gov.br/..." />
        <Button onClick={() => handlePreview()} disabled={loading || !url} variant="secondary" fullWidth>
          {loading ? 'Buscando...' : 'Ver prévia'}
        </Button>
        {error && (
          <div style={{ fontSize: 13, color: '#ef4444', textAlign: 'center', fontFamily: 'Nunito', fontWeight: 700 }}>
            {error}
          </div>
        )}
        {imported && (
          <Card>
            <div style={{ textAlign: 'center', color: 'var(--green)', fontFamily: 'Nunito', fontWeight: 800 }}>
              ✓ Nota importada com sucesso!
            </div>
          </Card>
        )}
        {preview && <ReceiptPreviewCard preview={preview} onConfirm={handleImport} loading={importing} />}
      </div>
    </div>
  );
}