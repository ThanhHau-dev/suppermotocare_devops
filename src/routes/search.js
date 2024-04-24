const express = require('express');
const router = express.Router();

const SearchController = require('../app/controllers/SearchController');

router.post('/', SearchController.showSearch);

module.exports = router;