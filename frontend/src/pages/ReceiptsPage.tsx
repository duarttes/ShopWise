import { useEffect, useState } from 'react';
import { getRecentReceipts, getStoredUserId } from '../services/api';

export function ReceiptsPage() {
  const userId = getStoredUserId()!;
  const [receipts, setReceipts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getRecentReceipts(userId)
      .then((res) => setReceipts(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) return <div className="p-4">Carregando...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4 pb-20">
      <h2 className="text-xl font-bold">Minhas notas</h2>

      {receipts.length === 0 && (
        <div className="text-gray-500 text-sm">Nenhuma nota importada ainda.</div>
      )}

      {receipts.map((receipt: any) => (
        <div key={receipt.id} className="border rounded-xl p-4 space-y-2">
          <div className="flex justify-between items-start">
            <div>
              <div className="font-bold">{receipt.market?.displayName ?? receipt.market?.name}</div>
              <div className="text-xs text-gray-500">{receipt.market?.city} · {receipt.market?.state}</div>
            </div>
            <div className="font-bold text-green-600">
              R$ {Number(receipt.totalAmount).toFixed(2)}
            </div>
          </div>

          <div className="text-xs text-gray-500">
            {new Date(receipt.purchasedAt).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })}
            {' · '}
            {receipt.items?.length ?? 0} itens
          </div>

          {receipt.items?.length > 0 && (
            <div className="space-y-1 pt-1">
              {receipt.items.slice(0, 3).map((item: any) => (
                <div key={item.id} className="flex justify-between text-sm text-gray-600">
                  <span>{item.nameRaw}</span>
                  <span>R$ {Number(item.totalPrice).toFixed(2)}</span>
                </div>
              ))}
              {receipt.items.length > 3 && (
                <div className="text-xs text-gray-400">
                  +{receipt.items.length - 3} itens
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}