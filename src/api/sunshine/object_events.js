// const Joi = require('@hapi/joi');
const { validate, prepare } = require('../../utils/options');

// Validation
// const _id = Joi.number().positive();
// const _data = Joi.object();

// Initialize Endpoint
module.exports = (options = {}) => {
  const { error } = validate(options);
  if (error) throw new Error(error.details[0].message);

  const { url, headers } = prepare(options);

  return {
    /**
     * List Custom Objects Events
     *
     * GET api/sunshine/objects/events
     * https://developer.zendesk.com/rest_api/docs/sunshine/object_events#list-custom-objects-events
     */
    list: () => {
      // Ignore any options
      return {
        method: 'GET',
        url: `${url}/api/sunshine/objects/events`,
        headers
      };
    }
  };
};
