const { salesModel } = require('../models');
const { validateItensSales } = require('./validations');

// const status = require('../utils/status');

const registerSales = async (itens) => {
  const err = validateItensSales(itens);
  if (err.type) return err;

  const insertId = await salesModel.registerSales(itens);

  return { 
    type: null,
    message: {
      id: insertId,
      itemsSold: itens,
    },
  };
};

module.exports = {
  registerSales,
};
