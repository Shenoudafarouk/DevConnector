const Profile = require("../models/Profile");

class ProfileService {
  constructor() {}

  async getProfile({ user }) {
    const profile = await Profile.findOne({ user: user.id }).populate("user", [
      "name",
      "avatar",
    ]);
    if (!profile) {
      throw { statusCode: 404, message: "There is no profile for this user" };
    }
    return profile;
  }

  async createOrEditProfile({ user, body }) {
    const profileFields = {};

    profileFields.user = user.id;
    if (body.handle) profileFields.handle = body.handle;
    if (body.company) profileFields.company = body.company;
    if (body.website) profileFields.website = body.website;
    if (body.location) profileFields.location = body.location;
    if (body.bio) profileFields.bio = body.bio;
    if (body.status) profileFields.status = body.status;
    if (body.githubUsername) profileFields.githubUsername = body.githubUsername;

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
    if (body.instagram) profileFields.social.instagram = body.instagram;

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
  async getProfileByHandle({ handle }) {
    const profileHandle = await await Profile.findOne({
      handle: RegExp(handle, "ig"),
    }).populate("user", ["name", "email"]);
    if (!profileHandle)
      throw { statusCode: "404", message: "There is no profile for this user" };

    return profileHandle;
  }

  async getProfileByUserId({ userId }) {
    const userProfile = await Profile.findOne({ user: userId }).populate(
      "user",
      ["name", "email"]
    );
    if (!userProfile)
      throw { statusCode: 404, message: "There is no profile for this user" };

    return userProfile;
  }

  async getAllProfiles() {
    const profiles = await Profile.find({}).populate("user", ["name", "email"]);

    if (!profiles.length)
      throw { statusCode: 404, message: "There are no profiles" };

    return { profiles, total: profiles.length };
  }

  async addExperience(id, body) {
    const profile = await Profile.findOne({ user: id });

    if (!profile)
      throw { statusCode: 404, message: "There is no profile for this user" };

    profile.experience.unshift({ ...body });

    let updatedProfile = await profile.save();
    return updatedProfile;
  }
  async addEducation(id, body) {
    const profile = await Profile.findOne({ user: id });

    if (!profile)
      throw { statusCode: 404, message: "There is no profile for this user" };

    profile.education.unshift({ ...body });

    let updatedProfile = await profile.save();
    return updatedProfile;
  }
  
}

module.exports = ProfileService;
