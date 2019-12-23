const Joi = require('@hapi/joi');

const data = Joi.object().min(1);

module.exports = {
  single: options =>
    Joi.object({
      data: data.required()
    }).validate(options),

  bulk: options =>
    Joi.object({
      data: data.required()
    }).validate(options)
};
