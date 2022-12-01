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

const deleteSale = async (id) => {
  const result = await salesModel.deleteSale(id);
  return result;
};

const updateSale = async (id, sales) => {
  const result = await salesModel.updateSale(id, sales);
  return {
    type: true,
    message: {
      saleId: result,
      itemsUpdated: sales,
    },
  };
};

module.exports = {
  registerSales,
  getAllSales,
  getSaleById,
  deleteSale,
  updateSale,
};
