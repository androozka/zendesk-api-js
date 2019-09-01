const Joi = require('@hapi/joi');

const id = Joi.number().min(1);
const user_id = Joi.number().min(1);
const data = Joi.object();

module.exports = {
  list: options => Joi.validate(options, { user_id }),
  show_assignable: null, // no options
  show: options => Joi.validate(options, { id: id.required() }),
  create: options => Joi.validate(options, { data: data.required() }),
  update: options =>
    Joi.validate(options, { id: id.required(), data: data.required() })
};
