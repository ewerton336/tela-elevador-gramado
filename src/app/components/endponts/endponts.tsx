
const API_BASE_URL = '/api/avisos';

export const Endpoints = {
  listar: async () => {
    const response = await fetch(`${API_BASE_URL}/Avisos`);
    return await response.json();
  },
  buscarUltimo: async () => {
    const response = await fetch(`${API_BASE_URL}/Avisos/ultimo`);
    return await response.json();
  },
  async salvarAviso(conteudo: string) {
    const response = await fetch(`${API_BASE_URL}/Avisos/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ conteudo }),
    });
    return await response.json();
  }
};