const express = require('express');
const { productsController } = require('../controllers');

const router = express.Router();

router.get('/', productsController.getProducts);

router.get('/:id', productsController.getProductById);

router.post('/', productsController.saveProduct);

module.exports = router;
