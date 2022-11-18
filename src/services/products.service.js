const { productsModel } = require('../models');

// const message = require('../utils/message');

const findAll = async () => {
  const products = await productsModel.findAll();
  return { type: null, message: products };
};

module.exports = {
  findAll,
};
