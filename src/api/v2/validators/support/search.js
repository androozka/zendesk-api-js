const Joi = require('@hapi/joi');

const search_string = Joi.string().min(1);

module.exports = options =>
  Joi.validate(options, { search_string: search_string.required() });
