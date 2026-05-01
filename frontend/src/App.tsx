import { useState } from 'react';
import { Home, Receipt, ScanLine, ShoppingCart, MapPin } from 'lucide-react';
import { ScanPage } from './pages/ScanPage';
import { HomePage } from './pages/HomePage';
import { ShoppingListsPage } from './pages/ShoppingListsPage';
import { ReceiptsPage } from './pages/ReceiptsPage';
import { MarketsMapPage } from './pages/MarketsMapPage';
import { getStoredUserId } from './services/api';

const tabs = [
  { id: 'home',     label: 'Início',   Icon: Home },
  { id: 'receipts', label: 'Notas',    Icon: Receipt },
  { id: 'scan',     label: 'Escanear', Icon: ScanLine },
  { id: 'lists',    label: 'Listas',   Icon: ShoppingCart },
  { id: 'map',      label: 'Mapa',     Icon: MapPin },
];

function App() {
  const [tab, setTab] = useState<'home' | 'receipts' | 'scan' | 'lists' | 'map'>('home');
  const userId = getStoredUserId();

  if (!userId) return <ScanPage />;

  return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', background: 'var(--surface)' }}>
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 'var(--nav-height)' }}>
        {tab === 'home'     && <HomePage />}
        {tab === 'receipts' && <ReceiptsPage />}
        {tab === 'scan'     && <ScanPage />}
        {tab === 'lists'    && <ShoppingListsPage />}
        {tab === 'map'      && <MarketsMapPage />}
      </div>

      <nav style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: 480,
        height: 'var(--nav-height)',
        background: '#fff',
        borderTop: '1.5px solid var(--border)',
        display: 'flex',
        zIndex: 100,
        boxShadow: '0 -4px 16px rgba(80,140,80,0.08)',
      }}>
        {tabs.map(({ id, label, Icon }) => {
          const active = tab === id;
          return (
            <button
              key={id}
              onClick={() => setTab(id as any)}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 4,
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                color: active ? 'var(--green)' : 'var(--text-subtle)',
                fontSize: 10,
                fontFamily: 'Nunito, sans-serif',
                fontWeight: active ? 800 : 600,
                transition: 'color 0.15s',
                position: 'relative',
                padding: '6px 0',
              }}
            >
              {active && (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 28,
                  height: 3,
                  background: 'var(--green)',
                  borderRadius: '0 0 4px 4px',
                }} />
              )}
              <Icon
                size={22}
                strokeWidth={active ? 2.5 : 1.8}
              />
              {label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

export default App;