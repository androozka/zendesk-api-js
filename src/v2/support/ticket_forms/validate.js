const Joi = require('@hapi/joi');

const id = Joi.number().min(1);
const ids = Joi.string().min(3);
const data = Joi.object();

module.exports = {
  list: null, // no options
  create: options => Joi.validate(options, { data: data.required() }),
  show: options => Joi.validate(options, { id: id.required() }),
  show_many: options => Joi.validate(options, { ids: ids.required() }),
  update: options =>
    Joi.validate(options, { id: id.required(), data: data.required() }),
  delete: options => Joi.validate(options, { id: id.required() }),
  reorder: options => Joi.validate(options, { data: data.required() }),
  clone: options => Joi.validate(options, { id: id.required() })
};
