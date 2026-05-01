export function PageError({ message, onRetry }: { message?: string; onRetry?: () => void }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '50vh',
      padding: 24,
      textAlign: 'center',
      gap: 10,
    }}>
      <div style={{ fontSize: 40 }}>😕</div>
      <div style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: 16, color: '#1a2e1a' }}>
        Não foi possível carregar
      </div>
      <div style={{ fontSize: 13, color: '#6a8a6a', maxWidth: 260 }}>
        {message || 'Verifique sua conexão e tente novamente.'}
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            marginTop: 6,
            padding: '9px 20px',
            borderRadius: 12,
            border: 'none',
            background: '#e8f4e8',
            color: '#1a3a1a',
            fontFamily: 'Nunito',
            fontWeight: 800,
            fontSize: 13,
            cursor: 'pointer',
            boxShadow: '0 3px 0 #c8e0c8',
          }}
        >
          Tentar novamente
        </button>
      )}
    </div>
  );
}