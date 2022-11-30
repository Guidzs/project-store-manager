const { productsModel } = require('../models');

const status = require('../utils/status');
const {
  PRODUCT_NOT_FOUND,
  PRODUCT_REQUIRED,
  QUANTITY_REQUIRED,
  QUANTITY_INVALID,
} = require('../utils/message');

const checksProductId = async (req, res, next) => {
  const sales = req.body;
  const allProducts = await productsModel.findAll();

  const hasId = sales.every((sale) => !sale.productId);
  if (hasId) {
    return res
      .status(status.INVALID)
      .json({ message: PRODUCT_REQUIRED });
  }

  const productIdValid = sales
    .some((sale) => !allProducts
      .some((product) => sale.productId === product.id));

  if (productIdValid) {
    return res
      .status(status.NOT_FOUND)
      .json({ message: PRODUCT_NOT_FOUND });
  }

  next();
};

const checksQuantity = async (req, res, next) => {
  const sales = req.body;

  const quantityExists = sales.every((sale) => !sale.quantity);
  if (quantityExists) {
    return res
      .status(status.INVALID)
      .json({ message: QUANTITY_REQUIRED });
  }

  const quantitiValid = !sales
    .every((sale) => sale.quantity >= 0);

  if (quantitiValid) {
    return res
      .status(status.INVALID_FORMAT)
      .json({ message: QUANTITY_INVALID });
  }
  
  next();
};

module.exports = {
  checksProductId,
  checksQuantity,
};
