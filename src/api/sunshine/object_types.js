const Joi = require('@hapi/joi');
const { validate, prepare } = require('../../utils/options');

// Validation
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

// Initialize Endpoint
module.exports = (options = {}) => {
  const { error } = validate(options);
  if (error) throw new Error(error.details[0].message);

  const { url, headers } = prepare(options);

  return {
    /**
     * List Object Types
     *
     * GET /api/sunshine/objects/types
     * https://developer.zendesk.com/rest_api/docs/sunshine/resource_types#list-object-types
     */
    list: () => {
      // Ignore any options
      return {
        method: 'GET',
        url: `${url}/api/sunshine/objects/types`,
        headers
      };
    },

    /**
     * Show Object Type
     *
     * GET /api/sunshine/objects/types/{key}
     * https://developer.zendesk.com/rest_api/docs/sunshine/resource_types#show-object-type
     */
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

    /**
     * Create Object Type
     * https://developer.zendesk.com/rest_api/docs/sunshine/resource_types#create-object-type
     */
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

    /**
     * Update Object Type
     * https://developer.zendesk.com/rest_api/docs/sunshine/resource_types#update-object-type
     */
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

    /**
     * Delete Object Type
     * https://developer.zendesk.com/rest_api/docs/sunshine/resource_types#delete-object-type
     */
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
