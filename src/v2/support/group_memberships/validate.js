const Joi = require('@hapi/joi');

const id = Joi.number().min(1);
const ids = Joi.string().min(3);
const user_id = Joi.number().min(1);
const group_id = Joi.number().min(1);
const membership_id = Joi.number().min(1);
const data = Joi.object();

module.exports = {
  list: options => Joi.validate(options, { user_id, group_id }),
  assignable: options => Joi.validate(options, { group_id }),
  show: options => Joi.validate(options, { id: id.required(), user_id }),
  create: options => Joi.validate(options, { user_id, data: data.required() }),
  create_many: options => Joi.validate(options, { data: data.required() }),
  delete: options => Joi.validate(options, { id: id.required(), user_id }),
  delete_many: options => Joi.validate(options, { ids: ids.required() }),
  default: options =>
    Joi.validate(options, {
      user_id: user_id.required(),
      membership_id: membership_id.required()
    })
};
