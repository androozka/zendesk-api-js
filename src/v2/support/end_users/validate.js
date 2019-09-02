const Joi = require('@hapi/joi');

const id = Joi.number().min(1);
const data = Joi.object();

module.exports = {
  show: options => Joi.validate(options, { id: id.required() }),
  update: options =>
    Joi.validate(options, { id: id.required(), data: data.required() })
};
