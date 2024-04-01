const express = require('express');
const router = express.Router();
const UserController = require("../controllers/user.js")
const checkAuth = require("../middleware/check-auth.js")

router.post('/signup', UserController.user_signup);

router.post('/login', checkAuth, UserController.user_login);

router.delete('/:userId', checkAuth, UserController.user_delete);


module.exports = router;