const Joi = require('@hapi/joi');
const { validate, prepare } = require('../../utils/options');

// Validation
const _search_string = Joi.string().min(1);

// Initialize Endpoint
module.exports = (options = {}) => {
  const { error } = validate(options);
  if (error) throw new Error(error.details[0].message);

  const { url, headers } = prepare(options);

  /**
   * List Search Results
   *
   * GET /api/v2/search.json?query={search_string}
   * https://developer.zendesk.com/rest_api/docs/support/search#list-search-results
   */
  return {
    list: (options = {}) => {
      const { error } = Joi.object({
        search_string: _search_string.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { search_string } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/search.json?query=${search_string}`,
        headers
      };
    },

    /**
     * Show Results Count
     *
     * GET /api/v2/search/count.json?query={search_string}
     * https://developer.zendesk.com/rest_api/docs/support/search#show-results-count
     */
    count: (options = {}) => {
      const { error } = Joi.object({
        search_string: _search_string.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { search_string } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/search/count.json?query=${search_string}`,
        headers
      };
    }
  };
};
