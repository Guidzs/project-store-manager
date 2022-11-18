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

const saveProduct = async (req, res) => {
  const { name } = req.body;
  const { type, message, statusErr } = await productsService.saveProduct(name);

  if (type) return res.status(statusErr).json({ message });

  return res.status(status.SUCCESS_CREATED).json(message);
};

module.exports = {
  getProducts,
  getProductById,
  saveProduct,
};
