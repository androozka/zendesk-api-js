const Joi = require('@hapi/joi');

const ticket_id = Joi.number().min(1);
const ticket_metric_id = Joi.number().min(1);

module.exports = {
  list: null, // no options
  show: options => Joi.validate(options, { ticket_id, ticket_metric_id })
};
