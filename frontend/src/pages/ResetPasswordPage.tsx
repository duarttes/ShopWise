import { useState } from 'react';
import { resetPassword } from '../services/api';
import { Button, Input } from '../components/ui';
import { Toast } from '../components/Toast';

export function ResetPasswordPage() {
  const token = new URLSearchParams(window.location.search).get('token') ?? '';
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit() {
    if (password !== confirm) return setError('As senhas não coincidem.');
    if (password.length < 6) return setError('Mínimo 6 caracteres.');
    try {
      setLoading(true);
      await resetPassword(token, password);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (!token) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100dvh', padding: 24 }}>
      <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Link inválido.</div>
    </div>
  );

  return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 24, background: 'var(--surface)' }}>
      {error && <Toast message={error} type="error" onClose={() => setError(null)} />}

      <div style={{ marginBottom: 32, textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 10 }}>🔐</div>
        <h1 style={{ fontFamily: 'Nunito', fontWeight: 900, fontSize: 26, margin: '0 0 6px', color: 'var(--text)' }}>
          Nova senha
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 14, margin: 0 }}>
          Escolha uma senha segura para sua conta
        </p>
      </div>

      {success ? (
        <div style={{ background: 'var(--insight-bg)', border: '1px solid var(--insight-border)', borderRadius: 16, padding: 24, textAlign: 'center' }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>✅</div>
          <div style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: 16, color: 'var(--green-light)', marginBottom: 8 }}>
            Senha redefinida!
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 16 }}>
            Volte ao app e entre com sua nova senha.
          </p>
          <Button onClick={() => window.location.href = '/'} variant="primary" fullWidth>
            Ir para o login
          </Button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Input type="password" value={password} onChange={setPassword} placeholder="Nova senha (mín. 6 caracteres)" />
          <Input type="password" value={confirm} onChange={setConfirm} placeholder="Confirmar nova senha"
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()} />
          <Button onClick={handleSubmit} disabled={loading || !password || !confirm} variant="primary" fullWidth>
            {loading ? 'Salvando...' : 'Redefinir senha'}
          </Button>
        </div>
      )}
    </div>
  );
}