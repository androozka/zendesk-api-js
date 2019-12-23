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
  list: options =>
    Joi.object({
      type,
      id
    }).validate(options),

  show: options =>
    Joi.object({
      id: id.required()
    }).validate(options),

  show_many: options =>
    Joi.object({
      ids,
      external_ids
    }).validate(options),

  related: options =>
    Joi.object({
      id: id.required()
    }).validate(options),

  create: options =>
    Joi.object({
      data: data.required()
    }).validate(options),

  create_or_update: options =>
    Joi.object({
      data: data.required()
    }).validate(options),

  create_or_update_many: options =>
    Joi.object({
      data: data.required()
    }).validate(options),

  merge_self: options =>
    Joi.object({
      data: data.required()
    }).validate(options),

  merge: options =>
    Joi.object({
      id: id.required(),
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
      external_ids,
      data: data.required()
    }).validate(options),

  delete_many: options =>
    Joi.object({
      ids,
      external_ids
    }).validate(options),

  delete: options =>
    Joi.object({
      id: id.required()
    }).validate(options),

  search: options =>
    Joi.object({
      query,
      external_id
    }).validate(options),

  autocomplete: options =>
    Joi.object({
      name: name.required()
    }).validate(options),

  request_create: options =>
    Joi.object({
      data: data.required()
    }).validate(options),

  list_deleted: null, // no options

  show_deleted: options =>
    Joi.object({
      id: id.required()
    }).validate(options),

  permanently_delete: options =>
    Joi.object({
      id: id.required()
    }).validate(options),

  compliance_deletion_statuses: options =>
    Joi.object({
      id: id.required()
    }).validate(options),

  current: null // no options
};
