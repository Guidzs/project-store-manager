const { productsModel } = require('../models');
const status = require('../utils/status');
const { PRODUCT_NOT_FOUND } = require('../utils/message');

const checkProductId = async (req, res, next) => {
  const { id } = req.params;
  const allProducts = await productsModel.findAll();

  const idValid = !allProducts.some((product) => product.id === Number(id));
  if (idValid) {
    return res
      .status(status.NOT_FOUND)
      .json({ message: PRODUCT_NOT_FOUND });
  }
  
  next();
};

module.exports = {
  checkProductId,
};