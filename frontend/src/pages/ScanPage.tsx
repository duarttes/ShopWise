import { useState } from 'react';
import { importNfce, login, getStoredUserId } from '../services/api';
import { ReceiptPreviewCard } from '../components/ReceiptPreviewCard';

export function ScanPage() {
  const [userId, setUserId] = useState<string | null>(getStoredUserId());
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);

  const [value, setValue] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [importing, setImporting] = useState(false);
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
      const res = await importNfce({ rawText: value });
      setData(res);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleImport() {
    try {
      setImporting(true);
      const res = await importNfce({ rawText: value, confirmImport: true });
      alert('Compra importada!');
      console.log(res);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setImporting(false);
    }
  }

  if (!userId) {
    return (
      <div className="max-w-xl mx-auto p-4 space-y-4">
        <h1 className="text-2xl font-bold">ShopWise — Login</h1>
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
        <button
          onClick={handleLogin}
          className="w-full bg-black text-white p-3 rounded-xl"
        >
          Entrar
        </button>
        {loginError && <div className="text-red-500">{loginError}</div>}
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">ShopWise</h1>

      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Cole o QR code ou chave"
        className="w-full border rounded-xl p-3"
      />

      <button
        onClick={handlePreview}
        className="w-full bg-black text-white p-3 rounded-xl"
      >
        {loading ? 'Lendo...' : 'Ler NFC-e'}
      </button>

      {error && <div className="text-red-500">{error}</div>}

      {data?.receipt && (
        <ReceiptPreviewCard
          receipt={data.receipt}
          warnings={data.warnings}
          onConfirm={handleImport}
          loading={importing}
        />
      )}
    </div>
  );
}