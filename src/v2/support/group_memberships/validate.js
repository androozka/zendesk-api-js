const Joi = require('@hapi/joi');

const id = Joi.number().min(1);
const ids = Joi.string().min(3);
const user_id = Joi.number().min(1);
const group_id = Joi.number().min(1);
const membership_id = Joi.number().min(1);
const data = Joi.object();

module.exports = {
  list: options =>
    Joi.object({
      user_id,
      group_id
    }).validate(options),

  assignable: options =>
    Joi.object({
      group_id
    }).validate(options),

  show: options =>
    Joi.object({
      id: id.required(),
      user_id
    }).validate(options),

  create: options =>
    Joi.object({
      user_id,
      data: data.required()
    }).validate(options),

  create_many: options =>
    Joi.object({
      data: data.required()
    }).validate(options),

  delete: options =>
    Joi.object({
      id: id.required(),
      user_id
    }).validate(options),

  delete_many: options =>
    Joi.object({
      ids: ids.required()
    }).validate(options),

  default: options =>
    Joi.object({
      user_id: user_id.required(),
      membership_id: membership_id.required()
    }).validate(options)
};
