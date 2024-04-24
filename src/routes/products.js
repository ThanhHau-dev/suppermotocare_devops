const express = require('express');
const router = express.Router();

const productController = require('../app/controllers/ProductController.js');

router.get('/create', productController.create);
router.post('/store', productController.store);
router.get('/:id/edit', productController.edit);
router.post('/hdFormAction', productController.hdFormAction);
router.delete('/:id', productController.destroy);
router.delete('/:id/force', productController.destroyForce);
router.patch('/:id/restore', productController.restore);
router.put('/:id', productController.update);


module.exports = router;