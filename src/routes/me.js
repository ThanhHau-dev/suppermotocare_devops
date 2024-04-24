const express = require('express');
const router = express.Router();

const MeController = require('../app/controllers/MeController');

router.get('/stored/product', MeController.storedProduct);
router.get('/trash/product', MeController.trashProducts);

module.exports = router;