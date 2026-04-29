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

async function authHeaders(): Promise<HeadersInit> {
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

export async function importNfce(payload: {
  rawText?: string;
  url?: string;
  accessKey?: string;
  confirmImport?: boolean;
}) {
  const userId = getStoredUserId();

  if (!userId) {
    throw new Error('Usuário não autenticado.');
  }

  const response = await fetch(`${API_URL}/receipts/import-from-nfce`, {
    method: 'POST',
    headers: await authHeaders(),
    body: JSON.stringify({ ...payload, userId }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || 'Erro na API');
  }

  return response.json();
}