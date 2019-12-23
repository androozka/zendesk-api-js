const Joi = require('@hapi/joi');

const user_id = Joi.number().min(1);
const data = Joi.object();

module.exports = {
  set: options =>
    Joi.object({
      user_id: user_id.required(),
      data: data.required()
    }).validate(options),

  change: options =>
    Joi.object({
      user_id: user_id.required(),
      data: data.required()
    }).validate(options),

  requirements: options =>
    Joi.object({
      user_id: user_id.required()
    }).validate(options)
};
