import React from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { Endpoints } from "../endponts/endponts";
import config from "../../../../config";

const Avisos = () => {
  const {
    isLoading,
    error,
    data: ultimoAviso,
  } = useQuery({
    queryKey: ["ultimoAviso"],
    queryFn: () =>
      Endpoints.buscarUltimo().then((response) => response.conteudo || ""),
    refetchInterval: config.FetchIntervalAvisos * 1000,
  });

  if (isLoading) return <div>Carregando Avisos...</div>;

  if (error)
    return <div>Ocorreu um erro ao carregar avisos: {error.message}</div>;

  return (
    <div style={{ textAlign: "center" }}>
      <div dangerouslySetInnerHTML={{ __html: ultimoAviso }} />
    </div>
  );
};

export default Avisos;
