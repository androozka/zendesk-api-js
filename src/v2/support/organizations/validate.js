const Joi = require('@hapi/joi');

const id = Joi.number().min(1);
const ids = Joi.string().min(3);
const user_id = Joi.number().min(1);
const external_id = Joi.number().min(1);
const external_ids = Joi.string().min(1);
const name = Joi.string().min(1);
const data = Joi.object();

module.exports = {
  list: options => Joi.validate(options, { user_id }),
  autocomplete: options => Joi.validate(options, { name: name.required() }),
  related: options => Joi.validate(options, { id: id.required() }),
  show: options => Joi.validate(options, { id: id.required() }),
  show_many: options => Joi.validate(options, { ids, external_ids }),
  create: options => Joi.validate(options, { data: data.required() }),
  create_many: options => Joi.validate(options, { data: data.required() }),
  create_or_update: options => Joi.validate(options, { data: data.required() }),
  update: options =>
    Joi.validate(options, { id: id.required(), data: data.required() }),
  update_many: options =>
    Joi.validate(options, { ids, external_ids, data: data.required() }),
  delete: options => Joi.validate(options, { id: id.required() }),
  delete_many: options => Joi.validate(options, { ids, external_ids }),
  search: options =>
    Joi.validate(options, { external_id: external_id.required() })
};
