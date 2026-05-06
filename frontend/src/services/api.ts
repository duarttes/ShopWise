const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3333';

function getToken(): string | null {
  return localStorage.getItem('token');
}

export function saveToken(token: string): void {
  localStorage.setItem('token', token);
}

export function getStoredUserId(): string | null {
  return localStorage.getItem('userId');
}

export function saveUserId(userId: string): void {
  localStorage.setItem('userId', userId);
}

function authHeaders(): HeadersInit {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function apiFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const response = await fetch(url, {
    ...options,
    headers: {
      'ngrok-skip-browser-warning': 'true',
      ...authHeaders(),
      ...(options.headers ?? {}),
    },
  });

  if (response.status === 401) {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    window.location.reload();
  }

  return response;
}

export async function login(email: string, password: string) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || 'Erro no login');
  }

  const data = await response.json();
  saveToken(data.data.token);
  saveUserId(data.data.user.id);
  return data;
}

export async function previewNfce(url: string) {
  const userId = getStoredUserId();
  if (!userId) throw new Error('Usuário não autenticado.');

  const response = await apiFetch(`${API_URL}/qr-codes/preview-sp-receipt-import`, {
    method: 'POST',
    body: JSON.stringify({ userId, url }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || 'Erro ao buscar prévia da nota');
  }

  return response.json();
}

export async function importNfce(url: string) {
  const userId = getStoredUserId();
  if (!userId) throw new Error('Usuário não autenticado.');

  const response = await apiFetch(`${API_URL}/qr-codes/import-sp-receipt`, {
    method: 'POST',
    body: JSON.stringify({ userId, url }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || 'Erro ao importar nota');
  }

  return response.json();
}

export async function getHomeInsights(userId: string) {
  const response = await apiFetch(`${API_URL}/analytics/users/${userId}/home-insights`);

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || 'Erro ao buscar insights');
  }

  return response.json();
}

export async function getShoppingLists(userId: string) {
  const response = await apiFetch(`${API_URL}/users/${userId}/shopping-lists`);
  if (!response.ok) throw new Error('Erro ao buscar listas');
  return response.json();
}

export async function createShoppingList(userId: string, name: string) {
  const response = await apiFetch(`${API_URL}/shopping-lists`, {
    method: 'POST',
    body: JSON.stringify({ userId, name }),
  });
  if (!response.ok) throw new Error('Erro ao criar lista');
  return response.json();
}

export async function addShoppingListItem(listId: string, name: string, quantity?: number) {
  const response = await apiFetch(`${API_URL}/shopping-lists/${listId}/items`, {
    method: 'POST',
    body: JSON.stringify({ name, quantity }),
  });
  if (!response.ok) throw new Error('Erro ao adicionar item');
  return response.json();
}

export async function removeShoppingListItem(listId: string, itemId: string) {
  const response = await apiFetch(`${API_URL}/shopping-lists/${listId}/items/${itemId}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Erro ao remover item');
  return response.json();
}

export async function getRecommendation(listId: string) {
  const response = await apiFetch(
    `${API_URL}/shopping-lists/${listId}/multi-market-recommendation`
  );
  if (!response.ok) throw new Error('Erro ao buscar recomendação');
  return response.json();
}

export async function updateLocation(latitude: number, longitude: number) {
  const response = await apiFetch(`${API_URL}/users/me/location`, {
    method: 'PATCH',
    body: JSON.stringify({ homeLatitude: latitude, homeLongitude: longitude }),
  });
  if (!response.ok) throw new Error('Erro ao salvar localização');
  return response.json();
}

export async function getRecentReceipts(userId: string) {
  const response = await apiFetch(
    `${API_URL}/analytics/users/${userId}/recent-receipts`
  );
  if (!response.ok) throw new Error('Erro ao buscar notas');
  return response.json();
}

export async function getMarkets() {
  const response = await apiFetch(`${API_URL}/markets`);
  if (!response.ok) throw new Error('Erro ao buscar mercados');
  return response.json();
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  window.location.reload();
}

export async function register(name: string, email: string, password: string) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw new Error(data?.message || 'Erro ao criar conta');
  }

  return response.json();
}

export async function getMe() {
  const response = await apiFetch(`${API_URL}/users/me`);
  if (!response.ok) throw new Error('Erro ao buscar perfil');
  return response.json();
}

export async function getMonthlySpending(userId: string) {
  const response = await apiFetch(`${API_URL}/analytics/users/${userId}/monthly-spending`);
  if (!response.ok) throw new Error('Erro ao buscar gastos mensais');
  return response.json();
}

export async function getSpendingByMarket(userId: string) {
  const response = await apiFetch(`${API_URL}/analytics/users/${userId}/spending-by-market`);
  if (!response.ok) throw new Error('Erro ao buscar gastos por mercado');
  return response.json();
}

export async function getMostExpensiveProducts(userId: string) {
  const response = await apiFetch(`${API_URL}/analytics/users/${userId}/most-expensive-products`);
  if (!response.ok) throw new Error('Erro ao buscar produtos');
  return response.json();
}

export async function updateMarketDisplayName(marketId: string, displayName: string) {
  const response = await apiFetch(`${API_URL}/markets/${marketId}/display-name`, {
    method: 'PATCH',
    body: JSON.stringify({ displayName }),
  });
  if (!response.ok) throw new Error('Erro ao atualizar nome do mercado');
  return response.json();
}

export async function forgotPassword(email: string) {
  const response = await fetch(`${API_URL}/auth/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  if (!response.ok) throw new Error('Erro ao solicitar redefinição');
  return response.json();
}

export async function resetPassword(token: string, password: string) {
  const response = await fetch(`${API_URL}/auth/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, password }),
  });
  if (!response.ok) throw new Error('Token inválido ou expirado');
  return response.json();
}

export async function getProductPriceHistory(productId: string) {
  const response = await apiFetch(`${API_URL}/products/${productId}/price-history`);
  if (!response.ok) throw new Error('Erro ao buscar histórico');
  return response.json();
}

export async function getProductMarketComparison(productId: string) {
  const response = await apiFetch(`${API_URL}/products/${productId}/market-comparison`);
  if (!response.ok) throw new Error('Erro ao buscar comparação');
  return response.json();
}

export async function getReceipts(page = 1, limit = 20) {
  const response = await apiFetch(`${API_URL}/receipts?page=${page}&limit=${limit}`);
  if (!response.ok) throw new Error('Erro ao buscar notas');
  return response.json();
}

export async function getReceiptById(id: string) {
  const response = await apiFetch(`${API_URL}/receipts/${id}`);
  if (!response.ok) throw new Error('Erro ao buscar nota');
  return response.json();
}