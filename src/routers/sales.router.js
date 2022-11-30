const express = require('express');

const { salesController } = require('../controllers');
const { checksProductId, checksQuantity } = require('../middlewares/sale');

const router = express.Router();

router.post('/', checksProductId, checksQuantity, salesController.registerSales);

module.exports = router;
