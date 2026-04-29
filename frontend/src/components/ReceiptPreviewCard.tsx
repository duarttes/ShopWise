export function ReceiptPreviewCard({
  receipt,
  warnings,
  onConfirm,
  loading,
}: any) {
  return (
    <div className="border rounded-xl p-4 space-y-3">
      <div>
        <strong>{receipt.storeName}</strong>
        <div>Total: R$ {receipt.total}</div>
      </div>

      {warnings?.length > 0 && (
        <div className="text-yellow-600">
          {warnings.map((w: string) => (
            <div key={w}>{w}</div>
          ))}
        </div>
      )}

      {receipt.items.map((item: any, i: number) => (
        <div key={i} className="border p-2 rounded">
          <div>{item.description}</div>
          <div>R$ {item.totalPrice}</div>
        </div>
      ))}

      <button
        onClick={onConfirm}
        className="w-full bg-green-600 text-white p-2 rounded"
      >
        {loading ? 'Importando...' : 'Confirmar'}
      </button>
    </div>
  );
}