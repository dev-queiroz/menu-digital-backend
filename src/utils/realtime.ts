import supabase from "../config/supabase";
import logger from "./logger";

export const subscribeToRealtime = () => {
  supabase
    .channel("pedidos_pendentes")
    .on("postgres_changes", { event: "INSERT", schema: "public", table: "pedidos" }, (payload) => {
      logger.info(`Novo pedido recebido: ${JSON.stringify(payload.new)}`);
    })
    .subscribe();

  supabase
    .channel("pedidos_prontos")
    .on("postgres_changes", { event: "UPDATE", schema: "public", table: "pedidos", filter: "status=eq.pronto" }, (payload) => {
      logger.info(`Pedido pronto para entrega: ${payload.new.id}`);
    })
    .subscribe();
};
