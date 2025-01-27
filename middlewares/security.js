const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // limite por IP
  message: 'Muitas requisições deste IP, tente novamente mais tarde.'
});

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'email', 'senha'],
  exposedHeaders: ['Authorization'],
  credentials: true
};

module.exports = {
  helmet,
  limiter,
  cors: cors(corsOptions)
}; 