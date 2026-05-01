export function PageLoading({ label = 'Carregando...' }: { label?: string }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '50vh',
      gap: 12,
      color: '#6a8a6a',
    }}>
      <div style={{
        width: 36,
        height: 36,
        borderRadius: '50%',
        border: '3px solid #c8e0c8',
        borderTopColor: '#4a9a5a',
        animation: 'spin 0.7s linear infinite',
      }} />
      <div style={{ fontFamily: 'Nunito', fontWeight: 600, fontSize: 14 }}>{label}</div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}