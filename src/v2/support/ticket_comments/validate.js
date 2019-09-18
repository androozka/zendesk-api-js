const Joi = require('@hapi/joi');

const id = Joi.number().min(1);
const ticket_id = Joi.number().min(1);
const data = Joi.object();

module.exports = {
  list: options =>
    Joi.object({
      ticket_id: ticket_id.required()
    }).validate(options),

  emailCCs: options =>
    Joi.object({
      ticket_id: ticket_id.required()
    }).validate(options),

  redact: options =>
    Joi.object({
      ticket_id: ticket_id.required(),
      id: id.required(),
      data: data.required()
    }).validate(options),

  makePrivate: options =>
    Joi.object({
      ticket_id: ticket_id.required(),
      id: id.required()
    }).validate(options)
};
