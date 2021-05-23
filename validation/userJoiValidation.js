const joi = require("joi");

module.exports.registerValidation = async function (req, res, next) {
    try {
        const bodySchema = joi.object().keys({
            name: joi.string().min(2).max(20).required(),
            email: joi.string().email().required(),
            password: joi.string().regex(/^[\w]{6,30}$/).required(),
            password_confirmation: joi
                .any()
                .equal(joi.ref("password"))
                .required()
                .label("Confirm password")
                .messages({ "any.only": "{{#label}} does not match" }),
        });

        let options = { abortEarly: false , allowUnknown: true};

        const bodyValidation = bodySchema.validate(req.body, options);
        const validationError = bodyValidation.error;

        console.log(validationError);

        if (validationError) {
            let errors = validationError.details.map(error =>{
                return error.message
            })
            return res.status(400).send({
                status: "BAD_REQUEST",
                message: errors,
            });
        }
        return next();
    } catch (error) {
        console.error("userJoiValidation -> registerValidation", error);
        res.status(500).json({
            status: "SERVER_ERROR",
            message: "Internal Server Error",
        });
    }
};

module.exports.loginValidation = function (req, res, next) {

    try {
        const bodySchema = joi.object().keys({
            email: joi.string().email().required(),
            password: joi.string().regex(/^[\w]{6,30}$/).required(),
            
        });
        let options = { abortEarly: false , allowUnknown: true};

        const bodyValidation = bodySchema.validate(req.body, options);
        const validationError = bodyValidation.error;

        if (validationError) {
            return res.status(400).send({
                status: "BAD_REQUEST",
                message: validationError.details[0].message,
            })
        }

        return next();

    } catch (error) {
        console.error('userValidation -> loginValidation', error);
        res.status(500).json({
            status: 'SERVER_ERROR',
            message: 'Internal Server Error'
        })
    }

};
