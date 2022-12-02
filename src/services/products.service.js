const { productsModel } = require('../models');
const { validateProductId, validateName } = require('./validations');

const message = require('../utils/message');

const findAll = async () => {
  const products = await productsModel.findAll();
  return { message: products };
};

const getProductById = async (id) => {
  const error = validateProductId(id);
  if (error.type) return error;

  const product = await productsModel.getProductById(id);
  if (product) return { type: null, message: product };
  return { type: true, message: message.PRODUCT_NOT_FOUND };
};

const getProductByName = async (name) => {
  const result = await productsModel.getProductByName(name);
  return { message: result };
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

const deleteProduct = async (id) => {
  const result = await productsModel.deleteProduct(id);
  return result;
};

module.exports = {
  findAll,
  getProductById,
  getProductByName,
  saveProduct,
  updateProduct,
  deleteProduct,
};
