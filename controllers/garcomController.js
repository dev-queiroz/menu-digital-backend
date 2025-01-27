const garcomService = require("../services/garcomService");

const criarGarcom = async (req, res) => {
  try {
    const { nome, email, senha, cargo } = req.body;
    const garcom = await garcomService.criarGarcom(nome, email, senha, cargo);
    res.status(201).json(garcom);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const listarGarcons = async (req, res) => {
  try {
    const garcons = await garcomService.listarGarcons();
    res.status(200).json(garcons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const alterarSenhaGarcom = async (req, res) => {
  try {
    const { id } = req.params;
    const { novaSenha } = req.body;
    const garcom = await garcomService.alterarSenhaGarcom(id, novaSenha);
    res.status(200).json(garcom);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const desativarGarcom = async (req, res) => {
  try {
    const { id } = req.params;
    const garcom = await garcomService.desativarGarcom(id);
    res.status(200).json(garcom);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  criarGarcom,
  listarGarcons,
  alterarSenhaGarcom,
  desativarGarcom
}; 