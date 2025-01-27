const pedidoModel = require("../models/pedidoModel");
const cardapioModel = require("../models/cardapioModel");

const criarPedido = async (mesaId, itens) => {
  return await pedidoModel.criarPedido(mesaId, itens);
};

const atualizarStatusPedido = async (pedidoId, status) => {
  return await pedidoModel.atualizarStatusPedido(pedidoId, status);
};

const listarPedidos = async () => {
  return await pedidoModel.listarPedidos();
};

const listarPedidosMesa = async (mesaId, sessaoToken) => {
  return await pedidoModel.listarPedidosMesa(mesaId, sessaoToken);
};

const listarPedidosAtivos = async () => {
  return await pedidoModel.listarPedidosAtivos();
};

module.exports = {
  criarPedido,
  atualizarStatusPedido,
  listarPedidos,
  listarPedidosMesa,
  listarPedidosAtivos
};
