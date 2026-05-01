import { useState } from 'react';
import { Card, Button, SectionLabel } from './ui';
import { updateMarketDisplayName } from '../services/api';
import { PencilSimple, Check } from '@phosphor-icons/react';

interface Props {
  preview: any;
  onConfirm: (customMarketName?: string) => void;
  loading: boolean;
  importedMarket?: { id: string; name: string } | null;
}

export function ReceiptPreviewCard({ preview, onConfirm, loading, importedMarket }: Props) {
  const { issuer, totals, payments } = preview?.preview ?? {};
  const alreadyImported = preview?.duplicateCheck?.alreadyImported;

  const [editingName, setEditingName] = useState(false);
  const [customName, setCustomName] = useState('');
  const [nameSaved, setNameSaved] = useState(false);
  const [savingName, setSavingName] = useState(false);

  async function handleSaveNameAfterImport() {
    if (!importedMarket?.id || !customName.trim()) return;
    setSavingName(true);
    try {
      await updateMarketDisplayName(importedMarket.id, customName.trim());
      setNameSaved(true);
      setEditingName(false);
    } catch {} finally {
      setSavingName(false);
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <Card>
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 10, color: 'var(--amber)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 6 }}>
            Mercado
          </div>

          {!editingName ? (
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: 15, color: 'var(--text)', lineHeight: 1.3 }}>
                  {nameSaved && customName ? customName : customName || issuer?.name}
                </div>
                {customName && !nameSaved && (
                  <div style={{ fontSize: 11, color: 'var(--text-subtle)', marginTop: 1 }}>
                    original: {issuer?.name}
                  </div>
                )}
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{issuer?.cnpj}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{issuer?.address}</div>
              </div>
              <button
                onClick={() => { setCustomName(customName || issuer?.name || ''); setEditingName(true); }}
                style={{
                  background: 'var(--insight-bg)', border: '1px solid var(--insight-border)',
                  borderRadius: 8, padding: '5px 10px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 4,
                  color: 'var(--amber)', fontSize: 11, fontFamily: 'Nunito', fontWeight: 700,
                  whiteSpace: 'nowrap', flexShrink: 0,
                }}
              >
                <PencilSimple size={13} weight="duotone" />
                Renomear
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <input
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                autoFocus
                placeholder="Nome do mercado..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    if (importedMarket) handleSaveNameAfterImport();
                    else setEditingName(false);
                  }
                  if (e.key === 'Escape') setEditingName(false);
                }}
                style={{
                  flex: 1, padding: '8px 12px', borderRadius: 10,
                  border: '1.5px solid var(--border-strong)',
                  background: 'var(--card)', color: 'var(--text)',
                  fontFamily: 'Nunito Sans', fontSize: 14, outline: 'none',
                }}
              />
              <button
                onClick={() => {
                  if (importedMarket) handleSaveNameAfterImport();
                  else setEditingName(false);
                }}
                disabled={savingName}
                style={{
                  padding: '8px 12px', borderRadius: 10, border: 'none',
                  background: 'var(--green)', color: '#fff',
                  cursor: 'pointer', display: 'flex', alignItems: 'center',
                }}
              >
                <Check size={16} weight="bold" />
              </button>
            </div>
          )}

          {nameSaved && (
            <div style={{ fontSize: 11, color: 'var(--green-light)', marginTop: 4, fontWeight: 700 }}>
              ✓ Nome atualizado!
            </div>
          )}
        </div>

        {alreadyImported && (
          <div style={{
            marginBottom: 10, padding: '8px 12px',
            background: 'rgba(200,152,74,0.10)', borderRadius: 10,
            fontSize: 13, color: 'var(--amber)', fontFamily: 'Nunito', fontWeight: 700,
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

      {!alreadyImported && !importedMarket && (
        <Button onClick={() => onConfirm(customName || undefined)} disabled={loading} variant="primary" fullWidth>
          {loading ? 'Importando...' : '✓ Confirmar importação'}
        </Button>
      )}

      {importedMarket && !alreadyImported && (
        <div style={{
          padding: '12px 16px',
          background: 'rgba(74,180,110,0.10)',
          border: '1px solid rgba(74,180,110,0.20)',
          borderRadius: 14, textAlign: 'center',
          fontFamily: 'Nunito', fontWeight: 700,
          color: 'var(--green-light)', fontSize: 14,
        }}>
          ✓ Nota importada com sucesso!
        </div>
      )}
    </div>
  );
}