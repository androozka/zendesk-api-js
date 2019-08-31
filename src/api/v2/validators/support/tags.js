const Joi = require('@hapi/joi');

const type = Joi.string().valid('tickets', 'organizations', 'users');
const id = Joi.number().min(1);
const name = Joi.string().min(1);
const data = Joi.object();

module.exports = {
  list: null, // no options
  show: options =>
    Joi.validate(options, { type: type.required(), id: id.required() }),
  set: options =>
    Joi.validate(options, {
      type: type.required(),
      id: id.required(),
      data: data.required()
    }),
  add: options =>
    Joi.validate(options, {
      type: type.required(),
      id: id.required(),
      data: data.required()
    }),
  remove: options =>
    Joi.validate(options, { type: type.required(), id: id.required() }),
  autocomplete: options => Joi.validate(options, { name: name.required() })
};
