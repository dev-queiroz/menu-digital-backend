const cardapioService = require("../services/cardapioService");

const criarItem = async (req, res) => {
  try {
    const { nome, descricao, preco, disponivel } = req.body;
    const item = await cardapioService.criarItem(nome, descricao, preco, disponivel);
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const listarItens = async (req, res) => {
  try {
    const itens = await cardapioService.listarItens();
    res.status(200).json(itens);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const atualizarItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const item = await cardapioService.atualizarItem(id, updates);
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletarItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await cardapioService.deletarItem(id);
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  criarItem,
  listarItens,
  atualizarItem,
  deletarItem
}; 