const { salesService } = require('../services');
const status = require('../utils/status');

const registerSales = async (req, res) => {
  const itensSales = req.body;
  const { message } = await salesService.registerSales(itensSales);
  
  return res.status(status.SUCCESS_CREATED).json(message);
};

module.exports = {
  registerSales,
};
