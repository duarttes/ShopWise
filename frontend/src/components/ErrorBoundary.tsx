import { Component, type ReactNode} from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  message: string;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '60vh',
          padding: 24,
          textAlign: 'center',
          gap: 12,
        }}>
          <div style={{ fontSize: 48 }}>⚠️</div>
          <div style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: 18, color: '#1a2e1a' }}>
            Algo deu errado
          </div>
          <div style={{ fontSize: 13, color: '#6a8a6a', maxWidth: 280 }}>
            {this.state.message || 'Erro inesperado. Tente recarregar a página.'}
          </div>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: 8,
              padding: '10px 24px',
              borderRadius: 12,
              border: 'none',
              background: '#4a9a5a',
              color: '#fff',
              fontFamily: 'Nunito',
              fontWeight: 800,
              fontSize: 14,
              cursor: 'pointer',
              boxShadow: '0 3px 0 #347a44',
            }}
          >
            Recarregar
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}