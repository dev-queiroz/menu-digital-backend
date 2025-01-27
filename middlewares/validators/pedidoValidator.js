const { body, param, validationResult } = require('express-validator');

const validarPedido = [
  body('itens').isArray().withMessage('Itens devem ser um array')
    .notEmpty().withMessage('Pedido deve ter pelo menos um item'),
  
  body('itens.*.id').isUUID().withMessage('ID do item inválido'),
  
  body('itens.*.quantidade')
    .isInt({ min: 1 })
    .withMessage('Quantidade deve ser maior que zero'),
  
  body('observacoes')
    .optional()
    .isString()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Observações muito longas'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = { validarPedido }; 