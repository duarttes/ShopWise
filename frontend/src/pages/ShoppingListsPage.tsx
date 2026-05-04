import { useEffect, useState } from 'react';
import {
  getShoppingLists,
  createShoppingList,
  addShoppingListItem,
  removeShoppingListItem,
  getRecommendation,
  getStoredUserId,
} from '../services/api';
import { Card, Button, Input, PageHeader, SectionLabel, EmptyState } from '../components/ui';
import { PageLoading } from '../components/PageLoading';
import { PageError } from '../components/PageError';
import { Toast } from '../components/Toast';
import { ShoppingCart, Storefront, Clock, Warning } from '@phosphor-icons/react';

function timeAgo(date: string) {
  const now = new Date();
  const then = new Date(date);
  const diffMs = now.getTime() - then.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diffMs / (1000 * 60));

  if (diffMinutes < 60) return `há ${diffMinutes}min`;
  if (diffHours < 24) return `há ${diffHours}h`;
  if (diffDays === 1) return 'ontem';
  if (diffDays < 7) return `há ${diffDays} dias`;
  if (diffDays < 30) return `há ${Math.floor(diffDays / 7)} sem.`;
  return `há ${Math.floor(diffDays / 30)} meses`;
}

function freshnessColor(date: string) {
  const diffDays = Math.floor((new Date().getTime() - new Date(date).getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays <= 3) return 'var(--green-light)';
  if (diffDays <= 7) return 'var(--amber)';
  return '#e05050';
}

export function ShoppingListsPage() {
  const userId = getStoredUserId()!;
  const [lists, setLists] = useState<any[]>([]);
  const [selectedList, setSelectedList] = useState<any>(null);
  const [newListName, setNewListName] = useState('');
  const [newItemName, setNewItemName] = useState('');
  const [loading, setLoading] = useState(true);
  const [recommendation, setRecommendation] = useState<any>(null);
  const [loadingRec, setLoadingRec] = useState(false);
  const [recError, setRecError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => { fetchLists(); }, []);

  async function fetchLists() {
    setLoading(true);
    try {
      const res = await getShoppingLists(userId);
      setLists(res.data);
      if (res.data.length > 0) setSelectedList(res.data[0]);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateList() {
    if (!newListName.trim()) return;
    const res = await createShoppingList(userId, newListName.trim());
    setNewListName('');
    await fetchLists();
    setSelectedList(res.data);
    setRecommendation(null);
  }

  async function handleAddItem() {
    if (!newItemName.trim() || !selectedList) return;
    await addShoppingListItem(selectedList.id, newItemName.trim());
    setNewItemName('');
    setRecommendation(null);
    await refreshSelected();
  }

  async function handleRemoveItem(itemId: string) {
    if (!selectedList) return;
    await removeShoppingListItem(selectedList.id, itemId);
    setRecommendation(null);
    await refreshSelected();
  }

  async function refreshSelected() {
    const res = await getShoppingLists(userId);
    setLists(res.data);
    setSelectedList(res.data.find((l: any) => l.id === selectedList?.id));
  }

  async function handleGetRecommendation() {
    if (!selectedList) return;
    setLoadingRec(true);
    setRecError(null);
    setRecommendation(null);
    try {
      const res = await getRecommendation(selectedList.id);
      setRecommendation(res.data);
    } catch (err: any) {
      setRecError(err.message);
    } finally {
      setLoadingRec(false);
    }
  }

  if (loading) return <PageLoading />;
  if (error) return <PageError message={error} onRetry={() => window.location.reload()} />;

  const bestMarket = recommendation?.cheapestMarket ?? recommendation?.bestValueMarket ?? null;
  const allMarkets = recommendation?.marketBreakdown ?? [];

  return (
    <div>
      {toast && <Toast message={toast} type="success" onClose={() => setToast(null)} />}
      <PageHeader title="Listas de compras" />

      <div style={{ padding: '8px 16px', display: 'flex', flexDirection: 'column', gap: 16, paddingBottom: 24 }}>

        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ flex: 1 }}>
            <Input value={newListName} onChange={setNewListName} placeholder="Nome da nova lista..."
              onKeyDown={(e) => e.key === 'Enter' && handleCreateList()} />
          </div>
          <Button onClick={handleCreateList} variant="primary">Criar</Button>
        </div>

        {lists.length === 0 && (
          <EmptyState icon="🛒" title="Nenhuma lista ainda" description="Crie uma lista para começar a comparar preços entre mercados." />
        )}

        {lists.length > 0 && (
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
            {lists.map((list) => (
              <button
                key={list.id}
                onClick={() => { setSelectedList(list); setRecommendation(null); }}
                style={{
                  padding: '8px 16px', borderRadius: 20, border: '1px solid var(--border)',
                  fontSize: 13, fontFamily: 'Nunito, sans-serif', fontWeight: 700,
                  whiteSpace: 'nowrap', cursor: 'pointer',
                  background: selectedList?.id === list.id ? 'var(--green)' : 'var(--card)',
                  color: selectedList?.id === list.id ? '#fff' : 'var(--text-muted)',
                  boxShadow: selectedList?.id === list.id ? 'var(--shadow-btn)' : 'var(--shadow-card)',
                  transition: 'all 0.15s',
                }}
              >
                {list.name}
              </button>
            ))}
          </div>
        )}

        {selectedList && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{ flex: 1 }}>
                <Input
                  value={newItemName}
                  onChange={setNewItemName}
                  placeholder="Adicionar item..."
                  onKeyDown={(e) => e.key === 'Enter' && handleAddItem()}
                />
              </div>
              <Button onClick={handleAddItem} variant="secondary">+</Button>
            </div>

            {selectedList.items?.length === 0 && (
              <div style={{ textAlign: 'center', padding: '20px 0', color: 'var(--text-subtle)', fontSize: 14, fontFamily: 'Nunito' }}>
                Lista vazia — adicione itens acima
              </div>
            )}

            {selectedList.items?.length > 0 && (
              <div>
                <SectionLabel>Itens ({selectedList.items.length})</SectionLabel>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {selectedList.items.map((item: any) => (
                    <Card key={item.id}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                          <div style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: 14, color: 'var(--text)' }}>
                            {item.name}
                          </div>
                          <div style={{ fontSize: 11, marginTop: 2 }}>
                            {item.product
                              ? <span style={{ color: 'var(--green-light)', fontWeight: 700 }}>✓ produto vinculado</span>
                              : <span style={{ color: 'var(--text-subtle)' }}>sem produto vinculado</span>
                            }
                          </div>
                        </div>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          style={{
                            background: 'rgba(239,68,68,0.1)', border: 'none', borderRadius: 8,
                            color: '#ef4444', fontSize: 13, fontWeight: 700,
                            padding: '4px 10px', cursor: 'pointer', fontFamily: 'Nunito',
                          }}
                        >
                          ✕
                        </button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {selectedList.items?.some((i: any) => i.product) && (
              <Button onClick={handleGetRecommendation} disabled={loadingRec} variant="primary" fullWidth>
                <ShoppingCart size={18} weight="duotone" />
                {loadingRec ? 'Calculando...' : 'Ver onde comprar mais barato'}
              </Button>
            )}

            {recError && <Toast message={recError} type="error" onClose={() => setRecError(null)} />}

            {/* Melhor mercado destaque */}
            {bestMarket && (
              <div>
                <SectionLabel>Melhor opção</SectionLabel>
                <Card style={{ border: '1.5px solid rgba(74,180,110,0.3)', background: 'rgba(74,180,110,0.04)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Storefront size={20} weight="duotone" color="var(--green-light)" />
                      <div>
                        <div style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: 16, color: 'var(--text)' }}>
                          {bestMarket.marketName}
                        </div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                          {bestMarket.matchedItemsCount}/{bestMarket.totalItemsCount} itens disponíveis
                          {bestMarket.distanceKm && ` · ${bestMarket.distanceKm}km`}
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontFamily: 'Nunito', fontWeight: 900, fontSize: 22, color: 'var(--green-light)' }}>
                        R$ {bestMarket.estimatedTotal?.toFixed(2)}
                      </div>
                      {bestMarket.oldestPriceUpdatedAt && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 3, justifyContent: 'flex-end', marginTop: 2 }}>
                          <Clock size={10} color={freshnessColor(bestMarket.oldestPriceUpdatedAt)} />
                          <span style={{ fontSize: 10, color: freshnessColor(bestMarket.oldestPriceUpdatedAt) }}>
                            {timeAgo(bestMarket.oldestPriceUpdatedAt)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {bestMarket.matchedItems.map((item: any) => (
                      <div key={item.shoppingListItemId} style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        padding: '6px 10px', borderRadius: 8,
                        background: 'var(--surface)', border: '1px solid var(--border)',
                      }}>
                        <div style={{ fontSize: 13, color: 'var(--text)', fontFamily: 'Nunito', fontWeight: 600 }}>
                          {item.shoppingListItemName}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          {item.priceUpdatedAt && (
                            <span style={{ fontSize: 10, color: freshnessColor(item.priceUpdatedAt) }}>
                              {timeAgo(item.priceUpdatedAt)}
                            </span>
                          )}
                          <span style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: 14, color: 'var(--text)', whiteSpace: 'nowrap' }}>
                            R$ {item.price?.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {bestMarket.missingItemsCount > 0 && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10, padding: '6px 10px', background: 'rgba(200,152,74,0.08)', borderRadius: 8 }}>
                      <Warning size={14} color="var(--amber)" />
                      <span style={{ fontSize: 12, color: 'var(--amber)', fontFamily: 'Nunito', fontWeight: 700 }}>
                        {bestMarket.missingItemsCount} item(s) sem preço disponível
                      </span>
                    </div>
                  )}
                </Card>
              </div>
            )}

            {/* Outros mercados */}
            {allMarkets.length > 1 && (
              <div>
                <SectionLabel>Outros mercados</SectionLabel>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {allMarkets
                    .filter((m: any) => m.marketId !== bestMarket?.marketId)
                    .map((market: any) => (
                      <Card key={market.marketId}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <div style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: 14, color: 'var(--text)' }}>
                              {market.marketName}
                            </div>
                            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>
                              {market.matchedItemsCount}/{market.totalItemsCount} itens
                              {market.distanceKm && ` · ${market.distanceKm}km`}
                            </div>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: 16, color: 'var(--text)', whiteSpace: 'nowrap' }}>
                              R$ {market.estimatedTotal?.toFixed(2)}
                            </div>
                            {market.oldestPriceUpdatedAt && (
                              <div style={{ display: 'flex', alignItems: 'center', gap: 3, justifyContent: 'flex-end', marginTop: 2 }}>
                                <Clock size={10} color={freshnessColor(market.oldestPriceUpdatedAt)} />
                                <span style={{ fontSize: 10, color: freshnessColor(market.oldestPriceUpdatedAt) }}>
                                  {timeAgo(market.oldestPriceUpdatedAt)}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </Card>
                    ))}
                </div>
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  );
}