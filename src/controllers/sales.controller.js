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

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const result = await salesService.deleteSale(id);
  if (result > 0) {
    return res.status(status.SUCCESS_DELETE).send();
  }
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const sales = req.body;

  const { type, message } = await salesService.updateSale(id, sales);
  if (type) {
    res.status(status.SUCCESS).json(message);
  }
};

module.exports = {
  registerSales,
  getAllSales,
  getSaleById,
  deleteSale,
  updateSale,
};
