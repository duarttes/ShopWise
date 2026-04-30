import { useState } from 'react';
import { ScanPage } from './pages/ScanPage';
import { HomePage } from './pages/HomePage';
import { getStoredUserId } from './services/api';

function App() {
  const [tab, setTab] = useState<'home' | 'scan'>('home');
  const userId = getStoredUserId();

  if (!userId) return <ScanPage />;

  return (
    <div>
      <div className="max-w-xl mx-auto">
        {tab === 'home' ? <HomePage /> : <ScanPage />}
      </div>

      <nav className="fixed bottom-0 left-0 right-0 border-t bg-white flex">
        <button
          onClick={() => setTab('home')}
          className={`flex-1 p-4 text-sm ${tab === 'home' ? 'font-bold' : 'text-gray-500'}`}
        >
          Início
        </button>
        <button
          onClick={() => setTab('scan')}
          className={`flex-1 p-4 text-sm ${tab === 'scan' ? 'font-bold' : 'text-gray-500'}`}
        >
          Importar nota
        </button>
      </nav>
    </div>
  );
}

export default App;