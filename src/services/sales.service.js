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

const getAllSales = async () => {
  const result = await salesModel.getAllSales();
  return { message: result };
};

const getSaleById = async (id) => {
  const result = await salesModel.getSaleById(id);
  return { message: result };
};

module.exports = {
  registerSales,
  getAllSales,
  getSaleById,
};
