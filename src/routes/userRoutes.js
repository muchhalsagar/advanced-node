const express = require('express');
const userController = require('../controllers/userController');
const { validateRegister, validateLogin } = require('../middlewares/validate');

const router = express.Router();

// Register user route
router.post('/register', validateRegister, userController.register);
router.post('/login', validateLogin, userController.login);
router.post('/forgot-password', userController.forgotPassword);
router.post('/reset-password', userController.resetPassword);

module.exports = router;
