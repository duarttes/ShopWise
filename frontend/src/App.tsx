import { useState, useEffect } from 'react';
import {
  House, Receipt, ScanSmiley, ShoppingBag, MapPin,
  List, X, SignOut, ChartBar, Sun, Moon
} from '@phosphor-icons/react';
import { ScanPage } from './pages/ScanPage';
import { HomePage } from './pages/HomePage';
import { ShoppingListsPage } from './pages/ShoppingListsPage';
import { ReceiptsPage } from './pages/ReceiptsPage';
import { MarketsMapPage } from './pages/MarketsMapPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { getStoredUserId, logout, getMe } from './services/api';
import { useTheme } from './contexts/ThemeContext';
import { ResetPasswordPage } from './pages/ResetPasswordPage';

const tabs = [
  { id: 'home',      label: 'Início',   Icon: House },
  { id: 'receipts',  label: 'Notas',    Icon: Receipt },
  { id: 'scan',      label: 'Escanear', Icon: ScanSmiley },
  { id: 'analytics', label: 'Análises', Icon: ChartBar },
  { id: 'lists',     label: 'Listas',   Icon: ShoppingBag },
  { id: 'map',       label: 'Mapa',     Icon: MapPin },
];

function App() {
  const [tab, setTab] = useState<'home' | 'receipts' | 'scan' | 'analytics' | 'lists' | 'map'>('home');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(getStoredUserId());
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    if (!userId) return;
    getMe().then((res) => setUser(res.data)).catch(() => {});
  }, [userId]);

  function handleLoginSuccess() {
    setUserId(getStoredUserId());
    setTab('home');
    getMe().then((res) => setUser(res.data)).catch(() => {});
  }

  function navigate(id: string) {
    setTab(id as any);
    setDrawerOpen(false);
  }

  if (window.location.pathname === '/reset-password') {
    return <ResetPasswordPage />;
  }

  if (!userId) return <ScanPage onLoginSuccess={handleLoginSuccess} />;

  const initials = user?.name?.split(' ').map(n => n[0]).slice(0, 2).join('') ?? '?';

  return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', background: 'var(--surface)' }}>

      <header style={{
        position: 'sticky', top: 0, zIndex: 200,
        background: 'var(--nav-bg)',
        borderBottom: '1px solid var(--border)',
        padding: '0 16px', height: 56,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        backdropFilter: 'blur(12px)',
      }}>
        <button
          onClick={() => setDrawerOpen(true)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: 'var(--text)', display: 'flex', alignItems: 'center' }}
        >
          <List size={24} weight="duotone" />
        </button>

        <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 900, fontSize: 20, letterSpacing: '-0.3px', color: 'var(--text)' }}>
          Shop<span style={{ color: 'var(--green-light)' }}>Wise</span>
        </div>

        <button
          onClick={toggleTheme}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}
        >
          {theme === 'dark'
            ? <Sun size={20} weight="duotone" />
            : <Moon size={20} weight="duotone" />}
        </button>
      </header>

      {drawerOpen && (
        <div onClick={() => setDrawerOpen(false)} style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.50)',
          zIndex: 300, backdropFilter: 'blur(3px)',
        }} />
      )}

      <div style={{
        position: 'fixed', top: 0,
        left: drawerOpen ? 0 : -280,
        width: 260, height: '100dvh',
        background: 'var(--nav-bg)',
        zIndex: 400,
        transition: 'left 0.25s cubic-bezier(0.4,0,0.2,1)',
        display: 'flex', flexDirection: 'column',
        boxShadow: drawerOpen ? '4px 0 32px rgba(0,0,0,0.25)' : 'none',
        borderRight: '1px solid var(--border)',
      }}>
        <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 40, height: 40, borderRadius: '50%',
              background: 'rgba(45,122,74,0.15)',
              border: '1.5px solid rgba(90,184,122,0.30)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--green-light)',
              fontFamily: 'Nunito', fontWeight: 800, fontSize: 15,
            }}>
              {initials}
            </div>
            <div>
              <div style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: 14, color: 'var(--text)', lineHeight: 1.2 }}>
                {user?.name ?? '...'}
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-subtle)', lineHeight: 1.2 }}>
                {user?.email ?? ''}
              </div>
            </div>
          </div>
          <button onClick={() => setDrawerOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 4 }}>
            <X size={18} weight="bold" />
          </button>
        </div>

        <nav style={{ flex: 1, padding: '12px' }}>
          {tabs.map(({ id, label, Icon }) => {
            const active = tab === id;
            return (
              <button key={id} onClick={() => navigate(id)} style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 12,
                padding: '11px 14px', borderRadius: 14, border: 'none', cursor: 'pointer',
                background: active ? 'rgba(45,122,74,0.12)' : 'transparent',
                color: active ? 'var(--green-light)' : 'var(--text-muted)',
                fontFamily: 'Nunito, sans-serif', fontSize: 14, fontWeight: active ? 800 : 600,
                marginBottom: 2, transition: 'all 0.15s', textAlign: 'left',
              }}>
                <Icon size={20} weight={active ? 'duotone' : 'regular'} />
                {label}
                {active && <div style={{ marginLeft: 'auto', width: 5, height: 5, borderRadius: '50%', background: 'var(--green-light)' }} />}
              </button>
            );
          })}
        </nav>

        <div style={{ padding: '12px 12px 20px', borderTop: '1px solid var(--border)' }}>
          <button onClick={toggleTheme} style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: 12,
            padding: '11px 14px', borderRadius: 14, border: 'none', cursor: 'pointer',
            background: 'transparent', color: 'var(--text-muted)',
            fontFamily: 'Nunito, sans-serif', fontSize: 14, fontWeight: 600, marginBottom: 4,
          }}>
            {theme === 'dark'
              ? <Sun size={20} weight="duotone" />
              : <Moon size={20} weight="duotone" />}
            {theme === 'dark' ? 'Modo claro' : 'Modo escuro'}
          </button>
          <button onClick={logout} style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: 12,
            padding: '11px 14px', borderRadius: 14, border: 'none', cursor: 'pointer',
            background: 'transparent', color: '#ef4444',
            fontFamily: 'Nunito, sans-serif', fontSize: 14, fontWeight: 700,
          }}>
            <SignOut size={20} weight="duotone" />
            Sair da conta
          </button>
          <div style={{ fontSize: 11, color: 'var(--text-subtle)', textAlign: 'center', marginTop: 8 }}>
            ShopWise · v1.0
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {tab === 'home' && <HomePage />}
        {tab === 'receipts'  && <ReceiptsPage />}
        {tab === 'scan'      && <ScanPage onLoginSuccess={handleLoginSuccess} />}
        {tab === 'analytics' && <AnalyticsPage />}
        {tab === 'lists'     && <ShoppingListsPage />}
        {tab === 'map'       && <MarketsMapPage />}
      </div>
    </div>
  );
}

export default App;