const express = require('express');
const {
  register,
  login,
  activateAccount,
  auth,
} = require('../../controllers/user');
const { authUser } = require('../../middleware/auth');
const router = express.Router();

router.post('/users/register', register);
router.post('/users/login', login);
router.post('/users/activate', activateAccount);
router.post('/users/auth', authUser, auth);

module.exports = router;
