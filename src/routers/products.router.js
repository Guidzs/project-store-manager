const express = require('express');
const { productsController } = require('../controllers');
const { checkProductId } = require('../middlewares/product');

const router = express.Router();

router.get('/', productsController.getProducts);

router.get('/:id', productsController.getProductById);

router.post('/', productsController.saveProduct);

router.put('/:id', checkProductId, productsController.updateProduct);

router.delete('/:id', checkProductId, productsController.deleteProduct);

module.exports = router;
