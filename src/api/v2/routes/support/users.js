const validate = require('../../validators/support/users');

module.exports = ({ instance, headers }) => ({
  list: (options = {}) => {
    const { error } = validate.list(options);
    if (error) throw new Error(error.details[0].message);

    const { type = '', id = 0 } = options;
    if (!type && id > 0) throw new Error('if "id" is set, "type" must be set');
    if (type && !id) throw new Error('if "type" is set, "id" must be set');

    return {
      method: 'GET',
      url: {
        '': `https://${instance}.zendesk.com/api/v2/users.json`,
        groups: `https://${instance}.zendesk.com/api/v2/groups/${id}/users.json`,
        organizations: `https://${instance}.zendesk.com/api/v2/organizations/${id}/users.json`
      }[type],
      headers
    };
  },

  show: (options = {}) => {
    const { error } = validate.show(options);
    if (error) throw new Error(error.details[0].message);

    return {
      method: 'GET',
      url: `https://${instance}.zendesk.com/api/v2/users/${options.id}.json`,
      headers
    };
  },

  show_many: (options = {}) => {
    const { error } = validate.show_many(options);
    if (error) throw new Error(error.details[0].message);

    const { ids = '', external_ids = '' } = options;
    if ((!ids && !external_ids) || (ids && external_ids))
      throw new Error('either "ids" or "external_ids" can be set, not both');

    return {
      method: 'GET',
      url: `https://${instance}.zendesk.com/api/v2/users/show_many.json${
        ids ? `?ids=${ids}` : `?external_ids=${external_ids}`
      }`,
      headers
    };
  }
});
