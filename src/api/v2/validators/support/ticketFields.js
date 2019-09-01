const Joi = require('@hapi/joi');

const id = Joi.number().min(1);
const field_id = Joi.number().min(1);
const data = Joi.object();

module.exports = {
  list: null, // no options
  show: options => Joi.validate(options, { id: id.required() }),
  create: options => Joi.validate(options, { data: data.required() }),
  update: options =>
    Joi.validate(options, { id: id.required(), data: data.required() }),
  delete: options => Joi.validate(options, { id: id.required() }),
  listOptions: options =>
    Joi.validate(options, { field_id: field_id.required() }),
  showOption: options =>
    Joi.validate(options, { field_id: field_id.required(), id: id.required() }),
  createOrUpdateOption: options =>
    Joi.validate(options, {
      field_id: field_id.required(),
      id: id.required(),
      data: data.required()
    }),
  deleteOption: options =>
    Joi.validate(options, { field_id: field_id.required(), id: id.required() })
};
