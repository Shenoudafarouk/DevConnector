const userService = require("../service/userService");
const autoBind = require("auto-bind");

class ProfileAPIController {
  constructor() {
    this.userService = new userService();
    autoBind(this);
  }

  async getProfile(req, res, next) {
    try {
      const response = await this.userService.getProfile(req);
      res.send({
        status: "OK",
        result: response,
      });
    } catch (error) {
      console.error("ProfileAPIController -> getProfile", error);
      return res.status(error.statusCode || 500).json({
        status: "SERVER_ERROR",
        message: error.message,
      });
    }
  }

  async createOrEditProfile(req, res, next) {
    try {
      const response = await this.userService().createOrEditProfile(req);
      return res.send({
        status: "OK",
        result: response,
      });
    } catch (error) {
      console.error("ProfileAPIController -> createOrEditProfile", error);
      return res.status(error.statusCode || 500).json({
        status: "SERVER_ERROR",
        messgae: error.message,
      });
    }
  }
}

module.exports = ProfileAPIController;
