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

const getProductByName = async (req, res) => {
  const { q } = req.query;

  if (q.length === 0) {
    const { message } = await productsService.findAll();
    res.status(status.SUCCESS).json(message); 
  }

  const { message } = await productsService.getProductByName(q);

  return res.status(status.SUCCESS).json(message);
};

const saveProduct = async (req, res) => {
  const { name } = req.body;
  const { type, message, statusErr } = await productsService.saveProduct(name);

  if (type) return res.status(statusErr).json({ message });

  return res.status(status.SUCCESS_CREATED).json(message);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { type, message, statusErr } = await productsService.updateProduct(id, name);

  if (type) return res.status(statusErr).json({ message });

  return res.status(status.SUCCESS).json(message);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const result = await productsService.deleteProduct(id);
  if (result > 0) {
    return res.status(status.SUCCESS_DELETE).send();
  }
};

module.exports = {
  getProducts,
  getProductById,
  getProductByName,
  saveProduct,
  updateProduct,
  deleteProduct,
};
