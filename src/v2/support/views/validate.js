const Joi = require('@hapi/joi');

const id = Joi.number().min(1);
const ids = Joi.string().min(3);
const query = Joi.string().min(1);
const data = Joi.object();

module.exports = {
  list: options =>
    Joi.object({
      ids
    }).validate(options),

  update_many: options =>
    Joi.object({
      data: data.required()
    }).validate(options),

  active: null, // no options

  compact: null, // no options

  show: options =>
    Joi.object({
      id: id.required()
    }).validate(options),

  create: options =>
    Joi.object({
      data: data.required()
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

  delete_many: options =>
    Joi.object({
      data: data.required()
    }).validate(options),

  execute: options =>
    Joi.object({
      id: id.required()
    }).validate(options),

  tickets: options =>
    Joi.object({
      id: id.required()
    }).validate(options),

  count_many: options =>
    Joi.object({
      ids: ids.required()
    }).validate(options),

  count: options =>
    Joi.object({
      id: id.required()
    }).validate(options),

  export: options =>
    Joi.object({
      id: id.required()
    }).validate(options),

  search: options =>
    Joi.object({
      query: query.required()
    }).validate(options),

  preview: options =>
    Joi.object({
      data: data.required()
    }).validate(options),

  preview_count: options =>
    Joi.object({
      data: data.required()
    }).validate(options)
};
