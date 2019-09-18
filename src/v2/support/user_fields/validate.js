const Joi = require('@hapi/joi');

const id = Joi.number().min(1);
const field_id = Joi.number().min(1);
const data = Joi.object();

module.exports = {
  list: null, // no options

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

  reorder: options =>
    Joi.object({
      data: data.required()
    }).validate(options),

  listOptions: options =>
    Joi.object({
      field_id: field_id.required()
    }).validate(options),

  showOption: options =>
    Joi.object({
      field_id: field_id.required(),
      id: id.required()
    }).validate(options),

  createOrUpdateOption: options =>
    Joi.object({
      field_id: field_id.required(),
      data: data.required()
    }).validate(options),

  deleteOption: options =>
    Joi.object({
      field_id: field_id.required(),
      id: id.required()
    }).validate(options)
};
