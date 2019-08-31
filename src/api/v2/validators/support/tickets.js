const Joi = require('@hapi/joi');

const type = Joi.string().valid(
  'tickets',
  'organizations',
  'users_requested',
  'users_ccd',
  'users_assigned',
  'recent'
);
const id = Joi.number().min(1);
const ids = Joi.string().min(3);
const external_id = Joi.string().min(1);
const name = Joi.string().min(1);
const data = Joi.object();

module.exports = {
  list: options => Joi.validate(options, { type, id }),
  list_by_external_id: options =>
    Joi.validate(options, { external_id: external_id.required() }),
  show: options => Joi.validate(options, { id: id.required() }),
  show_many: options => Joi.validate(options, { ids: ids.required() }),
  create: options => Joi.validate(options, { data: data.required() }),
  create_many: options => Joi.validate(options, { data: data.required() }),
  update: options =>
    Joi.validate(options, { id: id.required(), data: data.required() }),
  update_many: options => Joi.validate(options, { ids, data: data.required() }),
  mark_as_spam: options => Joi.validate(options, { id: id.required() }),
  mark_as_spam_bulk: options => Joi.validate(options, { ids: ids.required() }),
  merge: options =>
    Joi.validate(options, { id: id.required(), data: data.required() }),
  related: options => Joi.validate(options, { id: id.required() }),
  delete: options => Joi.validate(options, { id: id.required() }),
  delete_bulk: options => Joi.validate(options, { ids: ids.required() }),
  deleted: null, // no options
  restore: options => Joi.validate(options, { id: id.required() }),
  restore_bulk: options => Joi.validate(options, { ids: ids.required() }),
  delete_permanently: options => Joi.validate(options, { id: id.required() }),
  delete_permanently_bulk: options =>
    Joi.validate(options, { ids: ids.required() }),
  collaborators: options => Joi.validate(options, { id: id.required() }),
  followers: options => Joi.validate(options, { id: id.required() }),
  email_ccs: options => Joi.validate(options, { id: id.required() }),
  incidents: options => Joi.validate(options, { id: id.required() }),
  problems: null, // no options
  autocomplete_problems: options =>
    Joi.validate(options, { name: name.required() })
};
