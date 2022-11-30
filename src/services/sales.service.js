const { salesModel } = require('../models');

const registerSales = async (itens) => {
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
