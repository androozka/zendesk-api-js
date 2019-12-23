const Joi = require('@hapi/joi');

const id = Joi.number().min(1);
const ids = Joi.string().min(3);
const data = Joi.object();

module.exports = {
  list: null, // no options

  create: options =>
    Joi.object({
      data: data.required()
    }).validate(options),

  show: options =>
    Joi.object({
      id: id.required()
    }).validate(options),

  show_many: options =>
    Joi.object({
      ids: ids.required()
    }).validate(options),

  update: options =>
    Joi.object({
      id: id.required(),
      data: data.required()
    }).validate(options),

  delete: options =>
    Joi.object({
      id: id.required()
    }).validate(options),

  reorder: options =>
    Joi.object({
      data: data.required()
    }).validate(options),

  clone: options =>
    Joi.object({
      id: id.required()
    }).validate(options)
};
