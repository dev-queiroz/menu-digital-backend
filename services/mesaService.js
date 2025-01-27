const mesaModel = require("../models/mesaModel");

const criarMesa = async (numero, capacidade) => {
  return await mesaModel.criarMesa(numero, capacidade);
};

const listarMesas = async () => {
  return await mesaModel.listarMesas();
};

const atualizarDisponibilidadeMesa = async (id, disponivel) => {
  return await mesaModel.atualizarDisponibilidadeMesa(id, disponivel);
};

const atualizarStatusMesa = async (mesaId, status) => {
  const mesaAtualizada = await mesaModel.atualizarStatusMesa(mesaId, status);
  return mesaAtualizada;
};

const iniciarSessao = async (mesaId) => {
  return await mesaModel.iniciarSessao(mesaId);
};

const encerrarSessao = async (mesaId, garcomId) => {
  return await mesaModel.encerrarSessao(mesaId, garcomId);
};

module.exports = { 
  criarMesa,
  listarMesas, 
  atualizarDisponibilidadeMesa,
  atualizarStatusMesa,
  iniciarSessao,
  encerrarSessao
};
