const mongoose = require("mongoose");
const User = require("../models/User");
const Profile = require("../models/Profile");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const path = require("path");
const { response } = require("express");
require("dotenv").config({
  path: path.join(__dirname, ".env"),
});
class UserService {
  constructor() {
    //this.PlayTokenManager = new PlayTokenManager();
  }

  async register({ name, password, email }) {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      throw { statusCode: 400, message: "Email is already exist" };
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const avatar = gravatar.url(email, { s: "200", r: "pg", d: "robohash" });
    console.log(avatar);

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
      const token = `bearer ${jwt.sign(payload, process.env.JWT_Key, {
        expiresIn: "7d",
      })}`;

      const response = {
        access_token: token,
        expires_in: "7d",
        user: {
          userId: user._id,
        },
      };

      return response;
    }
  }

  async current({ user }) {
    return {
      id: user._id,
      name: user.name,
      email: user.email,
    };
  }

  async getProfile({ user }) {
    const profile = await Profile.findOne({ user: user.id });
    if (!profile) {
      throw { statusCode: 404, message: "There is no profile for this user" };
    }
    return profile;
  }

  async createOrEditProfile({ user, body }) {
    const profileFields = {};

    profileFields.user = user.id;
    if (body.hanlde) profileFields.hanlde = body.hanlde;
    if (body.company) profileFields.company = body.company;
    if (body.website) profileFields.website = body.website;
    if (body.location) profileFields.location = body.location;
    if (body.bio) profileFields.bio = body.bio;
    if (body.status) profileFields.status = body.status;
    if (body.githubsUsername)
      profileFields.githubsUsername = body.githubsUsername;

    //Skills - spilt into array
    if (typeof body.skills !== "undefined") {
      profileFields.skills = body.skills.split(",");
    }

    //social
    profileFields.social = {};
    if (body.youtube) profileFields.social.youtube = body.youtube;
    if (body.twitter) profileFields.social.twitter = body.twitter;
    if (body.facebook) profileFields.social.facebook = body.facebook;
    if (body.linkedin) profileFields.social.linkedin = body.linkedin;
    if (body.instgram) profileFields.social.instgram = body.instgram;

    const profileExist = await Profile.findOne({ user: user.id });

    if (profileExist) {
      const updatedProfile = await Profile.findOneAndUpdate(
        { user: user.id },
        { $set: profileFields },
        { new: true }
      );

      return updatedProfile;
    } else {
      //create

      // check if handle exist
      const profileHandleExist = await Profile.findOne({
        handle: profileFields.hanlde,
      });

      if (profileHandleExist)
        throw { statusCode: 400, message: "That handle already exist" };

      //save Profle
      const newProfile = await new Profile(profileFields).save();

      return newProfile;
    }
  }
}

module.exports = UserService;
