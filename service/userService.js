const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const path = require('path');
require('dotenv').config({
  path: path.join(__dirname, '.env')
});
class UserService {
  constructor() {
    //this.PlayTokenManager = new PlayTokenManager();
  }

  async register({ email, name, password, avatar }) {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      throw { statusCode: 400, message: "Email is already exist" };
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    avatar = gravatar.url(email, { s: "200", r: "pg", d: "robohash" });

    const user = await new User({
      email,
      name,
      password: hash,
      avatar,
    }).save();

    return user;
  }

  async login({ email, password }) {
    const user = await User.findOne({ email });

    if (!user) {
      throw { statusCode: 404, message: "User Not Found" };
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw { statusCode: 400, message: "Password Incorrect" };
    } else {
      const payload = {
        name: user.name,
        userId: user._id,
        avatar: user.avatar,
      };
      const token = `bearer  ${await jwt.sign(payload, process.env.JWT_Key, { expiresIn: "7d" })}`;

      const response = {
        access_token: token,
        expires_in: "7d",
        user: {
          userId: user._id
        }
      }

      return response;
    }
  }
}

module.exports = UserService;
