const garcomModel = require("../models/garcomModel");

const criarGarcom = async (nome, email, senha, cargo) => {
  return await garcomModel.criarGarcom(nome, email, senha, cargo);
};

const listarGarcons = async () => {
  return await garcomModel.listarGarcons();
};

const alterarSenhaGarcom = async (id, novaSenha) => {
  return await garcomModel.alterarSenhaGarcom(id, novaSenha);
};

const desativarGarcom = async (id) => {
  return await garcomModel.desativarGarcom(id);
};

// Adicione outras funções conforme necessário

module.exports = {
  criarGarcom,
  listarGarcons,
  alterarSenhaGarcom,
  desativarGarcom
}; 