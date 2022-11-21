const { salesService } = require('../services');
const status = require('../utils/status');

const registerSales = async (req, res) => {
  const itensSales = req.body;
  const { type, message, statusErr } = await salesService.registerSales(itensSales);

  if (type) return res.status(statusErr).json(message);

  return res.status(status.SUCCESS_CREATED).json(message);
};

module.exports = {
  registerSales,
};
