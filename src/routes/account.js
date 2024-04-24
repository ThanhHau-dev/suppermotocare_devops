const express = require('express');
const router = express.Router();
const AccountController = require('../app/controllers/AccountController');

router.get('/login', AccountController.login);
router.post('/login/handle', AccountController.handleLogin);
router.get('/register', AccountController.register);
router.get('/logout', AccountController.logout);
router.post('/', AccountController.addCustomer);


module.exports = router;