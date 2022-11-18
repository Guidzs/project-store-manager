const { productsService } = require('../services');

const status = require('../utils/status');

const getProducts = async (_req, res) => {
  const { message } = await productsService.findAll();
  res.status(status.SUCCESS).json(message);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const productId = Number(id);
  const { type, message } = await productsService.getProductById(productId);

  if (type) return res.status(status.NOT_FOUND).json({ message });
  return res.status(status.SUCCESS).json(message);
};

module.exports = {
  getProducts,
  getProductById,
};
