export function ReceiptPreviewCard({ preview, onConfirm, loading }: any) {
  const { issuer, totals, items, payments } = preview?.preview ?? {};

  return (
    <div className="border rounded-xl p-4 space-y-3">
      <div>
        <div className="font-bold text-lg">{issuer?.name}</div>
        <div className="text-sm text-gray-500">{issuer?.address}</div>
        <div className="text-sm text-gray-500">{issuer?.cnpj}</div>
      </div>

      <div className="font-medium">
        Total: R$ {totals?.amountToPay?.toFixed(2)}
      </div>

      {payments?.map((p: any, i: number) => (
        <div key={i} className="text-sm text-gray-600">
          {p.method}: R$ {p.amount?.toFixed(2)}
        </div>
      ))}

      <div className="space-y-2">
        {preview?.receipt?.items?.map((item: any) => (
          <div key={item.id} className="border rounded p-2 text-sm">
            <div>{item.nameRaw}</div>
            <div className="text-gray-500">
              {item.quantity} {item.unit} × R$ {item.unitPrice?.toFixed(2)} = R$ {item.totalPrice?.toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={onConfirm}
        disabled={loading}
        className="w-full bg-green-600 text-white p-2 rounded-xl disabled:opacity-50"
      >
        {loading ? 'Importando...' : 'Confirmar importação'}
      </button>
    </div>
  );
}