import React, { useState, useEffect } from "react";
import { Endpoints } from "../endponts/endponts";
import config from "../../../../config";

const Avisos = () => {
  const [ultimoAviso, setUltimoAviso] = useState<string>("");

  const fetchUltimoAviso = async () => {
    try {
      const response = await Endpoints.buscarUltimo().then((response) => response);
      setUltimoAviso(response.conteudo || "");
    } catch (error) {
      console.error("Erro ao buscar último aviso:", error);
    }
  };

  useEffect(() => {
    fetchUltimoAviso();

    const intervalId = setInterval(() => {
      fetchUltimoAviso();
    }, config.FetchIntervalAvisos * 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <div dangerouslySetInnerHTML={{ __html: ultimoAviso }} />
    </div>
  );
};

export default Avisos;
