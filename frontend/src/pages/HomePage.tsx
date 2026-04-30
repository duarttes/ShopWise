import { useEffect, useState } from 'react';
import { getHomeInsights, getStoredUserId } from '../services/api';

export function HomePage() {
  const [insights, setInsights] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const userId = getStoredUserId();

  useEffect(() => {
    if (!userId) return;

    getHomeInsights(userId)
      .then((res) => setInsights(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) return <div className="p-4">Carregando...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!insights) return null;

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <h2 className="text-xl font-bold">Este mês</h2>

      <div className="grid grid-cols-3 gap-3">
        <div className="border rounded-xl p-3 text-center">
          <div className="text-2xl font-bold">R$ {insights.month.totalSpent.toFixed(2)}</div>
          <div className="text-xs text-gray-500">gasto total</div>
        </div>
        <div className="border rounded-xl p-3 text-center">
          <div className="text-2xl font-bold">{insights.month.receiptsCount}</div>
          <div className="text-xs text-gray-500">notas</div>
        </div>
        <div className="border rounded-xl p-3 text-center">
          <div className="text-2xl font-bold">{insights.month.marketsCount}</div>
          <div className="text-xs text-gray-500">mercados</div>
        </div>
      </div>

      {insights.topMarket && (
        <div className="border rounded-xl p-3">
          <div className="text-xs text-gray-500 mb-1">Mercado mais frequente</div>
          <div className="font-bold">{insights.topMarket.name}</div>
          <div className="text-sm text-gray-600">
            {insights.topMarket.visits} visita(s) · R$ {insights.topMarket.totalSpent.toFixed(2)}
          </div>
        </div>
      )}

      {insights.priceHighlights?.lowestRecentPrices?.length > 0 && (
        <div>
          <div className="text-sm font-semibold mb-2">Melhores preços recentes</div>
          <div className="space-y-2">
            {insights.priceHighlights.lowestRecentPrices.slice(0, 3).map((item: any) => (
              <div key={item.productId} className="border rounded-xl p-3 flex justify-between">
                <div>
                  <div className="text-sm font-medium">{item.productName}</div>
                  <div className="text-xs text-gray-500">{item.marketName}</div>
                </div>
                <div className="font-bold text-green-600">R$ {item.price.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}