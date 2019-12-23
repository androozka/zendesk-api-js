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
  list: options =>
    Joi.object({
      type,
      id
    }).validate(options),

  list_by_external_id: options =>
    Joi.object({
      external_id: external_id.required()
    }).validate(options),

  show: options =>
    Joi.object({
      id: id.required()
    }).validate(options),

  show_many: options =>
    Joi.object({
      ids: ids.required()
    }).validate(options),

  create: options =>
    Joi.object({
      data: data.required()
    }).validate(options),

  create_many: options =>
    Joi.object({
      data: data.required()
    }).validate(options),

  update: options =>
    Joi.object({
      id: id.required(),
      data: data.required()
    }).validate(options),

  update_many: options =>
    Joi.object({
      ids,
      data: data.required()
    }).validate(options),

  mark_as_spam: options =>
    Joi.object({
      id: id.required()
    }).validate(options),

  mark_as_spam_bulk: options =>
    Joi.object({
      ids: ids.required()
    }).validate(options),

  merge: options =>
    Joi.object({
      id: id.required(),
      data: data.required()
    }).validate(options),

  related: options =>
    Joi.object({
      id: id.required()
    }).validate(options),

  delete: options =>
    Joi.object({
      id: id.required()
    }).validate(options),

  delete_bulk: options =>
    Joi.object({
      ids: ids.required()
    }).validate(options),

  deleted: null, // no options

  restore: options =>
    Joi.object({
      id: id.required()
    }).validate(options),

  restore_bulk: options =>
    Joi.object({
      ids: ids.required()
    }).validate(options),

  delete_permanently: options =>
    Joi.object({
      id: id.required()
    }).validate(options),

  delete_permanently_bulk: options =>
    Joi.object({
      ids: ids.required()
    }).validate(options),

  collaborators: options =>
    Joi.object({
      id: id.required()
    }).validate(options),

  followers: options =>
    Joi.object({
      id: id.required()
    }).validate(options),

  email_ccs: options =>
    Joi.object({
      id: id.required()
    }).validate(options),

  incidents: options =>
    Joi.object({
      id: id.required()
    }).validate(options),

  problems: null, // no options

  autocomplete_problems: options =>
    Joi.object({
      name: name.required()
    }).validate(options)
};
