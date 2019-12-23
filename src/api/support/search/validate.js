const Joi = require('@hapi/joi');

const search_string = Joi.string().min(1);

module.exports = options =>
  Joi.object({
    search_string: search_string.required()
  }).validate(options);
