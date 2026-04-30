import { useState } from 'react';
import { previewNfce, importNfce, login, getStoredUserId } from '../services/api';
import { ReceiptPreviewCard } from '../components/ReceiptPreviewCard';

export function ScanPage() {
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

  async function handleLogin() {
    try {
      setLoginError(null);
      const res = await login(email, password);
      setUserId(res.data.user.id);
    } catch (err: any) {
      setLoginError(err.message);
    }
  }

  async function handlePreview() {
    try {
      setLoading(true);
      setError(null);
      setPreview(null);
      setImported(false);
      const res = await previewNfce(url);
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
    } catch (err: any) {
      setError(err.message);
    } finally {
      setImporting(false);
    }
  }

  if (!userId) {
    return (
      <div className="max-w-xl mx-auto p-4 space-y-4">
        <h1 className="text-2xl font-bold">ShopWise</h1>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full border rounded-xl p-3"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
          className="w-full border rounded-xl p-3"
        />
        <button onClick={handleLogin} className="w-full bg-black text-white p-3 rounded-xl">
          Entrar
        </button>
        {loginError && <div className="text-red-500">{loginError}</div>}
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">ShopWise</h1>

      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Cole a URL do QR code da NFC-e"
        className="w-full border rounded-xl p-3"
      />

      <button
        onClick={handlePreview}
        disabled={loading || !url}
        className="w-full bg-black text-white p-3 rounded-xl disabled:opacity-50"
      >
        {loading ? 'Buscando...' : 'Ver prévia'}
      </button>

      {error && <div className="text-red-500">{error}</div>}

      {imported && (
        <div className="text-green-600 font-medium">Nota importada com sucesso!</div>
      )}

      {preview && (
        <ReceiptPreviewCard
          preview={preview}
          onConfirm={handleImport}
          loading={importing}
        />
      )}
    </div>
  );
}