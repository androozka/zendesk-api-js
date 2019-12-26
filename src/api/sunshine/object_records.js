const Joi = require('@hapi/joi');
const { validate, prepare } = require('../../utils/options');

// Validation
const _object_type = Joi.string().min(1);
const _type = Joi.string().min(1);
const _id = Joi.number().min(1);
const _ids = Joi.string().min(1);
const _relationship_type = Joi.string().min(1);
const _external_id = Joi.string().min(1);
const _external_ids = Joi.string().min(1);
const _data = Joi.object();

// Initialize Endpoint
module.exports = (options = {}) => {
  const { error } = validate(options);
  if (error) throw new Error(error.details[0].message);

  const { url, headers } = prepare(options);

  return {
    /**
     * List Object Records (by Object Type, IDs, or Relationship)
     *
     * GET /api/sunshine/objects/records?type={object_type}
     * https://developer.zendesk.com/rest_api/docs/sunshine/resources#list-object-records-by-type
     *
     * GET /api/sunshine/objects/records?ids={id, id, ...}
     * https://developer.zendesk.com/rest_api/docs/sunshine/resources#list-object-records-by-id
     *
     * GET /api/sunshine/objects/records/{id}/related/{relationship_type}
     * https://developer.zendesk.com/rest_api/docs/sunshine/resources#list-related-object-records
     */
    list: (options = {}) => {
      const { error } = Joi.object({
        object_type: _object_type,
        ids: _ids,
        id: _id,
        relationship_type: _relationship_type
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { object_type, ids, id, relationship_type } = options;
      if (!object_type && !ids && !(id && relationship_type))
        throw new Error(
          'object_type, ids, or id with relationship_type required'
        );

      return {
        method: 'GET',
        url: `${url}/api/sunshine/objects/records${
          object_type
            ? `?type=${object_type}`
            : ids
            ? `?ids=${ids}`
            : `/${id}/related/${relationship_type}`
        }`,
        headers
      };
    },

    /**
     * Show Object Record (by ID,  External ID, or External IDs)
     *
     * GET /api/sunshine/objects/records/{id}
     * https://developer.zendesk.com/rest_api/docs/sunshine/resources#show-object-record
     *
     * GET /api/sunshine/objects/records?type={object_type}&external_id={id}
     * GET /api/sunshine/objects/records?type={object_type}&external_ids={id, id, ...}
     * https://developer.zendesk.com/rest_api/docs/sunshine/resources#show-object-record-by-external-id
     *
     */
    show: (options = {}) => {
      const { error } = Joi.object({
        id: _id,
        object_type: _object_type,
        external_id: _external_id,
        external_ids: _external_ids
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id, object_type, external_id, external_ids } = options;
      if (!id && !object_type) throw new Error('id or object_type required');
      if (object_type && !external_id && !external_ids)
        throw new Error(
          'object_type requires either external_id or external_ids set'
        );

      return {
        method: 'GET',
        url: `${url}/api/sunshine/objects/records${
          id
            ? `/${id}`
            : `?type=${object_type}&external_id${
                external_id ? `=${external_id}` : `s=${external_ids}`
              }`
        }`,
        headers
      };
    },

    /**
     * Create Object Record
     *
     * POST /api/sunshine/objects/records
     * https://developer.zendesk.com/rest_api/docs/sunshine/resources#create-object-record
     */
    create: (options = {}) => {
      const { error } = Joi.object({
        data: _data.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { data } = options;
      return {
        method: 'POST',
        url: `${url}/api/sunshine/objects/records`,
        headers,
        data
      };
    },

    /**
     * Update Object Record (or Set by External ID)
     *
     * PATCH /api/sunshine/objects/records/{id}
     * https://developer.zendesk.com/rest_api/docs/sunshine/resources#update-object-record
     *
     * PATCH /api/sunshine/objects/records
     * https://developer.zendesk.com/rest_api/docs/sunshine/resources#set-object-record-by-external-id
     */
    update: (options = {}) => {
      const { error } = Joi.object({
        id: _id,
        data: _data.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id, data } = options;
      return {
        method: 'PATCH',
        url: `${url}/api/sunshine/objects/records${id ? `/${id}` : ''}`,
        headers,
        data
      };
    },

    /**
     * Delete Object Record
     *
     * DELETE /api/sunshine/objects/records/{id}
     * https://developer.zendesk.com/rest_api/docs/sunshine/resources#delete-object-record
     *
     * DELETE /api/sunshine/objects/records?external_id={external_id}&type={type}
     * https://developer.zendesk.com/rest_api/docs/sunshine/resources#delete-object-record-by-external-id
     */
    delete: (options = {}) => {
      const { error } = Joi.object({
        id: _id,
        external_id: _external_id,
        type: _type
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id, external_id, type } = options;
      if (!id && !(external_id && type))
        throw new Error('id or external_id with type required');

      return {
        method: 'DELETE',
        url: `${url}/api/sunshine/objects/records${
          id ? `/${id}` : `?external_id=${external_id}&type=${type}`
        }`,
        headers
      };
    }
  };
};
