const express = require('express');
const router = express.Router();
const UserController = require('../../controllers/user');


// @route POST /api/user/register
// @desc register route
// @access Public
router.post('/register', new UserController().register)

// @route POST /api/user/login
// @desc login route / return JWT token
// @access Public
router.post('/login', new UserController().login)

module.exports = router;

