import React, { useState, useEffect } from "react";
import { AvisosController } from "../endponts/endponts";

const Avisos = () => {
  const [ultimoAviso, setUltimoAviso] = useState<string>("");

  useEffect(() => {
    const fetchUltimoAviso = async () => {
      try {
        const response = await AvisosController.buscarUltimo().then((response) => response);
        setUltimoAviso(response.conteudo || "");
      } catch (error) {
        console.error("Erro ao buscar último aviso:", error);
      }
    };

    fetchUltimoAviso();
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <div dangerouslySetInnerHTML={{ __html: ultimoAviso }} />
    </div>
  );
};

export default Avisos;
