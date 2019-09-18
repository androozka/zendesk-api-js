const Joi = require('@hapi/joi');

const type = Joi.string().valid('tickets', 'organizations', 'users');
const id = Joi.number().min(1);
const name = Joi.string().min(1);
const data = Joi.object();

module.exports = {
  list: null, // no options

  show: options =>
    Joi.object({
      type: type.required(),
      id: id.required()
    }).validate(options),

  set: options =>
    Joi.object({
      type: type.required(),
      id: id.required(),
      data: data.required()
    }).validate(options),

  add: options =>
    Joi.object({
      type: type.required(),
      id: id.required(),
      data: data.required()
    }).validate(options),

  remove: options =>
    Joi.object({
      type: type.required(),
      id: id.required(),
      data: data.required()
    }).validate(options),

  autocomplete: options =>
    Joi.object({
      name: name.required()
    }).validate(options)
};
