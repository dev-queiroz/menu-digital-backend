const supabase = require("../config/db");
const qrcode = require("qrcode");
const jwt = require("jsonwebtoken");

const criarMesa = async (numero, capacidade) => {
  const { data, error } = await supabase
    .from('mesas')
    .insert({ numero, capacidade, disponivel: true });

  if (error) throw error;
  return data[0];
};

const iniciarSessao = async (mesaId) => {
  const mesa = await getMesaById(mesaId);
  if (!mesa) throw new Error("Mesa não encontrada");
  if (mesa.status !== "livre") throw new Error("Mesa já está em uso");

  const sessaoToken = jwt.sign(
    {
      mesaId,
      sessaoTimestamp: Date.now(),
    },
    process.env.JWT_SECRET
  );

  const { data, error } = await supabase
    .from("mesas")
    .update({
      status: "ocupada",
      sessaoAtual: sessaoToken,
      ultimoAcesso: new Date().toISOString(),
    })
    .match({ mesaId });

  if (error) throw error;
  return { sessaoToken, mesa: data[0] };
};

const encerrarSessao = async (mesaId, garcomId) => {
  try {
    // Inicia uma transação para garantir consistência
    const { data: logData, error: logError } = await supabase
      .from("logs_sessoes")
      .insert({
        mesaId,
        garcomId,
        acao: "encerramento",
        timestamp: new Date().toISOString(),
      });

    if (logError) throw logError;

    // Deleta os pedidos não finalizados da mesa
    const { error: deleteError } = await supabase
      .from("pedidos")
      .delete()
      .eq('mesa_id', mesaId)
      .neq('status', 'finalizado');

    if (deleteError) throw deleteError;

    // Atualiza o status da mesa
    const { data, error } = await supabase
      .from("mesas")
      .update({
        status: "livre",
        sessaoAtual: null,
        ultimoGarcomId: garcomId,
        ultimoEncerramento: new Date().toISOString(),
      })
      .match({ mesaId });

    if (error) throw error;
    return data[0];
  } catch (error) {
    throw new Error(`Erro ao encerrar sessão: ${error.message}`);
  }
};

const getMesas = async () => {
  const { data, error } = await supabase.from("mesas").select("*");

  if (error) throw error;
  return data;
};

const getMesaById = async (mesaId) => {
  const { data, error } = await supabase
    .from("mesas")
    .select("*")
    .eq("mesaId", mesaId);
  if (error) throw error;
  return data[0];
};

const atualizarStatusMesa = async (mesaId, status) => {
  const { data, error } = await supabase
    .from("mesas")
    .update({ status })
    .match({ mesaId: mesaId });

  if (error) throw error;
  return data;
};

const deletarMesa = async (mesaId) => {
  const { data, error } = await supabase
    .from("mesas")
    .delete()
    .eq("mesaId", mesaId);
  if (error) throw error;
  return data;
};

const listarMesas = async () => {
  const { data, error } = await supabase
    .from('mesas')
    .select('*')
    .order('numero');

  if (error) throw error;
  return data;
};

const atualizarDisponibilidadeMesa = async (id, disponivel) => {
  const { data, error } = await supabase
    .from('mesas')
    .update({ disponivel })
    .match({ id });

  if (error) throw error;
  return data[0];
};

module.exports = {
  criarMesa,
  getMesas,
  getMesaById,
  atualizarStatusMesa,
  deletarMesa,
  iniciarSessao,
  encerrarSessao,
  listarMesas,
  atualizarDisponibilidadeMesa,
};
