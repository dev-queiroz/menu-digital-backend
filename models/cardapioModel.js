const supabase = require("../config/db");

const criarItem = async (nome, descricao, preco, disponivel = true) => {
  const { data, error } = await supabase
    .from('cardapio')
    .insert({ nome, descricao, preco, disponivel });

  if (error) throw error;
  return data[0];
};

const listarItens = async () => {
  const { data, error } = await supabase
    .from('cardapio')
    .select('*')
    .order('nome');

  if (error) throw error;
  return data;
};

const atualizarItem = async (id, updates) => {
  const { data, error } = await supabase
    .from('cardapio')
    .update(updates)
    .match({ id });

  if (error) throw error;
  return data[0];
};

const deletarItem = async (id) => {
  const { data, error } = await supabase
    .from('cardapio')
    .delete()
    .match({ id });

  if (error) throw error;
  return data[0];
};

module.exports = {
  criarItem,
  listarItens,
  atualizarItem,
  deletarItem
};
