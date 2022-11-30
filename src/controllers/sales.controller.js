const { salesService } = require('../services');
const status = require('../utils/status');

const registerSales = async (req, res) => {
  const itensSales = req.body;
  const { message } = await salesService.registerSales(itensSales);
  
  return res.status(status.SUCCESS_CREATED).json(message);
};

const getAllSales = async (_req, res) => {
  const { message } = await salesService.getAllSales();

  return res.status(status.SUCCESS).json(message);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const { message } = await salesService.getSaleById(id);

  return res.status(status.SUCCESS).json(message);
};

module.exports = {
  registerSales,
  getAllSales,
  getSaleById,
};
