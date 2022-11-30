const { salesModel } = require('../models');

const registerSales = async (itens) => {
  const insertId = await salesModel.registerSales(itens);

  return {
    message: {
      id: insertId,
      itemsSold: itens,
    },
  };
};

module.exports = {
  registerSales,
};
