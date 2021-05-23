const validator = require("validator");
const { isEmpty } = require("./is-empty");

module.exports.registerValidator = function (data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.paswword2 = !isEmpty(data.password2) ? data.paswword2 : "";

  console.log(typeof data.name, "=================");

  console.log(validator.isEmpty(data.password));

  if (!validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "name must be between 2 and 30 characters";
  }

  if (validator.isEmpty(data.name)) {
    errors.name = "name field is required";
  }

  if (!validator.isEmail(data.email)) {
    errors.email = "email is Invalid";
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "email field is required";
  }

  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "password must be at least 6 characters";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "password field is required";
  }

  if (validator.isEmpty(data.password2)) {
    errors.password2 = "confirm password field is required";
  }

  if (!validator.equals(data.password, data.password2)) {
    errors.password2 = "password must match";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports.loginValidator = function (data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!validator.isEmail(data.email)) {
    errors.email = "email is Invalid";
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "email field is required";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
