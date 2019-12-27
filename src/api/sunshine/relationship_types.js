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
     * List Relationship Types
     *
     * GET /api/sunshine/relationships/types
     * https://developer.zendesk.com/rest_api/docs/sunshine/relationship_types#list-relationship-types
     */
    list: () => {
      // Ignore any options
      return {
        method: 'GET',
        url: `${url}/api/sunshine/relationships/types`,
        headers
      };
    },

    /**
     * Show Relationship Type
     *
     * GET /api/sunshine/relationships/types/{key}
     * https://developer.zendesk.com/rest_api/docs/sunshine/relationship_types#show-relationship-type
     */
    show: (options = {}) => {
      const { error } = Joi.object({
        key: _key.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { key } = options;
      return {
        method: 'GET',
        url: `${url}/api/sunshine/relationships/types/${key}`,
        headers
      };
    },

    /**
     * Create Relationship Type
     *
     * POST /api/sunshine/relationships/types
     * https://developer.zendesk.com/rest_api/docs/sunshine/relationship_types#create-relationship-type
     */
    create: (options = {}) => {
      const { error } = Joi.object({
        data: _data.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { data } = options;
      return {
        method: 'POST',
        url: `${url}/api/sunshine/relationships/types`,
        headers,
        data
      };
    },

    /**
     * Delete Relationship Type
     *
     * DELETE /api/sunshine/relationships/types/{key}
     * https://developer.zendesk.com/rest_api/docs/sunshine/relationship_types#delete-relationship-type
     */
    delete: (options = {}) => {
      const { error } = Joi.object({
        key: _key.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { key } = options;
      return {
        method: 'DELETE',
        url: `${url}/api/sunshine/relationships/types/${key}`,
        headers
      };
    }
  };
};
