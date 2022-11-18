const { productsService } = require('../services');

const status = require('../utils/status');

const getProducts = async (_req, res) => {
  const { message } = await productsService.findAll();

  res.status(status.SUCCESS).json(message);
};

module.exports = {
  getProducts,
};
