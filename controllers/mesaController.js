const mesaService = require("../services/mesaService");

const criarMesa = async (req, res) => {
  try {
    const { numero, capacidade } = req.body;
    const mesa = await mesaService.criarMesa(numero, capacidade);
    res.status(201).json(mesa);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const listarMesas = async (req, res) => {
  try {
    const mesas = await mesaService.listarMesas();
    res.status(200).json(mesas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const atualizarDisponibilidadeMesa = async (req, res) => {
  try {
    const { id } = req.params;
    const { disponivel } = req.body;
    const mesa = await mesaService.atualizarDisponibilidadeMesa(id, disponivel);
    res.status(200).json(mesa);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const iniciarSessao = async (req, res) => {
  try {
    const { mesaId } = req.params;
    const sessao = await mesaService.iniciarSessao(mesaId);
    res.status(200).json(sessao);
  } catch (error) {
    res.status(400).json({ 
      message: "Erro ao iniciar sessão", 
      error: error.message 
    });
  }
};

const encerrarSessao = async (req, res) => {
  try {
    const { mesaId } = req.params;
    const garcomId = req.garcom.id; // Vem do middleware validarGarcom
    const mesa = await mesaService.encerrarSessao(mesaId, garcomId);
    res.status(200).json(mesa);
  } catch (error) {
    res.status(400).json({ 
      message: "Erro ao encerrar sessão", 
      error: error.message 
    });
  }
};

module.exports = {
  criarMesa,
  listarMesas,
  atualizarDisponibilidadeMesa,
  iniciarSessao,
  encerrarSessao
};
