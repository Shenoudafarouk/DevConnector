const express = require('express');
const router = express.Router();
const passport = require('passport');
const UserController = require('../../controllers/user');
const { registerValidation , loginValidation} = require('../../validation/userJoiValidation')


// @route POST /api/user/register
// @desc register route
// @access Public
router.post('/register', registerValidation , new UserController().register)

// @route POST /api/user/login
// @desc login route / return JWT token
// @access Public
router.post('/login', loginValidation, new UserController().login)

// @route GET /api/user/current
// @desc current user
// @access Private
router.get('/current', passport.authenticate('jwt', { session: false }), new UserController().current)

module.exports = router;

