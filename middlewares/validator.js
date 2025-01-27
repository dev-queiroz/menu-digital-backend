const { body, param } = require('express-validator');

const pedidoValidator = [
  body('itens').isArray().notEmpty(),
  body('itens.*.id').isUUID(),
  body('itens.*.quantidade').isInt({ min: 1 }),
  body('observacoes').optional().isString(),
];

const mesaValidator = [
  body('mesaId').isString().notEmpty(),
];

// ... outros validadores 