const Joi = require('@hapi/joi');

const id = Joi.number().min(1);
const data = Joi.object();

module.exports = {
  show: options =>
    Joi.object({
      id: id.required()
    }).validate(options),

  update: options =>
    Joi.object({
      id: id.required(),
      data: data.required()
    }).validate(options)
};
