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

  return (
    <div>
      <PageHeader title="Listas de compras" />

      <div style={{ padding: '8px 16px', display: 'flex', flexDirection: 'column', gap: 16, paddingBottom: 24 }}>

        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ flex: 1 }}>
            <Input value={newListName} onChange={setNewListName} placeholder="Nome da nova lista..." />
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
                  padding: '8px 16px',
                  borderRadius: 20,
                  border: 'none',
                  fontSize: 13,
                  fontFamily: 'Nunito, sans-serif',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  background: selectedList?.id === list.id ? 'var(--green)' : '#fff',
                  color: selectedList?.id === list.id ? '#fff' : 'var(--text-muted)',
                  boxShadow: selectedList?.id === list.id
                    ? '0 3px 0 var(--green-dark), 0 5px 12px rgba(74,154,90,0.22)'
                    : '0 3px 0 var(--green-muted), 0 4px 10px rgba(80,140,80,0.07)',
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
                              ? <span style={{ color: 'var(--green)', fontWeight: 700 }}>✓ produto vinculado</span>
                              : <span style={{ color: 'var(--text-subtle)' }}>sem produto vinculado</span>
                            }
                          </div>
                        </div>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          style={{
                            background: '#fee2e2',
                            border: 'none',
                            borderRadius: 8,
                            color: '#ef4444',
                            fontSize: 13,
                            fontWeight: 700,
                            padding: '4px 10px',
                            cursor: 'pointer',
                            fontFamily: 'Nunito',
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
              <Button
                onClick={handleGetRecommendation}
                disabled={loadingRec}
                variant="primary"
                fullWidth
              >
                {loadingRec ? 'Calculando...' : '🛒 Ver onde comprar mais barato'}
              </Button>
            )}

            {recError && (
              <div style={{ fontSize: 13, color: '#ef4444', textAlign: 'center', fontFamily: 'Nunito', fontWeight: 700 }}>
                {recError}
              </div>
            )}

            {recommendation?.recommendedPlan && (
              <div>
                <SectionLabel>Plano recomendado</SectionLabel>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {recommendation.recommendedPlan.markets.map((market: any) => (
                    <Card key={market.marketId}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                        <div style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: 15, color: 'var(--text)' }}>
                          {market.marketName}
                        </div>
                        <div style={{ fontFamily: 'Nunito', fontWeight: 900, fontSize: 18, color: 'var(--green)' }}>
                          R$ {market.totalEstimated?.toFixed(2)}
                        </div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        {market.items.map((item: any) => (
                          <div key={item.shoppingListItemId} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--text-muted)' }}>
                            <span>{item.shoppingListItemName}</span>
                            <span style={{ fontWeight: 600 }}>R$ {item.price?.toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </Card>
                  ))}

                  {recommendation.recommendedPlan.missingItemsCount > 0 && (
                    <div style={{ fontSize: 13, color: '#d97706', fontFamily: 'Nunito', fontWeight: 700, textAlign: 'center' }}>
                      ⚠️ {recommendation.recommendedPlan.missingItemsCount} item(s) sem preço disponível
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}