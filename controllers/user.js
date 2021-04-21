const UserService = require("../service/userService");
const autoBind = require("auto-bind");

class UserAPIController {
  constructor() {
    this.UserService = new UserService();
    autoBind(this);
  }

  async register(req, res, next) {
    try {
      const { email, name, password, avatar } = req.body;
      const response = await this.UserService.register(
        email,
        name,
        password,
        avatar
      );
      console.log(response);
      return res.send({ status: "OK", result: response });
    } catch (error) {
      console.error(
        "UserAPIController.js --> UserAPIController().register()",
        error
      );

      return res.status(error.statusCode || 500).json({
        status: "SERVER_ERROR",
        message: error.message,
      });
    }
  }

  //login
  async login(req, res, next) {
    try {
      const response = await this.UserService.login(req.body);
      console.log(response);
      return res.send(response);
    } catch (error) {
      console.error("UserAPIController.js --> UserAPIController().login()", error);

      return res.status(error.statusCode || 500).json({
        status: "SERVER_ERROR",
        message: error.message,
      });
    }
  }
}

module.exports = UserAPIController;
