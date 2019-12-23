const Joi = require('@hapi/joi');

const id = Joi.number().min(1);
const ids = Joi.string().min(3);
const user_id = Joi.number().min(1);
const external_id = Joi.number().min(1);
const external_ids = Joi.string().min(1);
const name = Joi.string().min(1);
const data = Joi.object();

module.exports = {
  list: options =>
    Joi.object({
      user_id
    }).validate(options),

  autocomplete: options =>
    Joi.object({
      name: name.required()
    }).validate(options),

  related: options =>
    Joi.object({
      id: id.required()
    }).validate(options),

  show: options =>
    Joi.object({
      id: id.required()
    }).validate(options),

  show_many: options =>
    Joi.object({
      ids,
      external_ids
    }).validate(options),

  create: options =>
    Joi.object({
      data: data.required()
    }).validate(options),

  create_many: options =>
    Joi.object({
      data: data.required()
    }).validate(options),

  create_or_update: options =>
    Joi.object({
      data: data.required()
    }).validate(options),

  update: options =>
    Joi.object({
      id: id.required(),
      data: data.required()
    }).validate(options),

  update_many: options =>
    Joi.object({
      ids,
      external_ids,
      data: data.required()
    }).validate(options),

  delete: options =>
    Joi.object({
      id: id.required()
    }).validate(options),

  delete_many: options =>
    Joi.object({
      ids,
      external_ids
    }).validate(options),

  search: options =>
    Joi.object({
      external_id: external_id.required()
    }).validate(options)
};
