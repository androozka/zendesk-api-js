const Joi = require('@hapi/joi');

const instance = Joi.string().min(1);
const email = Joi.string().email();
const password = Joi.string().min(1);
const token = Joi.string().min(1);

module.exports = options =>
  Joi.object({
    instance: instance.required(),
    email: email.required(),
    password,
    token
  })
    .xor('password', 'token')
    .validate(options);
