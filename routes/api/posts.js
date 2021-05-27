const express = require("express");
const passport = require("passport");
const { createPostValidation } = require("../../validation/postValidation");
const router = express.Router();
const PostController = require('../../controllers/post')

// @route GET /api/posts/
// @desc tCreate Post
// @access private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  createPostValidation,
  new PostController().createPost
);

module.exports = router;
