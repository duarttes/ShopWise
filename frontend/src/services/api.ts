const API_URL = 'http://localhost:3333';

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

  const response = await fetch(`${API_URL}/qr-codes/preview-sp-receipt-import`, {
    method: 'POST',
    headers: authHeaders(),
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

  const response = await fetch(`${API_URL}/qr-codes/import-sp-receipt`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ userId, url }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || 'Erro ao importar nota');
  }

  return response.json();
}

export async function getHomeInsights(userId: string) {
  const response = await fetch(`${API_URL}/analytics/users/${userId}/home-insights`, {
    headers: authHeaders(),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || 'Erro ao buscar insights');
  }

  return response.json();
}

export async function getShoppingLists(userId: string) {
  const response = await fetch(`${API_URL}/users/${userId}/shopping-lists`, {
    headers: authHeaders(),
  });
  if (!response.ok) throw new Error('Erro ao buscar listas');
  return response.json();
}

export async function createShoppingList(userId: string, name: string) {
  const response = await fetch(`${API_URL}/shopping-lists`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ userId, name }),
  });
  if (!response.ok) throw new Error('Erro ao criar lista');
  return response.json();
}

export async function addShoppingListItem(listId: string, name: string, quantity?: number) {
  const response = await fetch(`${API_URL}/shopping-lists/${listId}/items`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ name, quantity }),
  });
  if (!response.ok) throw new Error('Erro ao adicionar item');
  return response.json();
}

export async function removeShoppingListItem(listId: string, itemId: string) {
  const response = await fetch(`${API_URL}/shopping-lists/${listId}/items/${itemId}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  if (!response.ok) throw new Error('Erro ao remover item');
  return response.json();
}

export async function getRecommendation(listId: string) {
  const response = await fetch(
    `${API_URL}/shopping-lists/${listId}/multi-market-recommendation`,
    { headers: authHeaders() }
  );
  if (!response.ok) throw new Error('Erro ao buscar recomendação');
  return response.json();
}