const Joi = require('@hapi/joi');

const activity_id = Joi.number().min(1);

module.exports = {
  list: null, // no options
  show: options =>
    Joi.validate(options, { activity_id: activity_id.required() })
};
