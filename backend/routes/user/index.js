const express = require('express');
const {
  register,
  login,
  activateAccount,
  sendVerification,
} = require('../../controllers/user');
const { isAuth } = require('../../middleware/auth');
const router = express.Router();

router.post('/users/register', register);
router.post('/users/login', login);
router.post('/users/activate', isAuth, activateAccount);
router.post('/users/sendVerification', isAuth, sendVerification);

module.exports = router;
