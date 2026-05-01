import { useEffect } from 'react';
import { Warning, CheckCircle, X } from '@phosphor-icons/react';

interface ToastProps {
  message: string;
  type?: 'error' | 'success' | 'warning';
  onClose: () => void;
  duration?: number;
}

export function Toast({ message, type = 'error', onClose, duration = 4000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, []);

  const colors = {
    error: { bg: 'rgba(224,80,80,0.15)', border: 'rgba(224,80,80,0.30)', text: '#ff8080', icon: <Warning size={18} weight="duotone" /> },
    success: { bg: 'rgba(74,180,110,0.15)', border: 'rgba(74,180,110,0.30)', text: '#4ab46e', icon: <CheckCircle size={18} weight="duotone" /> },
    warning: { bg: 'rgba(200,152,74,0.15)', border: 'rgba(200,152,74,0.30)', text: '#c8984a', icon: <Warning size={18} weight="duotone" /> },
  };

  const c = colors[type];

  return (
    <div style={{
      position: 'fixed',
      top: 72,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 'calc(100% - 32px)',
      maxWidth: 440,
      zIndex: 600,
      background: c.bg,
      border: `1px solid ${c.border}`,
      borderRadius: 14,
      padding: '12px 14px',
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      backdropFilter: 'blur(12px)',
      boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
      animation: 'slideDown 0.2s ease',
    }}>
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateX(-50%) translateY(-10px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
      <span style={{ color: c.text, flexShrink: 0 }}>{c.icon}</span>
      <span style={{ flex: 1, fontSize: 13, color: c.text, fontFamily: 'Nunito Sans', fontWeight: 500, lineHeight: 1.4 }}>
        {message}
      </span>
      <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: c.text, padding: 2, flexShrink: 0 }}>
        <X size={14} weight="bold" />
      </button>
    </div>
  );
}