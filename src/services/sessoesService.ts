import supabase from "../config/supabase";
import { Sessao } from "../models/sessaoModel";
import { Usuario } from "../models/usuarioModel";
import { RealtimeChannel } from "@supabase/supabase-js";
import io from "socket.io-client";

// Inicializa o Socket.IO (ajuste a URL conforme o seu ambiente)
const socket = io("http://localhost:3000");

/**
 * Inicia uma sessão para uma mesa.
 * - Verifica se a mesa possui o QRCode ativo (disponível).
 * - Cria a sessão com status "ativa" e desativa o QRCode.
 * - Notifica via Socket.IO que a mesa foi ocupada.
 */
export const iniciarSessao = async (mesaId: string): Promise<Sessao | null> => {
  const { data: mesa, error: mesaError } = await supabase
    .from("mesas")
    .select("qrcode_ativo")
    .eq("id", mesaId)
    .single();

  if (mesaError) {
    throw new Error("Erro ao verificar a mesa: " + mesaError.message);
  }
  if (!mesa.qrcode_ativo) {
    throw new Error("Mesa ocupada");
  }

  // Inicia a sessão
  const { data: sessao, error: sessaoError } = await supabase
    .from("sessoes")
    .insert({ mesa_id: mesaId, status: "ativa" })
    .single();

  if (sessaoError) {
    throw new Error("Erro ao iniciar sessão: " + sessaoError.message);
  }

  // Atualiza a mesa para que o QRCode não esteja mais ativo
  await supabase.from("mesas").update({ qrcode_ativo: false }).eq("id", mesaId);

  // Notifica via Socket.IO que a mesa foi ocupada
  socket.emit("mesa_ocupada", { mesaId });

  return sessao;
};

/**
 * Encerra a sessão de uma mesa.
 * - Valida se a sessão existe e está ativa.
 * - Verifica se o usuário tem permissão (garçom ou admin).
 * - Exclui os pedidos associados à sessão.
 * - Atualiza a sessão para "finalizada" e libera a mesa (QRCode ativo).
 * - Notifica via Socket.IO que a mesa foi liberada.
 */
export const encerrarSessao = async (
  sessaoId: string,
  usuario: Usuario
): Promise<void> => {
  const { data: sessao, error: sessaoError } = await supabase
    .from("sessoes")
    .select("mesa_id, status")
    .eq("id", sessaoId)
    .single();

  if (sessaoError) {
    throw new Error("Erro ao buscar sessão: " + sessaoError.message);
  }
  if (!sessao) {
    throw new Error("Sessão não encontrada");
  }

  // Verifica se a sessão já foi finalizada
  if (sessao.status === "finalizada") {
    throw new Error("Sessão já finalizada");
  }

  // Apenas garçom ou admin podem encerrar a sessão
  if (usuario.tipo !== "admin" && usuario.tipo !== "garcom") {
    throw new Error(
      "Somente administradores ou garçons podem encerrar a sessão"
    );
  }

  // Deleta os pedidos associados à sessão
  await supabase.from("pedidos").delete().eq("sessao_id", sessaoId);

  // Atualiza a sessão para "finalizada"
  await supabase
    .from("sessoes")
    .update({ status: "finalizada" })
    .eq("id", sessaoId);

  // Libera a mesa (QRCode ativo)
  await supabase
    .from("mesas")
    .update({ qrcode_ativo: true })
    .eq("id", sessao.mesa_id);

  // Notifica via Socket.IO que a mesa foi liberada
  socket.emit("mesa_liberada", { mesaId: sessao.mesa_id });
};

/**
 * Configura um canal Realtime para notificar o garçom quando o cliente chama a finalização da mesa.
 * Quando um registro INSERT for detectado na tabela "sessoes" para o sessaoId informado,
 * o callback é executado para emitir uma notificação via Socket.IO.
 *
 * OBS: Essa configuração pode ser realizada apenas uma vez durante a inicialização do sistema.
 */
export const notificarGarcom = (sessaoId: string): RealtimeChannel => {
  const channel = supabase
    .channel("garcom_notify")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "sessoes",
        filter: `id=eq.${sessaoId}`,
      },
      (payload) => {
        console.log("Sessão chamada para o garçom:", payload);
        const mensagem = {
          mesaId: payload.new.mesa_id,
          mensagem: `A mesa ${payload.new.mesa_id} chamou o garçom`,
        };
        // Envia a notificação via Socket.IO para o garçom
        socket.emit("notificacao_garcom", mensagem);
      }
    )
    .subscribe();

  return channel;
};
