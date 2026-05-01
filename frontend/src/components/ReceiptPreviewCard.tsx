import { Card, Button, SectionLabel } from './ui';

export function ReceiptPreviewCard({ preview, onConfirm, loading }: any) {
  const { issuer, totals, payments } = preview?.preview ?? {};
  const alreadyImported = preview?.duplicateCheck?.alreadyImported;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <Card>
        <div style={{ fontFamily: 'Nunito', fontWeight: 900, fontSize: 17, marginBottom: 2, color: 'var(--text)' }}>
          {issuer?.name}
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{issuer?.address}</div>
        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{issuer?.cnpj}</div>

        {alreadyImported && (
          <div style={{
            marginTop: 10,
            padding: '8px 12px',
            background: '#fef9c3',
            borderRadius: 10,
            fontSize: 13,
            color: '#854d0e',
            fontFamily: 'Nunito',
            fontWeight: 700,
          }}>
            ⚠️ Essa nota já foi importada anteriormente.
          </div>
        )}

        <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: 'var(--text-muted)', fontSize: 14 }}>Total</span>
          <span style={{ fontFamily: 'Nunito', fontWeight: 900, fontSize: 24, color: 'var(--green)' }}>
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
                        ? <span style={{ color: 'var(--green)', fontWeight: 700 }}>✓ produto existente</span>
                        : <span style={{ color: '#2563eb', fontWeight: 700 }}>+ será criado</span>
                      }
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