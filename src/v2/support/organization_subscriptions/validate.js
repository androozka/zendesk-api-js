const Joi = require("@hapi/joi");

const id = Joi.number().min(1);
const user_id = Joi.number().min(1);
const organization_id = Joi.number().min(1);
const data = Joi.object();

module.exports = {
  list: options =>
    Joi.object({
      user_id,
      organization_id
    }).validate(options),

  show: options =>
    Joi.object({
      id: id.required()
    }).validate(options),

  create: options =>
    Joi.object({
      data: data.required()
    }).validate(options),

  delete: options =>
    Joi.object({
      id: id.required()
    }).validate(options)
};
