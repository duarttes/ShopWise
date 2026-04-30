import { useEffect, useState } from 'react';
import {
  getShoppingLists,
  createShoppingList,
  addShoppingListItem,
  removeShoppingListItem,
  getStoredUserId,
} from '../services/api';

export function ShoppingListsPage() {
  const userId = getStoredUserId()!;
  const [lists, setLists] = useState<any[]>([]);
  const [selectedList, setSelectedList] = useState<any>(null);
  const [newListName, setNewListName] = useState('');
  const [newItemName, setNewItemName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLists();
  }, []);

  async function fetchLists() {
    setLoading(true);
    try {
      const res = await getShoppingLists(userId);
      setLists(res.data);
      if (res.data.length > 0) setSelectedList(res.data[0]);
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
  }

  async function handleAddItem() {
    if (!newItemName.trim() || !selectedList) return;
    await addShoppingListItem(selectedList.id, newItemName.trim());
    setNewItemName('');
    const res = await getShoppingLists(userId);
    setLists(res.data);
    setSelectedList(res.data.find((l: any) => l.id === selectedList.id));
  }

  async function handleRemoveItem(itemId: string) {
    if (!selectedList) return;
    await removeShoppingListItem(selectedList.id, itemId);
    const res = await getShoppingLists(userId);
    setLists(res.data);
    setSelectedList(res.data.find((l: any) => l.id === selectedList.id));
  }

  if (loading) return <div className="p-4">Carregando...</div>;

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4 pb-20">
      <h2 className="text-xl font-bold">Listas de compras</h2>

      <div className="flex gap-2">
        <input
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
          placeholder="Nova lista..."
          className="flex-1 border rounded-xl p-2 text-sm"
        />
        <button
          onClick={handleCreateList}
          className="bg-black text-white px-4 rounded-xl text-sm"
        >
          Criar
        </button>
      </div>

      {lists.length === 0 && (
        <div className="text-gray-500 text-sm">Nenhuma lista criada ainda.</div>
      )}

      <div className="flex gap-2 overflow-x-auto">
        {lists.map((list) => (
          <button
            key={list.id}
            onClick={() => setSelectedList(list)}
            className={`px-3 py-1 rounded-full text-sm whitespace-nowrap border ${
              selectedList?.id === list.id ? 'bg-black text-white' : 'text-gray-600'
            }`}
          >
            {list.name}
          </button>
        ))}
      </div>

      {selectedList && (
        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              placeholder="Adicionar item..."
              className="flex-1 border rounded-xl p-2 text-sm"
              onKeyDown={(e) => e.key === 'Enter' && handleAddItem()}
            />
            <button
              onClick={handleAddItem}
              className="bg-black text-white px-4 rounded-xl text-sm"
            >
              +
            </button>
          </div>

          <div className="space-y-2">
            {selectedList.items?.length === 0 && (
              <div className="text-gray-500 text-sm">Lista vazia.</div>
            )}
            {selectedList.items?.map((item: any) => (
              <div key={item.id} className="flex items-center justify-between border rounded-xl p-3">
                <div>
                  <div className="text-sm font-medium">{item.name}</div>
                  {item.product && (
                    <div className="text-xs text-gray-500">{item.product.normalizedName}</div>
                  )}
                </div>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-red-500 text-sm px-2"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}