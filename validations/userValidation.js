const Joi = require("joi");

const insertUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
  name: Joi.string().required(),
});

const updateSchema = Joi.object({
  email: Joi.string().email(),
  password: Joi.string().min(4),
  name: Joi.string(),
});

module.exports = { insertUserSchema, updateSchema };
