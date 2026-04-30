export function ReceiptPreviewCard({ preview, onConfirm, loading }: any) {
  const { issuer, totals, payments } = preview?.preview ?? {};
  const alreadyImported = preview?.duplicateCheck?.alreadyImported;

  return (
    <div className="border rounded-xl p-4 space-y-3">
      <div>
        <div className="font-bold text-lg">{issuer?.name}</div>
        <div className="text-sm text-gray-500">{issuer?.address}</div>
        <div className="text-sm text-gray-500">{issuer?.cnpj}</div>
      </div>

      {alreadyImported && (
        <div className="bg-yellow-50 border border-yellow-300 text-yellow-800 rounded-lg p-3 text-sm">
          ⚠️ Essa nota já foi importada anteriormente.
        </div>
      )}

      <div className="font-medium">
        Total: R$ {totals?.amountToPay?.toFixed(2)}
      </div>

      {payments?.map((p: any, i: number) => (
        <div key={i} className="text-sm text-gray-600">
          {p.method}: R$ {p.amount?.toFixed(2)}
        </div>
      ))}

      <div className="space-y-2">
        {preview?.preview?.items?.map((item: any, i: number) => (
          <div key={i} className="border rounded p-2 text-sm">
            <div className="font-medium">{item.nameRaw}</div>
            <div className="text-gray-500">
              {item.quantity} {item.unit} × R$ {item.unitPrice?.toFixed(2)} = R$ {item.totalPrice?.toFixed(2)}
            </div>
            <div className="text-xs mt-1">
              {item.productResolution?.status === 'matched_existing' ? (
                <span className="text-green-600">✓ Produto existente</span>
              ) : (
                <span className="text-blue-600">+ Será criado automaticamente</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {!alreadyImported && (
        <button
          onClick={onConfirm}
          disabled={loading}
          className="w-full bg-green-600 text-white p-2 rounded-xl disabled:opacity-50"
        >
          {loading ? 'Importando...' : 'Confirmar importação'}
        </button>
      )}
    </div>
  );
}