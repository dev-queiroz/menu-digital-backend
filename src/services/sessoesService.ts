import supabase from "../config/supabase";
import { Sessao } from "../models/sessaoModel";
import { Usuario } from "../models/usuarioModel";
import { RealtimeChannel } from "@supabase/supabase-js";

// Função para iniciar uma sessão
export const iniciarSessao = async (mesaId: string): Promise<Sessao | null> => {
  const { data: mesa, error: mesaError } = await supabase
    .from("mesas")
    .select("qrcode_ativo")
    .eq("id", mesaId)
    .single();

  if (mesaError)
    throw new Error("Erro ao verificar a mesa: " + mesaError.message);
  if (!mesa.qrcode_ativo) throw new Error("Mesa ocupada");

  // Iniciar a sessão
  const { data: sessao, error: sessaoError } = await supabase
    .from("sessoes")
    .insert({ mesa_id: mesaId, status: "ativa" })
    .single();

  if (sessaoError)
    throw new Error("Erro ao iniciar sessão: " + sessaoError.message);

  // Atualizar mesa para qrcode_ativo = false
  await supabase.from("mesas").update({ qrcode_ativo: false }).eq("id", mesaId);

  return sessao;
};

// Função para encerrar a sessão (apenas se for autorizado)
export const encerrarSessao = async (
  sessaoId: string,
  usuario: Usuario
): Promise<void> => {
  const { data: sessao, error: sessaoError } = await supabase
    .from("sessoes")
    .select("mesa_id, status")
    .eq("id", sessaoId)
    .single();

  if (sessaoError)
    throw new Error("Erro ao buscar sessão: " + sessaoError.message);
  if (!sessao) throw new Error("Sessão não encontrada");

  // Validar se a sessão está ativa ou finalizada
  if (sessao.status === "finalizada") {
    throw new Error("Sessão já finalizada");
  }

  // Permissões para encerrar a sessão (apenas garçom ou administrador)
  if (usuario.tipo !== "admin" && usuario.tipo !== "garcom") {
    throw new Error(
      "Somente administradores ou garçons podem encerrar a sessão"
    );
  }

  // Deletar pedidos associados
  await supabase.from("pedidos").delete().eq("sessao_id", sessaoId);

  // Finalizar a sessão
  await supabase
    .from("sessoes")
    .update({ status: "finalizada" })
    .eq("id", sessaoId);

  // Liberar a mesa
  await supabase
    .from("mesas")
    .update({ qrcode_ativo: true })
    .eq("id", sessao.mesa_id);
};

// Função para notificar que a mesa chamou o garçom (Realtime)
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
        // Aqui, você pode enviar uma notificação real para o garçom ou atualizar o estado do front-end.
      }
    )
    .subscribe();

  return channel;
};
