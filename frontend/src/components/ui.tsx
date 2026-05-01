import React from 'react';

export function Card({ children, className = '', style = {} }: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div style={{
      background: '#fff',
      borderRadius: 16,
      padding: 14,
      boxShadow: '0 4px 0 #c8e0c8, 0 6px 16px rgba(80,140,80,0.07)',
      ...style,
    }} className={className}>
      {children}
    </div>
  );
}

export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div style={{ padding: '24px 20px 8px' }}>
      <h1 style={{
        fontFamily: 'Nunito, sans-serif',
        fontSize: 26,
        fontWeight: 900,
        margin: 0,
        color: 'var(--text)',
        letterSpacing: '-0.3px',
      }}>{title}</h1>
      {subtitle && (
        <p style={{ margin: '4px 0 0', color: 'var(--text-muted)', fontSize: 13 }}>{subtitle}</p>
      )}
    </div>
  );
}

export function Button({ children, onClick, disabled, variant = 'primary', fullWidth = false }: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost';
  fullWidth?: boolean;
}) {
  const base: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: '13px 20px',
    borderRadius: 14,
    fontFamily: 'Nunito, sans-serif',
    fontSize: 15,
    fontWeight: 800,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    border: 'none',
    width: fullWidth ? '100%' : undefined,
    transition: 'transform 0.1s, opacity 0.15s',
    letterSpacing: '0.1px',
  };

  const variants: Record<string, React.CSSProperties> = {
    primary: {
      background: 'var(--green)',
      color: '#fff',
      boxShadow: '0 4px 0 var(--green-dark), 0 6px 16px rgba(74,154,90,0.22)',
    },
    secondary: {
      background: 'var(--green-light)',
      color: 'var(--green-deep)',
      boxShadow: '0 3px 0 var(--green-muted), 0 5px 12px rgba(80,140,80,0.10)',
    },
    ghost: {
      background: '#fff',
      color: 'var(--text-muted)',
      boxShadow: '0 3px 0 var(--border), 0 4px 10px rgba(0,0,0,0.05)',
    },
  };

  return (
    <button style={{ ...base, ...variants[variant] }} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

export function Input({ value, onChange, placeholder, type = 'text', onKeyDown }: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  onKeyDown?: (e: React.KeyboardEvent) => void;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      onKeyDown={onKeyDown}
      style={{
        width: '100%',
        padding: '13px 16px',
        borderRadius: 14,
        border: '1.5px solid var(--border)',
        fontFamily: 'Nunito Sans, sans-serif',
        fontSize: 15,
        background: '#fff',
        color: 'var(--text)',
        outline: 'none',
        boxShadow: '0 2px 0 var(--green-muted)',
      }}
    />
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontSize: 10,
      fontWeight: 700,
      fontFamily: 'Nunito, sans-serif',
      color: 'var(--text-subtle)',
      textTransform: 'uppercase',
      letterSpacing: '0.8px',
      marginBottom: 8,
      paddingLeft: 2,
    }}>
      {children}
    </div>
  );
}

export function EmptyState({ icon, title, description }: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div style={{ textAlign: 'center', padding: '48px 24px', color: 'var(--text-muted)' }}>
      <div style={{ fontSize: 52, marginBottom: 12 }}>{icon}</div>
      <div style={{
        fontFamily: 'Nunito, sans-serif',
        fontWeight: 800,
        fontSize: 18,
        color: 'var(--text)',
        marginBottom: 6,
      }}>{title}</div>
      <div style={{ fontSize: 14, lineHeight: 1.5 }}>{description}</div>
    </div>
  );
}