const Joi = require('@hapi/joi');

const id = Joi.number().min(1);
const ticket_id = Joi.number().min(1);
const data = Joi.object();

module.exports = {
  list: options => Joi.validate(options, { ticket_id: ticket_id.required() }),
  emailCCs: options =>
    Joi.validate(options, { ticket_id: ticket_id.required() }),
  redact: options =>
    Joi.validate(options, {
      ticket_id: ticket_id.required(),
      id: id.required(),
      data: data.required()
    }),
  makePrivate: options =>
    Joi.validate(options, {
      ticket_id: ticket_id.required(),
      id: id.required()
    })
};
