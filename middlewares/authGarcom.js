const bcrypt = require('bcrypt');
const { buscarGarcomPorEmail } = require('../models/garcomModel');

const validarGarcom = async (req, res, next) => {
  const { email, senha } = req.headers;
  
  if (!email || !senha) {
    return res.status(401).json({ message: "Credenciais não fornecidas" });
  }

  try {
    const garcom = await buscarGarcomPorEmail(email);

    if (!garcom) {
      return res.status(401).json({ message: "Garçom não encontrado" });
    }

    const senhaValida = await bcrypt.compare(senha, garcom.senha_hash);
    if (!senhaValida) {
      return res.status(401).json({ message: "Senha inválida" });
    }

    req.garcom = {
      id: garcom.id,
      nome: garcom.nome,
      cargo: garcom.cargo
    };

    next();
  } catch (error) {
    return res.status(500).json({ 
      message: "Erro na autenticação",
      error: error.message 
    });
  }
};

// Middleware para verificar se é gerente
const validarGerente = async (req, res, next) => {
  if (req.garcom.cargo !== 'gerente') {
    return res.status(403).json({ 
      message: "Acesso permitido apenas para gerentes" 
    });
  }
  next();
};

module.exports = { validarGarcom, validarGerente }; 
module.exports = { validarGarcom }; 