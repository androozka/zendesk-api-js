const Joi = require('@hapi/joi');

const id = Joi.number().min(1);
const user_id = Joi.number().min(1);
const end_users = Joi.boolean();
const data = Joi.object();

module.exports = {
  list: options =>
    Joi.object({
      user_id: user_id.required()
    }).validate(options),

  show: options =>
    Joi.object({
      user_id: user_id.required(),
      id: id.required()
    }).validate(options),

  create: options =>
    Joi.object({
      user_id: user_id.required(),
      end_users,
      data: data.required()
    }).validate(options),

  update: options =>
    Joi.object({
      user_id: user_id.required(),
      id: id.required(),
      data: data.required()
    }).validate(options),

  make_primary: options =>
    Joi.object({
      user_id: user_id.required(),
      id: id.required(),
      end_users,
      data
    }).validate(options),

  verify: options =>
    Joi.object({
      user_id: user_id.required(),
      id: id.required(),
      data
    }).validate(options),

  request_verification: options =>
    Joi.object({
      user_id: user_id.required(),
      id: id.required(),
      data
    }).validate(options),

  delete: options =>
    Joi.object({
      user_id: user_id.required(),
      id: id.required()
    }).validate(options)
};
