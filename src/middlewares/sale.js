const { productsModel, salesModel } = require('../models');

const status = require('../utils/status');
const {
  PRODUCT_NOT_FOUND,
  PRODUCT_REQUIRED,
  QUANTITY_REQUIRED,
  QUANTITY_INVALID,
  SALE_NOT_FOUND,
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

  const quantitiValid = sales
  .some((sale) => sale.quantity <= 0);
  if (quantitiValid) {
    return res
      .status(status.INVALID_FORMAT)
      .json({ message: QUANTITY_INVALID });
  }

  const quantityExists = sales.every((sale) => !sale.quantity);
  if (quantityExists) {
    return res
      .status(status.INVALID)
      .json({ message: QUANTITY_REQUIRED });
  }
  
  next();
};

const checksSaleId = async (req, res, next) => {
  const { id } = req.params;
  const allSales = await salesModel.getAllSales();

  const idValid = !allSales.some((sale) => sale.saleId === Number(id));
  if (idValid) {
    return res.status(status.NOT_FOUND).json({ message: SALE_NOT_FOUND });
  }
  next();
};

module.exports = {
  checksProductId,
  checksQuantity,
  checksSaleId,
};
