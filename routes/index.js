const express = require('express');
const router = express.Router();
const mesaRoutes = require('./mesaRoutes');
const pedidoRoutes = require('./pedidoRoutes');
const cardapioRoutes = require('./cardapioRoutes');
const garcomRoutes = require('./garcomRoutes');

router.use('/mesas', mesaRoutes);
router.use('/pedidos', pedidoRoutes);
router.use('/cardapio', cardapioRoutes);
router.use('/garcom', garcomRoutes);

module.exports = router; 