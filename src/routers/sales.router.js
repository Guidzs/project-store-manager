const express = require('express');

const { salesController } = require('../controllers');
const {
  checksProductId,
  checksQuantity,
  checksSaleId,
} = require('../middlewares/sale');

const router = express.Router();

router.post('/', checksProductId, checksQuantity, salesController.registerSales);

router.get('/', salesController.getAllSales);

router.get('/:id', checksSaleId, salesController.getSaleById);

router.delete('/:id', checksSaleId, salesController.deleteSale);

router.put('/:id', checksSaleId, checksProductId, checksQuantity, salesController.updateSale);

module.exports = router;
