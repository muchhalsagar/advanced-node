const express = require('express');
const { register } = require('../controllers/userController');
const { validateRegister } = require('../middlewares/validate');

const router = express.Router();

// Register user route
router.post('/register', validateRegister, register);

module.exports = router;
