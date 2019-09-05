const Joi = require('@hapi/joi');

const id = Joi.number().min(1);
const ids = Joi.string().min(3);

module.exports = {
  list: null, // no options
  show: options => Joi.validate(options, { id: id.required() }),
  recover: options => Joi.validate(options, { id: id.required() }),
  recover_many: options => Joi.validate(options, { ids: ids.required() }),
  delete: options => Joi.validate(options, { id: id.required() }),
  delete_many: options => Joi.validate(options, { ids: ids.required() })
};
