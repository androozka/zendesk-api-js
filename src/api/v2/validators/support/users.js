const Joi = require('@hapi/joi');

const type = Joi.string().valid('', 'groups', 'organizations');
const id = Joi.number().min(1);
const ids = Joi.string().min(3);
const external_id = Joi.string().min(1);
const external_ids = Joi.string().min(1);
const query = Joi.string().min(3);
const name = Joi.string().min(1);
const data = Joi.object();

module.exports = {
  list: options => Joi.validate(options, { type, id }),
  show: options => Joi.validate(options, { id: id.required() }),
  show_many: options => Joi.validate(options, { ids, external_ids }),
  related: options => Joi.validate(options, { id: id.required() }),
  create: options => Joi.validate(options, { data: data.required() }),
  create_or_update: options => Joi.validate(options, { data: data.required() }),
  create_or_update_many: options =>
    Joi.validate(options, { data: data.required() }),
  merge_self: options => Joi.validate(options, { data: data.required() }),
  merge: options =>
    Joi.validate(options, { id: id.required(), data: data.required() }),
  create_many: options => Joi.validate(options, { data: data.required() }),
  update: options =>
    Joi.validate(options, { id: id.required(), data: data.required() }),
  update_many: options =>
    Joi.validate(options, { ids, external_ids, data: data.required() }),
  delete_many: options => Joi.validate(options, { ids, external_ids }),
  delete: options => Joi.validate(options, { id: id.required() }),
  search: options => Joi.validate(options, { query, external_id }),
  autocomplete: options => Joi.validate(options, { name: name.required() }),
  request_create: options => Joi.validate(options, { data: data.required() }),
  list_deleted: null, // no options
  show_deleted: options => Joi.validate(options, { id: id.required() }),
  permanently_delete: options => Joi.validate(options, { id: id.required() }),
  compliance_deletion_statuses: options =>
    Joi.validate(options, { id: id.required() }),
  current: null // no options
};
