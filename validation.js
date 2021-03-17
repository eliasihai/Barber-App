// VALIDATION
const Joi = require("@hapi/joi");

// Register Validation
const registerValidation = (data) => {
  const userSchema = Joi.object({
    first_name: Joi.string().min(1).required().error(()=> `"First Name" is a required field`),
    last_name: Joi.string().min(1).required().error(()=> `"Last Name" is a required field`),
    email: Joi.string().min(6).required().email().error(()=> `"Email" must be valid`),
    password: Joi.string().min(6).required().error(()=>`"Password" length must be at least 6 characters long`),
    // phone: Joi.string().min(4).required(),
    phoneNumberSelected1: Joi.string().required().error(()=> "Code Area is a required field"),
    phone_digits: Joi.string().required().error(()=> `"Phone Digits" is a required field`),
    type: Joi.string().required(),
  });

  return userSchema.validate(data);
};

const registerBarberValidation = (data) => {
  const barberSchema = Joi.object({
    first_name: Joi.string().min(1).required().error(()=> `"First Name" is a required field`),
    last_name: Joi.string().min(1).required().error(()=> `"Last Name" is a required field`),
    email: Joi.string().min(6).required().email().error(()=> `"Email" must be valid`),
    password: Joi.string().min(6).required().error(()=>`"Password" length must be at least 6 characters long`),
    // phone: Joi.string().min(4).required(),
    phoneNumberSelected1: Joi.string().required().error(()=> "Code Area is a required field"),
    phone_digits: Joi.string().required().error(()=> `"Phone Digits" is a required field`),
    type: Joi.string().required(),
  });

  return barberSchema.validate(data);
};

// Login Validation
const loginValidation = (data) => {
  const userSchema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  return userSchema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.registerBarberValidation = registerBarberValidation