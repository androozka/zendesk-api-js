const Joi = require('@hapi/joi');
const { validate, prepare } = require('../../utils/options');

// Validation
const _id = Joi.number().positive();
const _data = Joi.object();

// Initialize Endpoint
module.exports = (options = {}) => {
  const { error } = validate(options);
  if (error) throw new Error(error.details[0].message);

  const { url, headers } = prepare(options);

  return {
    /**
     * List Bookmarks
     *
     * GET /api/v2/bookmarks.json
     * https://developer.zendesk.com/rest_api/docs/support/bookmarks#list-bookmarks
     */
    list: () => {
      // Ignore any options
      return {
        method: 'GET',
        url: `${url}/api/v2/bookmarks.json`,
        headers
      };
    },

    /**
     * Create Bookmark
     *
     * POST /api/v2/bookmarks.json
     * https://developer.zendesk.com/rest_api/docs/support/bookmarks#create-bookmark
     */
    create: (options = {}) => {
      const { error } = Joi.object({
        data: _data.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { data } = options;
      return {
        method: 'POST',
        url: `${url}/api/v2/bookmarks.json`,
        headers,
        data
      };
    },

    /**
     * Delete Bookmark
     *
     * DELETE /api/v2/bookmarks/{id}.json
     * https://developer.zendesk.com/rest_api/docs/support/bookmarks#delete-bookmark
     */
    delete: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'DELETE',
        url: `${url}/api/v2/bookmarks/${id}.json`,
        headers
      };
    }
  };
};
