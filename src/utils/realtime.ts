import supabase from "../config/supabase";
import logger from "./logger";

export const subscribeToRealtime = () => {
  const channel = supabase
    .channel("pedidos_pendentes")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "pedidos" },
      (payload) => {
        logger.info(`Novo pedido recebido: ${JSON.stringify(payload.new)}`);
      }
    )
    .subscribe((status) => {
      if (status === "SUBSCRIBED") {
        logger.info("Conectado ao canal de pedidos pendentes.");
      } else if (status === "CLOSED") {
        logger.warn("Conexão com canal encerrada. Tentando reconectar...");
        subscribeToRealtime();
      }
    });

  supabase
    .channel("pedidos_prontos")
    .on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "pedidos",
        filter: "status=eq.pronto",
      },
      (payload) => {
        logger.info(`Pedido pronto para entrega: ${payload.new.id}`);
      }
    )
    .subscribe();
};
