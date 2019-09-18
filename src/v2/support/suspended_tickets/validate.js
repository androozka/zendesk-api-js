const Joi = require('@hapi/joi');

const id = Joi.number().min(1);
const ids = Joi.string().min(3);

module.exports = {
  list: null, // no options

  show: options =>
    Joi.object({
      id: id.required()
    }).validate(options),

  recover: options =>
    Joi.object({
      id: id.required()
    }).validate(options),

  recover_many: options =>
    Joi.object({
      ids: ids.required()
    }).validate(options),

  delete: options =>
    Joi.object({
      id: id.required()
    }).validate(options),

  delete_many: options =>
    Joi.object({
      ids: ids.required()
    }).validate(options)
};
