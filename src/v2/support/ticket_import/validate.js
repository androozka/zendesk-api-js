const Joi = require('@hapi/joi');

const data = Joi.object().min(1);

module.exports = {
  single: options => Joi.validate(options, { data: data.required() }),
  bulk: options => Joi.validate(options, { data: data.required() })
};
