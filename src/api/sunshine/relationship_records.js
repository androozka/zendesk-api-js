const Joi = require('@hapi/joi');
const { validate, prepare } = require('../../utils/options');

// Validation
const _id = Joi.number().min(1);
const _relationship_type = Joi.string().min(1);
const _data = Joi.object();

// Initialize Endpoint
module.exports = (options = {}) => {
  const { error } = validate(options);
  if (error) throw new Error(error.details[0].message);

  const { url, headers } = prepare(options);

  return {
    /**
     * List Relationship Records (by Object Record or Type)
     *
     * GET /api/sunshine/objects/records/{id}/relationships/{relationship_type}
     * https://developer.zendesk.com/rest_api/docs/sunshine/relationships#list-relationship-records-by-object-record
     *
     * GET /api/sunshine/relationships/records?type={relationship_type}
     * https://developer.zendesk.com/rest_api/docs/sunshine/relationships#list-relationship-records-by-type
     */
    list: (options = {}) => {
      const { error } = Joi.object({
        id: _id,
        relationship_type: _relationship_type.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id, relationship_type } = options;

      return {
        method: 'GET',
        url: `${url}/api/sunshine/${
          id
            ? `objects/records/${id}/relationships/${relationship_type}`
            : `relationships/records?type=${relationship_type}`
        }`,
        headers
      };
    },

    /**
     * Create Relationship Record
     *
     * POST /api/sunshine/relationships/records
     * https://developer.zendesk.com/rest_api/docs/sunshine/relationships#create-relationship-record
     */
    create: (options = {}) => {
      const { error } = Joi.object({
        data: _data.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { data } = options;
      return {
        method: 'POST',
        url: `${url}/api/sunshine/relationships/records`,
        headers,
        data
      };
    },

    /**
     * Delete Relationship Record
     *
     * DELETE /api/sunshine/relationships/records/{id}
     * https://developer.zendesk.com/rest_api/docs/sunshine/relationships#delete-relationship-record
     */
    delete: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'DELETE',
        url: `${url}/api/sunshine/relationships/records/${id}`,
        headers
      };
    }
  };
};
