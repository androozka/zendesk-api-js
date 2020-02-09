const Joi = require('@hapi/joi');
const { validate, prepare } = require('../../utils/options');

// Validation
const _id = Joi.number().positive();
const _holiday_id = Joi.number().positive();
const _data = Joi.object();

// Initialize Endpoint
module.exports = (options = {}) => {
  const { error } = validate(options);
  if (error) throw new Error(error.details[0].message);

  const { url, headers } = prepare(options);

  return {
    /**
     * List all schedules
     *
     * GET /api/v2/business_hours/schedules.json
     * https://developer.zendesk.com/rest_api/docs/support/schedules#list-all-schedules
     */
    list: () => {
      // Ignore any options
      return {
        method: 'GET',
        url: `${url}/api/v2/business_hours/schedules.json`,
        headers
      };
    },

    /**
     * Show a schedule
     *
     * GET /api/v2/business_hours/schedules/{id}.json
     * https://developer.zendesk.com/rest_api/docs/support/schedules#show-a-schedule
     */
    show: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/business_hours/schedules/${id}.json`,
        headers
      };
    },

    /**
     * Create a schedule
     *
     * POST /api/v2/business_hours/schedules.json
     * https://developer.zendesk.com/rest_api/docs/support/schedules#create-a-schedule
     */
    create: (options = {}) => {
      const { error } = Joi.object({
        data: _data.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { data } = options;
      return {
        method: 'POST',
        url: `${url}/api/v2/business_hours/schedules.json`,
        headers,
        data
      };
    },

    /**
     * Update a schedule
     *
     * PUT /api/v2/business_hours/schedules/{id}.json
     * https://developer.zendesk.com/rest_api/docs/support/schedules#update-a-schedule
     */
    update: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required(),
        data: _data.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id, data } = options;
      return {
        method: 'PUT',
        url: `${url}/api/v2/business_hours/schedules/${id}.json`,
        headers,
        data
      };
    },

    /**
     * Delete a schedule
     *
     * DELETE /api/v2/business_hours/schedules/{id}.json
     * https://developer.zendesk.com/rest_api/docs/support/schedules#delete-a-schedule
     */
    delete: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'DELETE',
        url: `${url}/api/v2/business_hours/schedules/${id}.json`,
        headers
      };
    },

    /**
     * Update intervals for a schedule
     *
     * PUT /api/v2/business_hours/schedules/{id}/workweek.json
     * https://developer.zendesk.com/rest_api/docs/support/schedules#update-intervals-for-a-schedule
     */
    update_intervals: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required(),
        data: _data.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id, data } = options;
      return {
        method: 'PUT',
        url: `${url}/api/v2/business_hours/schedules/${id}/workweek.json`,
        headers,
        data
      };
    },

    /**
     * List holidays for a schedule
     *
     * GET /api/v2/business_hours/schedules/{id}/holidays.json
     * https://developer.zendesk.com/rest_api/docs/support/schedules#list-holidays-for-a-schedule
     */
    list_holidays: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/business_hours/schedules/${id}/holidays.json`,
        headers
      };
    },

    /**
     * Show a holiday
     *
     * GET /api/v2/business_hours/schedules/{id}/holidays/{holiday_id}.json
     * https://developer.zendesk.com/rest_api/docs/support/schedules#show-a-holiday
     */
    show_holiday: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required(),
        holiday_id: _holiday_id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id, holiday_id } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/business_hours/schedules/${id}/holidays/${holiday_id}.json`,
        headers
      };
    },

    /**
     * Create a holiday
     *
     * POST /api/v2/business_hours/schedules/{id}/holidays.json
     * https://developer.zendesk.com/rest_api/docs/support/schedules#create-a-holiday
     */
    create_holiday: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required(),
        data: _data.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id, data } = options;
      return {
        method: 'POST',
        url: `${url}/api/v2/business_hours/schedules/${id}/holidays.json`,
        headers,
        data
      };
    },

    /**
     * Update a holiday
     *
     * PUT /api/v2/business_hours/schedules/{id}/holidays/{holiday_id}.json
     * https://developer.zendesk.com/rest_api/docs/support/schedules#update-a-holiday
     */
    update_holiday: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required(),
        holiday_id: _holiday_id.required(),
        data: _data.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id, holiday_id, data } = options;
      return {
        method: 'PUT',
        url: `${url}/api/v2/business_hours/schedules/${id}/holidays/${holiday_id}.json`,
        headers,
        data
      };
    },

    /**
     * Delete a holiday
     *
     * DELETE /api/v2/business_hours/schedules/{id}/holidays/{id}.json
     * https://developer.zendesk.com/rest_api/docs/support/schedules#delete-a-holiday
     */
    delete_holiday: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required(),
        holiday_id: _holiday_id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id, holiday_id } = options;
      return {
        method: 'DELETE',
        url: `${url}/api/v2/business_hours/schedules/${id}/holidays/${holiday_id}.json`,
        headers
      };
    }
  };
};
