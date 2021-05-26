const express = require("express");
const router = express.Router();
const passport = require("passport");
const ProfileController = require("../../controllers/profile");
const {
  profileValidation,
  addExperienceValidation,
  addEducationValidation
} = require("../../validation/profileValidation");

// @route GET /api/profile/
// @desc get profile route
// @access Public
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  new ProfileController().getProfile
);

// @route GET /api/profile/
// @desc create or edit profile route
// @access Public
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  profileValidation,
  new ProfileController().createOrEditProfile
);

// @route GET /api/profile/handle/:handle
// @desc get profile by handle
// @access Public
router.get("/handle/:handle", new ProfileController().getProfileByHandle);

// @route GET /api/profile/handle/:userId
// @desc get profile by UserID
// @access Public
router.get("/userId/:userId", new ProfileController().getProfileByUserId);

// @route GET /api/profile/all
// @desc get all profiles
// @access Public
router.get("/all", new ProfileController().getAllProfiles);

// @route GET /api/profile/experience
// @desc add experience to profile
// @access private
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  addExperienceValidation,
  new ProfileController().addExperience
);

// @route GET /api/profile/experience
// @desc add experience to profile
// @access private
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  addEducationValidation,
  new ProfileController().addEducation
);

module.exports = router;
