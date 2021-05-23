const express = require("express");
const router = express.Router();
const passport = require("passport");
const ProfileController = require('../../controllers/profile')


// @route GET /api/profile/
// @desc get profile route
// @access Public
router.get("/", passport.authenticate("jwt", { session: false }), new ProfileController().getProfile);

// @route GET /api/profile/
// @desc create or edit profile route
// @access Public
router.post("/", passport.authenticate("jwt", { session: false }), new ProfileController().createOrEditProfile);


module.exports = router;
