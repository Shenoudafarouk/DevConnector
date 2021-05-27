const autoBind = require("auto-bind");
const Post = require("../models/Post");
const PostService = require("../service/postService");

class PostController {
  constructor() {
    this.PostService = new PostService();
    autoBind(this);
  }

  async createPost(req, res, next) {
    try {
      const response = await this.PostService.createPost(req);
      return res.send({
        status: "OK",
        result: response,
      });
    } catch (error) {
      console.error("PostController -> createPost()", error);
      return res.status(error.statusCode || 500).json({
        status: "SERVER_ERROR",
        messgae: error.messgae,
      });
    }
  }
}

module.exports = PostController;
