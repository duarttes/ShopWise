import { useState } from 'react';
import { Card, Button, SectionLabel } from './ui';
import { updateMarketDisplayName } from '../services/api';
import { PencilSimple, Check } from '@phosphor-icons/react';

export function ReceiptPreviewCard({ preview, onConfirm, loading }: any) {
  const { issuer, totals, payments } = preview?.preview ?? {};
  const alreadyImported = preview?.duplicateCheck?.alreadyImported;
  const marketId = preview?.receipt?.marketId;
  const currentDisplayName = preview?.receipt?.market?.displayName ?? preview?.receipt?.market?.name ?? issuer?.name;

  const [editingName, setEditingName] = useState(false);
  const [displayName, setDisplayName] = useState(currentDisplayName ?? '');
  const [savingName, setSavingName] = useState(false);
  const [nameSaved, setNameSaved] = useState(false);

  async function handleSaveName() {
    if (!marketId || !displayName.trim()) return;
    setSavingName(true);
    try {
      await updateMarketDisplayName(marketId, displayName.trim());
      setNameSaved(true);
      setEditingName(false);
    } catch {} finally {
      setSavingName(false);
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <Card>
        {/* Mercado */}
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 10, color: 'var(--amber)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 6 }}>
            Mercado
          </div>

          {editingName ? (
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                autoFocus
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  borderRadius: 10,
                  border: '1.5px solid var(--border-strong)',
                  background: 'var(--card)',
                  color: 'var(--text)',
                  fontFamily: 'Nunito Sans',
                  fontSize: 14,
                  outline: 'none',
                }}
              />
              <button
                onClick={handleSaveName}
                disabled={savingName}
                style={{
                  padding: '8px 12px',
                  borderRadius: 10,
                  border: 'none',
                  background: 'var(--green)',
                  color: '#fff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Check size={16} weight="bold" />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
              <div>
                <div style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: 16, color: 'var(--text)', lineHeight: 1.3 }}>
                  {nameSaved ? displayName : currentDisplayName}
                </div>
                {!nameSaved && currentDisplayName !== issuer?.name && (
                  <div style={{ fontSize: 11, color: 'var(--text-subtle)', marginTop: 2 }}>
                    nome jurídico: {issuer?.name}
                  </div>
                )}
              </div>
              <button
                onClick={() => setEditingName(true)}
                style={{
                  background: 'var(--insight-bg)',
                  border: '1px solid var(--insight-border)',
                  borderRadius: 8,
                  padding: '5px 8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  color: 'var(--amber)',
                  fontSize: 11,
                  fontFamily: 'Nunito',
                  fontWeight: 700,
                }}
              >
                <PencilSimple size={13} weight="duotone" />
                Renomear
              </button>
            </div>
          )}

          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>{issuer?.address}</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{issuer?.cnpj}</div>
        </div>

        {alreadyImported && (
          <div style={{
            marginBottom: 10,
            padding: '8px 12px',
            background: 'rgba(200,152,74,0.10)',
            borderRadius: 10,
            fontSize: 13,
            color: 'var(--amber)',
            fontFamily: 'Nunito',
            fontWeight: 700,
          }}>
            ⚠️ Essa nota já foi importada anteriormente.
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: 'var(--text-muted)', fontSize: 14 }}>Total</span>
          <span style={{ fontFamily: 'Nunito', fontWeight: 900, fontSize: 24, color: 'var(--green-light)' }}>
            R$ {totals?.amountToPay?.toFixed(2)}
          </span>
        </div>

        {payments?.map((p: any, i: number) => (
          <div key={i} style={{ fontSize: 12, color: 'var(--text-subtle)', textAlign: 'right' }}>
            {p.method}: R$ {p.amount?.toFixed(2)}
          </div>
        ))}
      </Card>

      {preview?.preview?.items?.length > 0 && (
        <div>
          <SectionLabel>Itens ({preview.preview.items.length})</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {preview.preview.items.map((item: any, i: number) => (
              <Card key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: 14, lineHeight: 1.3, color: 'var(--text)' }}>
                      {item.nameRaw}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
                      {item.quantity} {item.unit} × R$ {item.unitPrice?.toFixed(2)}
                    </div>
                    <div style={{ fontSize: 11, marginTop: 4 }}>
                      {item.productResolution?.status === 'matched_existing'
                        ? <span style={{ color: 'var(--green-light)', fontWeight: 700 }}>✓ produto existente</span>
                        : <span style={{ color: 'var(--amber)', fontWeight: 700 }}>+ será criado</span>}
                    </div>
                  </div>
                  <div style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: 15, color: 'var(--text)', whiteSpace: 'nowrap' }}>
                    R$ {item.totalPrice?.toFixed(2)}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {!alreadyImported && (
        <Button onClick={onConfirm} disabled={loading} variant="primary" fullWidth>
          {loading ? 'Importando...' : '✓ Confirmar importação'}
        </Button>
      )}
    </div>
  );
}