// AvisosController.tsx

export const AvisosController = {
  listar: async () => {
    const response = await fetch('http://localhost:5193/Avisos');
    return await response.json();
  },
  buscarUltimo: async () => {
    const response = await fetch('http://localhost:5193/Avisos/ultimo');
    return await response.json();
  },
 
  };

// Exemplo de uso
//AvisosController.listar().then((avisos) => console.log(avisos));
