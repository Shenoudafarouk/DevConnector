const joi = require("joi");

module.exports.profileValidation = function (req, res, next) {
  try {
    const bodySchema = joi.object().keys({
      handle: joi.string().min(2).max(40).required(),
      status: joi.string().required(),
      skills: joi.string().required(),
      website: joi.string().uri().optional(),
      youtube: joi.string().uri().optional(),
      twitter: joi.string().uri().optional(),
      facebook: joi.string().uri().optional(),
      linkedin: joi.string().uri().optional(),
      instagram: joi.string().uri().optional(),
    });

    const options = { abortEarly: false, allowUnknown: true };
    const bodyValidation = bodySchema.validate(req.body, options);
    const validationError = bodyValidation.error;

    if (validationError) {
      let errors = validationError.details.map((err) => {
        return err.message;
      });
      return res.status(400).send({
        status: "BAD_REQUEST",
        message: errors,
      });
    }

    return next();
  } catch (error) {
    console.error("userValidation -> profileValidation", error);
    return res.status(500).json({
      status: "SERVER_ERROR",
      message: error.message,
    });
  }
};

module.exports.addExperienceValidation = async (req, res, next) => {
  try {
    const bodyschema = joi.object().keys({
      title: joi.string().required(),
      company: joi.string().required(),
      from: joi.string().required(),
    });

    const bodyValidation = bodyschema.validate(req.body, {
      abortEarly: false,
      allowUnknown: true,
    });
    const validationError = bodyValidation.error;
    if (validationError) {
      const errors = validationError.details.map((err) => err.message);
      return res.status(400).send({
        status: "BAD_REQUEST",
        message: errors,
      });
    }
    return next();
  } catch (error) {
    console.error("profileValidation -> addExperiecne()", error);
    return res.status(500).json({
      status: "SERVER_ERROR",
      message: error.message,
    });
  }
};

module.exports.addEducationValidation = async (req, res, next) => {
  try {
    const bodyschema = joi.object().keys({
      school: joi.string().required(),
      degree: joi.string().required(),
      fieldOfStudy: joi.string().required(),
      from: joi.string().required(),
    });

    const bodyValidation = bodyschema.validate(req.body, {
      abortEarly: false,
      allowUnknown: true,
    });
    const validationError = bodyValidation.error;
    if (validationError) {
      const errors = validationError.details.map((err) => err.message);
      return res.status(400).send({
        status: "BAD_REQUEST",
        message: errors,
      });
    }
    return next();
  } catch (error) {
    console.error("profileValidation -> addExperiecne()", error);
    return res.status(500).json({
      status: "SERVER_ERROR",
      message: error.message,
    });
  }
};
