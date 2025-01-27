const pedidoService = require("../services/pedidoService");

const criarPedido = async (req, res) => {
  try {
    const { mesaId, itens } = req.body;
    const pedido = await pedidoService.criarPedido(mesaId, itens);
    res.status(201).json(pedido);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const atualizarStatusPedido = async (req, res) => {
  try {
    const { pedidoId } = req.params;
    const { status } = req.body;
    const pedido = await pedidoService.atualizarStatusPedido(pedidoId, status);
    res.status(200).json(pedido);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const listarPedidos = async (req, res) => {
  try {
    const pedidos = await pedidoService.listarPedidos();
    res.status(200).json(pedidos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const listarPedidosMesa = async (req, res) => {
  try {
    const pedidos = await pedidoService.listarPedidosMesa(
      req.mesaId,
      req.headers.authorization
    );
    res.status(200).json(pedidos);
  } catch (error) {
    res.status(500).json({
      message: "Erro ao listar pedidos",
      error: error.message,
    });
  }
};

const listarPedidosAtivos = async (req, res) => {
  try {
    const pedidos = await pedidoService.listarPedidosAtivos();
    res.status(200).json(pedidos);
  } catch (error) {
    res.status(500).json({
      message: "Erro ao listar pedidos ativos",
      error: error.message,
    });
  }
};

module.exports = {
  criarPedido,
  atualizarStatusPedido,
  listarPedidos,
  listarPedidosMesa,
  listarPedidosAtivos,
};
