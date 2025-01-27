const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  
  if (err.type === 'ValidationError') {
    return res.status(400).json({ 
      message: 'Erro de validação', 
      errors: err.errors 
    });
  }
  
  res.status(500).json({ 
    message: 'Erro interno do servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
};

module.exports = errorHandler; 