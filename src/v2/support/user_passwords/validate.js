const Joi = require('@hapi/joi');

const user_id = Joi.number().min(1);
const data = Joi.object();

module.exports = {
  set: options =>
    Joi.validate(options, {
      user_id: user_id.required(),
      data: data.required()
    }),
  change: options =>
    Joi.validate(options, {
      user_id: user_id.required(),
      data: data.required()
    }),
  requirements: options =>
    Joi.validate(options, { user_id: user_id.required() })
};
