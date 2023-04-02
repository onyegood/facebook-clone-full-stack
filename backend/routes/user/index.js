const express = require("express");
const { register, login, activateAccount } = require("../../controllers/user");
const router = express.Router();

router.post("/users/register", register);
router.post("/users/login", login);
router.post("/users/activate", activateAccount);

module.exports = router;
