const profileService = require("../service/profileService");
const autoBind = require("auto-bind");

class ProfileAPIController {
  constructor() {
    this.profileService = new profileService();
    autoBind(this);
  }

  async getProfile(req, res, next) {
    try {
      const response = await this.profileService.getProfile(req);
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

  async getProfileByHandle(req, res, next) {
    try {
      const response = await this.profileService.getProfileByHandle(req.params);
      return res.send({
        status: "OK",
        result: response,
      });
    } catch (error) {
      console.error("profileController -> getProfileByHandle", error);
      return res.status(error.statusCode || 500).json({
        status: "SERVER_ERROR",
        message: error.message,
      });
    }
  }

  async getProfileByUserId(req, res, next) {
    try {
      const response = await this.profileService.getProfileByUserId(req.params);
      return res.send({
        status: "OK",
        result: response,
      });
    } catch (error) {
      console.error("profileController -> getprofileByUserId", error);
      return res.status(error.statusCode || 500).json({
        status: "SERVER_ERROR",
        message: error.message,
      });
    }
  }

  async createOrEditProfile(req, res, next) {
    try {
      const response = await this.profileService.createOrEditProfile(req);
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

  async getAllProfiles(req, res, next) {
    try {
      const { profiles, total } = await this.profileService.getAllProfiles();
      return res.send({
        status: "OK",
        result: profiles,
        total,
      });
    } catch (error) {
      console.error("profileController -> getallProfiles", error);
      return res.status(error.statusCode || 500).json({
        status: "SERVER_ERROR",
        message: error.message,
      });
    }
  }

  async addExperience(req, res, next) {
    try {
      const response = await this.profileService.addExperience(
        req.user,
        req.body
      );
      return res.send({
        status: "OK",
        result: response,
      });
    } catch (error) {
      console.error("profileController -> addExperince()", error);
      return res.status(error.statusCode || 500).json({
        status: "SERVER_ERROR",
        message: error.message,
      });
    }
  }

  async addEducation(req, res, next) {
    try {
      const response = await this.profileService.addEducation(
        req.user,
        req.body
      );
      return res.send({
        status: "OK",
        result: response,
      });
    } catch (error) {
      console.error("profileController -> addEducation()", error);
      return res.status(error.statusCode || 500).json({
        status: "SERVER_ERROR",
        message: error.message,
      });
    }
  }

  async deleteEducation(req, res, next) {
    try {
      const response = await this.profileService.deleteEducation(req);
      res.send({
        status: "OK",
        result: response,
      });
    } catch (error) {
      console.error("ProfileAPIController -> deleteEducation()", error);
      return res.status(error.statusCode || 500).json({
        status: "SERVER_ERROR",
        message: error.message,
      });
    }
  }
  async deleteExperience(req, res, next) {
    try {
      const response = await this.profileService.deleteExperience(req);
      res.send({
        status: "OK",
        result: response,
      });
    } catch (error) {
      console.error("ProfileAPIController -> deleteExperience()", error);
      return res.status(error.statusCode || 500).json({
        status: "SERVER_ERROR",
        message: error.message,
      });
    }
  }
}

module.exports = ProfileAPIController;
