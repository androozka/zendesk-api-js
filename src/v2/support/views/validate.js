const Joi = require('@hapi/joi');

const id = Joi.number().min(1);
const ids = Joi.string().min(3);
const query = Joi.string().min(1);
const data = Joi.object();

module.exports = {
  list: options => Joi.validate(options, { ids }),
  update_many: options => Joi.validate(options, { data: data.required() }),
  active: null, // no options
  compact: null, // no options
  show: options => Joi.validate(options, { id: id.required() }),
  create: options => Joi.validate(options, { data: data.required() }),
  update: options =>
    Joi.validate(options, { id: id.required(), data: data.required() }),
  delete: options => Joi.validate(options, { id: id.required() }),
  delete_many: options => Joi.validate(options, { data: data.required() }),
  execute: options => Joi.validate(options, { id: id.required() }),
  tickets: options => Joi.validate(options, { id: id.required() }),
  count_many: options => Joi.validate(options, { ids: ids.required() }),
  count: options => Joi.validate(options, { id: id.required() }),
  export: options => Joi.validate(options, { id: id.required() }),
  search: options => Joi.validate(options, { query: query.required() }),
  preview: options => Joi.validate(options, { data: data.required() }),
  preview_count: options => Joi.validate(options, { data: data.required() })
};
