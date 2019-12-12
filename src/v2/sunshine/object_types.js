const Joi = require('@hapi/joi');

const _key = Joi.string()
  .min(2)
  .max(32);
const _data = Joi.object({
  key: _key,
  schema: Joi.object({
    properties: Joi.object(),
    required: Joi.array()
  }),
  end_users_can_read: Joi.bool()
});

module.exports = ({ instance, headers }) => {
  const url = `https://${instance}.zendesk.com`;

  return {
    list: () => {
      // Ignore any options
      return {
        method: 'GET',
        url: `${url}/api/sunshine/objects/types`,
        headers
      };
    },

    show: (options = {}) => {
      const { error } = Joi.object({
        key: _key.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { key } = options;
      return {
        method: 'GET',
        url: `${url}/api/sunshine/objects/types/${key}`,
        headers
      };
    },

    create: (options = {}) => {
      const { error } = Joi.object({
        data: _data.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { data } = options;
      return {
        method: 'POST',
        url: `${url}/api/sunshine/objects/types`,
        headers,
        data
      };
    },

    update: (options = {}) => {
      const { error } = Joi.object({
        key: _key.required(),
        data: _data.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { key, data } = options;
      return {
        method: 'PUT',
        url: `${url}/api/sunshine/objects/types/${key}`,
        headers,
        data
      };
    },

    delete: (options = {}) => {
      const { error } = Joi.object({
        key: _key.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { key } = options;
      return {
        method: 'DELETE',
        url: `${url}/api/sunshine/objects/types/${key}`,
        headers
      };
    }
  };
};
