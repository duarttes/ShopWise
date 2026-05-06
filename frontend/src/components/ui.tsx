import React from 'react';

export function Card({
  children,
  className,
  style,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={className}
      style={{
        background: 'var(--card)',
        borderRadius: 16,
        padding: '14px 16px',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow-card)',
        ...style,
      }}
    >
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
    letterSpacing: '0.1px',
    transition: 'opacity 0.15s, transform 0.1s',
  };

  const variants: Record<string, React.CSSProperties> = {
    primary: {
      background: 'var(--green)',
      color: '#fff',
      boxShadow: 'var(--shadow-btn)',
    },
    secondary: {
      background: 'var(--insight-bg)',
      color: 'var(--green)',
      border: '1px solid var(--insight-border)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-muted)',
      border: '1px solid var(--border)',
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
        border: '1.5px solid var(--border-strong)',
        fontFamily: 'Nunito Sans, sans-serif',
        fontSize: 15,
        background: 'var(--card)',
        color: 'var(--text)',
        outline: 'none',
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
      color: 'var(--amber)',
      textTransform: 'uppercase',
      letterSpacing: '0.8px',
      marginBottom: 8,
      paddingLeft: 2,
    }}>
      {children}
    </div>
  );
}

export function InsightCard({ label, value, children, onClick, style }: {
  label: string;
  value: string;
  children?: React.ReactNode;
  onClick?: () => void;
  style?: React.CSSProperties;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        background: 'var(--insight-bg)',
        border: '1px solid var(--insight-border)',
        borderRadius: 16,
        padding: '14px 16px',
        ...style,
      }}
    >
      <div style={{ fontSize: 10, color: 'var(--amber)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 4 }}>
        {label}
      </div>
      <div style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: 18, color: 'var(--text)' }}>
        {value}
      </div>
      {children}
    </div>
  );
}

export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      background: 'rgba(45,122,74,0.12)',
      border: '1px solid rgba(45,122,74,0.25)',
      borderRadius: 20,
      padding: '3px 8px',
      fontSize: 10,
      fontWeight: 700,
      color: 'var(--green-light)',
      fontFamily: 'Nunito',
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