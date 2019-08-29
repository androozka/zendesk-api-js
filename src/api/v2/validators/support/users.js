const Joi = require('@hapi/joi');

const type = Joi.string().valid('', 'groups', 'organizations');
const id = Joi.number().min(1);
const ids = Joi.string().min(3);
const external_ids = Joi.string().min(0);

module.exports = {
  list: options => Joi.validate(options, { type, id }),
  show: options => Joi.validate(options, { id: id.required() }),
  show_many: options => Joi.validate(options, { ids, external_ids })
};
