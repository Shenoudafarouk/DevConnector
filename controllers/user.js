const UserService = require("../service/userService");
const autoBind = require("auto-bind");
const { registerValidator , loginValidator} = require('../validation/userValidation')

class UserAPIController {
  constructor() {
    this.UserService = new UserService();
    autoBind(this);
  }

  async register(req, res, next) {
    try {

      /* const { errors, isValid } = registerValidator(req.body)
      console.log(errors);
      if (!isValid) {
        return res.status(400).send(errors)
      } */

      console.log("here++++++++++++++++++")

      const response = await this.UserService.register(req.body);
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

      /* const { errors, isValid } = loginValidator(req.body)
      console.log(errors);
      if (!isValid) {
        return res.status(400).send(errors)
      } */

      const response = await this.UserService.login(req.body);
      return res.send(response);
    } catch (error) {
      console.error("UserAPIController.js --> UserAPIController().login()", error);

      return res.status(error.statusCode || 500).json({
        status: "SERVER_ERROR",
        message: error.message,
      });
    }
  }

  async current(req, res, next) {
    try {
      const response = await this.UserService.current(req)
      res.send({
        status: "OK",
        result: response
      })

    } catch (error) {
      res.status(error.statusCode || 500).json({
        status: "SERVER_ERROR",
        message: error.message
      })
    }
  }
}

module.exports = UserAPIController;
