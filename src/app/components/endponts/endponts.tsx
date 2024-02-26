// AvisosController.tsx
import config from '../../../../config.js';

export const AvisosController = {
  listar: async () => {
    const response = await fetch(`${config.apiLocalUrl}/Avisos/`);
    return await response.json();
  },
  buscarUltimo: async () => {
    const response = await fetch(`${config.apiLocalUrl}/Avisos/ultimo`);
    return await response.json();
  },
 
  };

// Exemplo de uso
//AvisosController.listar().then((avisos) => console.log(avisos));
