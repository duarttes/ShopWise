import { useState } from 'react';
import { Home, Receipt, ScanLine, ShoppingCart, MapPin, Menu, X, LogOut } from 'lucide-react';
import { ScanPage } from './pages/ScanPage';
import { HomePage } from './pages/HomePage';
import { ShoppingListsPage } from './pages/ShoppingListsPage';
import { ReceiptsPage } from './pages/ReceiptsPage';
import { MarketsMapPage } from './pages/MarketsMapPage';
import { getStoredUserId, logout } from './services/api';

const tabs = [
  { id: 'home',     label: 'Início',   Icon: Home },
  { id: 'receipts', label: 'Notas',    Icon: Receipt },
  { id: 'scan',     label: 'Escanear', Icon: ScanLine },
  { id: 'lists',    label: 'Listas',   Icon: ShoppingCart },
  { id: 'map',      label: 'Mapa',     Icon: MapPin },
];

function App() {
  const [tab, setTab] = useState<'home' | 'receipts' | 'scan' | 'lists' | 'map'>('home');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(getStoredUserId());

  function handleLoginSuccess() {
    setUserId(getStoredUserId());
    setTab('home');
  }

  function navigate(id: string) {
    setTab(id as any);
    setDrawerOpen(false);
  }

  if (!userId) {
    return <ScanPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', background: 'var(--surface)' }}>

      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 200,
        background: '#fff',
        borderBottom: '1.5px solid var(--border)',
        padding: '0 16px',
        height: 56,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 2px 8px rgba(80,140,80,0.06)',
      }}>
        <button
          onClick={() => setDrawerOpen(true)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: 'var(--text)', display: 'flex', alignItems: 'center' }}
        >
          <Menu size={24} strokeWidth={2} />
        </button>
        <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 900, fontSize: 20, letterSpacing: '-0.3px' }}>
          Shop<span style={{ color: 'var(--green)' }}>Wise</span>
        </div>
        <div style={{ width: 32 }} />
      </header>

      {drawerOpen && (
        <div
          onClick={() => setDrawerOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.35)',
            zIndex: 300,
            backdropFilter: 'blur(2px)',
          }}
        />
      )}

      <div style={{
        position: 'fixed',
        top: 0,
        left: drawerOpen ? 0 : -280,
        width: 260,
        height: '100dvh',
        background: '#fff',
        zIndex: 400,
        transition: 'left 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: drawerOpen ? '4px 0 24px rgba(0,0,0,0.12)' : 'none',
      }}>
        <div style={{
          padding: '20px 20px 16px',
          borderBottom: '1.5px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 900, fontSize: 22, letterSpacing: '-0.3px' }}>
            Shop<span style={{ color: 'var(--green)' }}>Wise</span>
          </div>
          <button
            onClick={() => setDrawerOpen(false)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 4 }}
          >
            <X size={20} />
          </button>
        </div>

        <nav style={{ flex: 1, padding: '12px 12px' }}>
          {tabs.map(({ id, label, Icon }) => {
            const active = tab === id;
            return (
              <button
                key={id}
                onClick={() => navigate(id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '12px 14px',
                  borderRadius: 12,
                  border: 'none',
                  cursor: 'pointer',
                  background: active ? 'var(--green-light)' : 'transparent',
                  color: active ? 'var(--green-dark)' : 'var(--text-muted)',
                  fontFamily: 'Nunito, sans-serif',
                  fontSize: 15,
                  fontWeight: active ? 800 : 600,
                  marginBottom: 4,
                  transition: 'all 0.15s',
                  textAlign: 'left',
                }}
              >
                <Icon size={20} strokeWidth={active ? 2.5 : 1.8} />
                {label}
                {active && (
                  <div style={{
                    marginLeft: 'auto',
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: 'var(--green)',
                  }} />
                )}
              </button>
            );
          })}
        </nav>

        <div style={{ padding: '12px 12px 20px', borderTop: '1.5px solid var(--border)' }}>
          <button
            onClick={logout}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '12px 14px',
              borderRadius: 12,
              border: 'none',
              cursor: 'pointer',
              background: 'transparent',
              color: '#ef4444',
              fontFamily: 'Nunito, sans-serif',
              fontSize: 15,
              fontWeight: 700,
              transition: 'background 0.15s',
            }}
          >
            <LogOut size={20} strokeWidth={1.8} />
            Sair da conta
          </button>
          <div style={{ fontSize: 11, color: 'var(--text-subtle)', fontFamily: 'Nunito Sans', textAlign: 'center', marginTop: 8 }}>
            ShopWise · v1.0
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {tab === 'home'     && <HomePage />}
        {tab === 'receipts' && <ReceiptsPage />}
        {tab === 'scan'     && <ScanPage onLoginSuccess={handleLoginSuccess} />}
        {tab === 'lists'    && <ShoppingListsPage />}
        {tab === 'map'      && <MarketsMapPage />}
      </div>
    </div>
  );
}

export default App;