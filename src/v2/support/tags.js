/**
 * ## [Tags](https://developer.zendesk.com/rest_api/docs/support/tags)
 * You must enable the tagging of users and organizations in Zendesk Support
 * for the API calls to work. Select Manage > Settings > Customers, and enable
 * the option.
 * ___
 * @param {string} instance - Name of Zendesk instance
 * @param {object} headers - Pre-assembled headers for request
 */
const tags = (instance, headers) => ({
  /**
   * ## [List Tags](https://developer.zendesk.com/rest_api/docs/support/tags#list-tags)
   * Lists the 500 most popular tags in the last 60 days, in decreasing popularity.
   * - _**GET** /api/v2/tags.json_
   * ___
   * @example
   * tags.list();
   */
  list: () => ({
    method: 'GET',
    url: `https://${instance}.zendesk.com/api/v2/tags.json`,
    headers
  }),

  /**
   * ## [Show Tags](https://developer.zendesk.com/rest_api/docs/support/tags#show-tags)
   * Lists tags for id of specified type.
   * - _**GET** /api/v2/{type}/{id}/tags.json_
   * ___
   * @param {string} type - Type of Zendesk object
   * @param {number} id - ID of Zendesk object for specified type
   *
   * @example
   * tags.show('tickets', ticket_id);
   * tags.show('organizations', organization_id);
   * tags.show('users', user_id);
   */
  show: (type, id) => ({
    method: 'GET',
    url: `https://${instance}.zendesk.com/api/v2/${type}/${id}/tags.json`,
    headers
  }),

  /**
   * ## [Set Tags](https://developer.zendesk.com/rest_api/docs/support/tags#set-tags)
   * Adds the specified tags if no tag exists, or replaces all existing tags with the specified tags.
   * - _**POST** /api/v2/{type}/{id}/tags.json_
   * ___
   * @param {string} type - Type of Zendesk object
   * @param {number} id - ID of Zendesk object of specified type
   * @param {object} data - Contains array of tags under "tags" key
   *
   * @example
   * tags.set('tickets', ticket_id, { tags: ['new_tag'] });
   * tags.set('organizations', organization_id, { tags: ['new_tag'] });
   * tags.set('users', user_id, { tags: ['new_tag'] });
   */
  set: (type, id, data) => ({
    method: 'POST',
    url: `https://${instance}.zendesk.com/api/v2/${type}/${id}/tags.json`,
    headers,
    data
  }),

  /**
   * ## [Add Tags](https://developer.zendesk.com/rest_api/docs/support/tags#add-tags)
   * You can also add tags to multiple tickets with the [Update Many Tickets](https://developer.zendesk.com/rest_api/docs/support/tickets#updating-tag-lists) endpoint.
   * - _**PUT** /api/v2/{type}/{id}/tags.json_
   * ___
   * @param {string} type - Type of Zendesk object
   * @param {number} id - ID of Zendesk object of specified type
   * @param {object} data - Contains array of tags under "tags" key
   *
   * @example
   * tags.add('tickets', ticket_id, { tags: ['new_tag'] });
   * tags.add('organizations', organization_id, { tags: ['new_tag'] });
   * tags.add('users', user_id, { tags: ['new_tag'] });
   */
  add: (type, id, data) => ({
    method: 'PUT',
    url: `https://${instance}.zendesk.com/api/v2/${type}/${id}/tags.json`,
    headers,
    data
  }),

  /**
   * ## [Remove Tags](https://developer.zendesk.com/rest_api/docs/support/tags#remove-tags)
   * You can also delete tags from multiple tickets with the [Update Many Tickets](https://developer.zendesk.com/rest_api/docs/support/tickets#updating-tag-lists) endpoint.
   * - _**DELETE** /api/v2/{type}/{id}/tags.json_
   * ___
   * @param {string} type - Type of Zendesk object
   * @param {number} id - ID of Zendesk object of specified type
   * @param {object} data - Contains array of tags under "tags" key
   *
   * @example
   * tags.set('tickets', ticket_id, { tags: ['new_tag'] });
   * tags.set('organizations', organization_id, { tags: ['new_tag'] });
   * tags.set('users', user_id, { tags: ['new_tag'] });
   */
  remove: (type, id, data) => ({
    method: 'DELETE',
    url: `https://${instance}.zendesk.com/api/v2/${type}/${id}/tags.json`,
    headers,
    data
  }),

  /**
   * ## [Autocomplete Tags](https://developer.zendesk.com/rest_api/docs/support/tags#autocomplete-tags)
   * Returns an array of registered and recent tag names that start with the specified name. The name must be at least 2 characters in length.
   * - _**GET** /api/v2/autocomplete/tags.json?name={name}_
   * ___
   * @param {string} name - Tag to autocomplete
   *
   * @example
   * tags.autocomplete('name');
   */
  autocomplete: name => ({
    method: 'GET',
    url: `https://${instance}.zendesk.com/api/v2/autocomplete/tags.json?name=${name}`,
    headers
  })
});

module.exports = tags;
