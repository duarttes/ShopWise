const API_URL = 'http://localhost:3333';

export async function importNfce(payload: any) {
  const response = await fetch(`${API_URL}/receipts/import-from-nfce`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || 'Erro na API');
  }

  return response.json();
}