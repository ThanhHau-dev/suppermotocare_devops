const express = require('express');
const router = express.Router();
const PurchaseController = require('../app/controllers/PurchaseController');

router.get('/list-purchase/add-product/:id/:amount', PurchaseController.addProductIncart)
router.get('/:id/delete', PurchaseController.delete)
router.get('/cart', PurchaseController.showCart)
router.get('/:id', PurchaseController.show);
router.get('/', PurchaseController.type);

module.exports = router;