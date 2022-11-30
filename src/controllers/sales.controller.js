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

module.exports = {
  registerSales,
  getAllSales,
};
