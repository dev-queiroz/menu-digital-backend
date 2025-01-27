const supabase = require("../config/db");

const criarPedido = async (mesaId, itens, status = 'pendente') => {
  const { data, error } = await supabase
    .from('pedidos')
    .insert({ mesa_id: mesaId, itens, status });

  if (error) throw error;
  return data[0];
};

const listarPedidos = async () => {
  const { data, error } = await supabase
    .from('pedidos')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

const atualizarStatusPedido = async (pedidoId, status) => {
  const { data, error } = await supabase
    .from('pedidos')
    .update({ status })
    .match({ id: pedidoId });

  if (error) throw error;
  return data[0];
};

const listarPedidosMesa = async (mesaId, sessaoToken) => {
  const { data, error } = await supabase
    .from('pedidos')
    .select(`
      *,
      itens (
        *,
        item:cardapio(*)
      )
    `)
    .eq('mesa_id', mesaId)
    .eq('sessao_token', sessaoToken)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

const listarPedidosAtivos = async () => {
  const { data, error } = await supabase
    .from('pedidos')
    .select(`
      *,
      mesa:mesas(*),
      itens (
        *,
        item:cardapio(*)
      )
    `)
    .in('status', ['pendente', 'preparando'])
    .order('created_at');

  if (error) throw error;
  return data;
};

module.exports = {
  criarPedido,
  listarPedidos,
  atualizarStatusPedido,
  listarPedidosMesa,
  listarPedidosAtivos
};
