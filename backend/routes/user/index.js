const express = require('express');
const { register, login, activateAccount } = require('../../controllers/user');
const { isAuth } = require('../../middleware/auth');
const router = express.Router();

router.post('/users/register', register);
router.post('/users/login', login);
router.post('/users/activate', isAuth, activateAccount);

module.exports = router;
