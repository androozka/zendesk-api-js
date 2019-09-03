const Joi = require('@hapi/joi');

const id = Joi.number().min(1);
const data = Joi.object();

module.exports = {
  list: null, // no options
  show: options => Joi.validate(options, { id: id.required() }),
  create: options => Joi.validate(options, { data: data.required() }),
  update: options =>
    Joi.validate(options, { id: id.required(), data: data.required() }),
  delete: options => Joi.validate(options, { id: id.required() }),
  reorder: options => Joi.validate(options, { data: data.required() })
};
