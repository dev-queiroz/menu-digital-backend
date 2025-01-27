const cardapioModel = require("../models/cardapioModel");

const criarItem = async (nome, descricao, preco, disponivel) => {
  return await cardapioModel.criarItem(nome, descricao, preco, disponivel);
};

const listarItens = async () => {
  return await cardapioModel.listarItens();
};

const atualizarItem = async (id, updates) => {
  return await cardapioModel.atualizarItem(id, updates);
};

const deletarItem = async (id) => {
  return await cardapioModel.deletarItem(id);
};

module.exports = {
  criarItem,
  listarItens,
  atualizarItem,
  deletarItem
}; 