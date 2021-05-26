const joi = require("joi");

module.exports.registerValidation = async function (req, res, next) {
  try {
    const bodySchema = joi.object().keys({
      name: joi.string().min(2).max(20).required(),
      email: joi.string().email().required(),
      password: joi
        .string()
        .regex(/^[\w]{6,30}$/)
        .required(),
      password_confirmation: joi
        .any()
        .equal(joi.ref("password"))
        .required()
        .label("Confirm password")
        .messages({ "any.only": "{{#label}} does not match" }),
    });

    let options = { abortEarly: false, allowUnknown: true };

    const bodyValidation = bodySchema.validate(req.body, options);
    const validationError = bodyValidation.error;

    console.log(validationError);

    if (validationError) {
      let errors = validationError.details.map((error) => {
        return error.message;
      });
      return res.status(400).send({
        status: "BAD_REQUEST",
        message: errors,
      });
    }
    return next();
  } catch (error) {
    console.error("userJoiValidation -> registerValidation", error);
    return res.status(500).json({
      status: "SERVER_ERROR",
      message: "Internal Server Error",
    });
  }
};

module.exports.loginValidation = function (req, res, next) {
  try {
    const bodySchema = joi.object().keys({
      email: joi.string().email().required(),
      password: joi
        .string()
        .regex(/^[\w]{6,30}$/)
        .required(),
    });
    const options = { abortEarly: false, allowUnknown: true };

    const bodyValidation = bodySchema.validate(req.body, options);
    const validationError = bodyValidation.error;

    if (validationError) {
      let errors = validationError.details.map((error) => {
        return error.message;
      });
      return res.status(400).send({
        status: "BAD_REQUEST",
        message: errors,
      });
    }

    return next();
  } catch (error) {
    console.error("userValidation -> loginValidation", error);
    return res.status(500).json({
      status: "SERVER_ERROR",
      message: "Internal Server Error",
    });
  }
};

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
      instagram: joi.string().uri().optional()
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
