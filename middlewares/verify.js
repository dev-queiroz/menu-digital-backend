const jwt = require("jsonwebtoken");
const { getMesaById } = require("../models/mesaModel");
require("dotenv").config();

const verificarToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.mesaId;
  } catch (error) {
    throw new Error("Token inválido ou expirado");
  }
};

const validarToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ message: "Token não fornecido" });
  }
  try {
    const mesaId = verificarToken(token);
    req.mesaId = mesaId;
    next();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

const validarSessao = async (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  try {
    const mesaId = verificarToken(token);
    const mesa = await getMesaById(mesaId);

    if (!mesa) {
      return res.status(404).json({ message: "Mesa não encontrada" });
    }

    // Verifica se a sessão atual corresponde ao token fornecido
    if (mesa.sessaoAtual && mesa.sessaoAtual !== token) {
      return res.status(403).json({ 
        message: "Mesa já está em uso por outra sessão" 
      });
    }

    req.mesaId = mesaId;
    req.mesa = mesa;
    next();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

module.exports = { verificarToken, validarToken, validarSessao };
