const Joi = require('@hapi/joi');

const activity_id = Joi.number().min(1);

module.exports = {
  list: null, // no options

  show: options =>
    Joi.object({
      activity_id: activity_id.required()
    }).validate(options)
};
