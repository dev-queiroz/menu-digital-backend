import supabase from "../config/supabase";
import { Pedido } from "../models/pedidoModel";
import { Produto } from "../models/produtoModel";
import { Usuario } from "../models/usuarioModel";

export const criarPedido = async (
  sessaoId: string,
  produtos: Produto[],
  usuario: Usuario
): Promise<Pedido> => {
  // Verificar se a sessão existe e está ativa
  const { data: sessao, error: sessaoError } = await supabase
    .from("sessoes")
    .select("status")
    .eq("id", sessaoId)
    .single();

  if (sessaoError)
    throw new Error("Erro ao verificar a sessão: " + sessaoError.message);
  if (!sessao || sessao.status !== "ativa") throw new Error("Sessão não ativa");

  // Criar o pedido
  const { data: pedido, error: pedidoError } = await supabase
    .from("pedidos")
    .insert({
      sessao_id: sessaoId,
      produtos: produtos,
      status: "pendente",
      data_criacao: new Date().toISOString(),
    })
    .single();

  if (pedidoError)
    throw new Error("Erro ao criar pedido: " + pedidoError.message);

  // Notificar o garçom via Realtime (canal de pedidos pendentes)
  const pedidoPendenteChannel = supabase
    .channel("pedidos_pendentes")
    .on("broadcast", { event: "novo_pedido" }, (payload) => {
      console.log("Novo pedido recebido:", payload);
    });

  pedidoPendenteChannel.send({
    type: "broadcast",
    event: "novo_pedido",
    payload: { sessaoId, usuario },
  });

  return pedido;
};

// Função para alterar o status do pedido
export const alterarStatusPedido = async (
  pedidoId: string,
  status: "aprovado" | "pronto" | "entregue",
  usuario: Usuario
): Promise<Pedido> => {
  // Verificar se o usuário tem permissão para alterar o status
  if (
    status === "aprovado" &&
    usuario.tipo !== "garcom" &&
    usuario.tipo !== "admin"
  ) {
    throw new Error("Somente o garçom pode aprovar o pedido");
  }

  if (status === "pronto" && usuario.tipo !== "chef") {
    throw new Error("Somente o chef pode marcar o pedido como pronto");
  }

  if (
    status === "entregue" &&
    usuario.tipo !== "garcom" &&
    usuario.tipo !== "admin"
  ) {
    throw new Error("Somente o garçom pode entregar o pedido");
  }

  // Alterar o status do pedido
  const { data: pedido, error: pedidoError } = await supabase
    .from("pedidos")
    .update({ status })
    .eq("id", pedidoId)
    .single();

  if (pedidoError)
    throw new Error(
      "Erro ao atualizar status do pedido: " + pedidoError.message
    );

  // Notificar via Realtime
  const pedidoStatusChannel = supabase
    .channel(`pedidos_${status}`)
    .on("broadcast", { event: "status_atualizado" }, (payload) => {
      console.log("Status atualizado para pedido:", payload);
    });

  pedidoStatusChannel.send({
    type: "broadcast",
    event: "status_atualizado",
    payload: { pedidoId, status },
  });

  return pedido;
};
