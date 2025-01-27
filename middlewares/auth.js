const jwt = require('jsonwebtoken');
const { validarGarcom } = require('./authGarcom');
const logger = require('../utils/logger');

const auth = {
  admin: (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: 'Token não fornecido' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(401).json({ message: 'Token inválido' });
      if (decoded.role !== 'admin') return res.status(403).json({ message: 'Acesso negado' });
      req.user = decoded;
      next();
    });
  },

  garcom: (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: 'Token não fornecido' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(401).json({ message: 'Token inválido' });
      if (decoded.role !== 'garcom') return res.status(403).json({ message: 'Acesso negado' });
      req.user = decoded;
      next();
    });
  },

  mesa: (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: 'Token não fornecido' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(401).json({ message: 'Token inválido' });
      if (decoded.role !== 'mesa') return res.status(403).json({ message: 'Acesso negado' });
      req.user = decoded;
      next();
    });
  },

  gerente: async (req, res, next) => {
    try {
      await validarGarcom(req, res, next);
      if (req.garcom.cargo !== 'gerente') {
        return res.status(403).json({ 
          message: 'Acesso permitido apenas para gerentes' 
        });
      }
      next();
    } catch (error) {
      logger.error('Erro na autenticação do gerente:', error);
      res.status(401).json({ message: 'Autenticação do gerente falhou' });
    }
  }
};

module.exports = auth; 