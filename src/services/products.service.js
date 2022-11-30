const { productsModel } = require('../models');
const { validateProductId, validateName } = require('./validations');

const message = require('../utils/message');

const findAll = async () => {
  const products = await productsModel.findAll();
  return { type: null, message: products };
};

const getProductById = async (id) => {
  const error = validateProductId(id);
  if (error.type) return error;

  const product = await productsModel.getProductById(id);
  if (product) return { type: null, message: product };
  return { type: true, message: message.PRODUCT_NOT_FOUND };
};

const saveProduct = async (name) => {
  const err = validateName(name);
  if (err.type) return err;

  const newProductId = await productsModel.saveProduct(name);
  const newProduct = await productsModel.getProductById(newProductId);

  return { type: null, message: newProduct };
};

const updateProduct = async (id, name) => {
  const err = validateName(name);
  if (err.type) return err;

  const newProduct = await productsModel.updateProduct(id, name);

  return { type: null, message: newProduct };
};

module.exports = {
  findAll,
  getProductById,
  saveProduct,
  updateProduct,
};
