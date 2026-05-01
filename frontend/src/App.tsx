import { useState } from 'react';
import { ScanPage } from './pages/ScanPage';
import { HomePage } from './pages/HomePage';
import { ShoppingListsPage } from './pages/ShoppingListsPage';
import { ReceiptsPage } from './pages/ReceiptsPage';
import { getStoredUserId } from './services/api';

const tabs = [
  { id: 'home', label: 'Início', icon: '🏠' },
  { id: 'receipts', label: 'Notas', icon: '🧾' },
  { id: 'scan', label: 'Escanear', icon: '📷' },
  { id: 'lists', label: 'Listas', icon: '🛒' },
];

function App() {
  const [tab, setTab] = useState<'home' | 'receipts' | 'scan' | 'lists'>('home');
  const userId = getStoredUserId();

  if (!userId) return <ScanPage />;

  return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', background: 'var(--surface)' }}>
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 'var(--nav-height)' }}>
        {tab === 'home' && <HomePage />}
        {tab === 'receipts' && <ReceiptsPage />}
        {tab === 'scan' && <ScanPage />}
        {tab === 'lists' && <ShoppingListsPage />}
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
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id as any)}
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
              color: tab === t.id ? 'var(--green)' : 'var(--text-subtle)',
              fontSize: 10,
              fontFamily: 'Nunito, sans-serif',
              fontWeight: tab === t.id ? 800 : 600,
              transition: 'color 0.15s',
              position: 'relative',
            }}
          >
            {tab === t.id && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 32,
                height: 3,
                background: 'var(--green)',
                borderRadius: '0 0 4px 4px',
              }} />
            )}
            <span style={{ fontSize: 22 }}>{t.icon}</span>
            {t.label}
          </button>
        ))}
      </nav>
    </div>
  );
}

export default App;