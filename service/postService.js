const Post = require("../models/Post");

class PostService {
  constructor() {}
  async createPost({ user, body }) {
    const post = new Post({ user: user.id, ...body }).save();
    return post;
  }
}

module.exports = PostService;
