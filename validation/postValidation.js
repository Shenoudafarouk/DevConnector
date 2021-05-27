const joi = require("joi");

module.exports.createPostValidation = function (req, res, next) {
  try {
    const bodySchema = joi.object().keys({
      text: joi.string().min(2).max(40).required()
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

