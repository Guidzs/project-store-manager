const { productsModel } = require('../models');
const { validateProductId } = require('./validations')

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
  return { type: 'NOT FOUND', message: message.PRODUCT_NOT_FOUND };
};

module.exports = {
  findAll,
  getProductById,
};
