const Joi = require('@hapi/joi');
const { validate, prepare } = require('../../utils/options');

// Validation
const _id = Joi.number().min(1);
const _data = Joi.object();

// Initialize Endpoint
module.exports = (options = {}) => {
  const { error } = validate(options);
  if (error) throw new Error(error.details[0].message);

  const { url, headers } = prepare(options);

  return {
    /**
     * List Locales
     *
     * GET /api/v2/locales.json
     * https://developer.zendesk.com/rest_api/docs/support/locales#list-locales
     */
    list: () => {
      // Ignore any options
      return {
        method: 'GET',
        url: `${url}/api/v2/locales.json`,
        headers
      };
    },

    /**
     * List Available Public Locales
     *
     * GET /api/v2/locales/public.json
     * https://developer.zendesk.com/rest_api/docs/support/locales#list-available-public-locales
     */
    public: () => {
      // Ignore any options
      return {
        method: 'GET',
        url: `${url}/api/v2/locales/public.json`,
        headers
      };
    },

    /**
     * List Locales for Agent
     *
     * GET /api/v2/locales/agent.json
     * https://developer.zendesk.com/rest_api/docs/support/locales#list-locales-for-agent
     */
    agent: () => {
      // Ignore any options
      return {
        method: 'GET',
        url: `${url}/api/v2/locales/agent.json`,
        headers
      };
    },

    /**
     * Show Locale
     *
     * GET /api/v2/locales/{id}.json
     * https://developer.zendesk.com/rest_api/docs/support/locales#show-locale
     */
    show: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/locales/${id}.json`,
        headers
      };
    },

    /**
     * Show Current Locale
     *
     * GET /api/v2/locales/current.json
     * https://developer.zendesk.com/rest_api/docs/support/locales#show-current-locale
     */
    current: () => {
      // Ignore any options
      return {
        method: 'GET',
        url: `${url}/api/v2/locales/current.json`,
        headers
      };
    },

    /**
     * Detect best language for user
     *
     * GET /api/v2/locales/detect_best_locale.json
     * https://developer.zendesk.com/rest_api/docs/support/locales#detect-best-language-for-user
     */
    detect: (options = {}) => {
      const { error } = Joi.object({
        data: _data.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { data } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/locales/detect_best_locale.json`,
        headers,
        data
      };
    }
  };
};
