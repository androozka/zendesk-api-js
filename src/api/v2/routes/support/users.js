const validate = require('../../validators/support/users');

module.exports = ({ instance, headers }) => {
  const url = `https://${instance}.zendesk.com`;

  return {
    list: (options = {}) => {
      const { error } = validate.list(options);
      if (error) throw new Error(error.details[0].message);

      const { type = '', id = 0 } = options;
      if (!type && id > 0)
        throw new Error('if "id" is set, "type" must be set');
      if (type && !id) throw new Error('if "type" is set, "id" must be set');

      return {
        method: 'GET',
        url: {
          '': `${url}/api/v2/users.json`,
          groups: `${url}/api/v2/groups/${id}/users.json`,
          organizations: `${url}/api/v2/organizations/${id}/users.json`
        }[type],
        headers
      };
    },

    show: (options = {}) => {
      const { error } = validate.show(options);
      if (error) throw new Error(error.details[0].message);

      return {
        method: 'GET',
        url: `${url}/api/v2/users/${options.id}.json`,
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
        url: `${url}/api/v2/users/show_many.json${
          ids ? `?ids=${ids}` : `?external_ids=${external_ids}`
        }`,
        headers
      };
    },

    related: (options = {}) => {
      const { error } = validate.related(options);
      if (error) throw new Error(error.details[0].message);

      return {
        method: 'GET',
        url: `${url}/api/v2/users/${options.id}/related.json`,
        headers
      };
    },

    create: (options = {}) => {
      const { error } = validate.create(options);
      if (error) throw new Error(error.details[0].message);

      return {
        method: 'POST',
        url: `${url}/api/v2/users.json`,
        headers,
        data: options.data
      };
    },

    create_or_update: (options = {}) => {
      const { error } = validate.create_or_update(options);
      if (error) throw new Error(error.details[0].message);

      return {
        method: 'POST',
        url: `${url}/api/v2/users/create_or_update.json`,
        headers,
        data: options.data
      };
    },

    create_or_update_many: (options = {}) => {
      const { error } = validate.create_or_update_many(options);
      if (error) throw new Error(error.details[0].message);

      return {
        method: 'POST',
        url: `${url}/api/v2/users/create_or_update_many.json`,
        headers,
        data: options.data
      };
    },

    merge_self: (options = {}) => {
      const { error } = validate.merge_self(options);
      if (error) throw new Error(error.details[0].message);

      return {
        method: 'PUT',
        url: `${url}/api/v2/users/me/merge.json`,
        headers,
        data: options.data
      };
    },

    merge: (options = {}) => {
      const { error } = validate.merge(options);
      if (error) throw new Error(error.details[0].message);

      const { id, data } = options;
      return {
        method: 'POST',
        url: `${url}/api/v2/users/${id}/merge.json`,
        headers,
        data
      };
    },

    create_many: (options = {}) => {
      const { error } = validate.create_many(options);
      if (error) throw new Error(error.details[0].message);

      return {
        method: 'POST',
        url: `${url}/api/v2/users/create_many.json`,
        headers,
        data: options.data
      };
    },

    update: (options = {}) => {
      const { error } = validate.update(options);
      if (error) throw new Error(error.details[0].message);

      const { id, data } = options;
      return {
        method: 'PUT',
        url: `${url}/api/v2/users/${id}.json`,
        headers,
        data
      };
    },

    update_many: (options = {}) => {
      const { error } = validate.update_many(options);
      if (error) throw new Error(error.details[0].message);

      const { ids = '', external_ids = '', data } = options;
      if (ids && external_ids)
        throw new Error('both "ids" and "external_ids" cannot be set');

      let params = ids
        ? `?ids=${ids}`
        : external_ids
        ? `?external_ids=${external_ids}`
        : '';

      return {
        method: 'PUT',
        url: `${url}/api/v2/users.json${params}`,
        headers,
        data
      };
    },

    delete_many: (options = {}) => {
      const { error } = validate.delete_many(options);
      if (error) throw new Error(error.details[0].message);

      const { ids = '', external_ids = '' } = options;
      if ((!ids && !external_ids) || (ids && external_ids))
        throw new Error(
          'either "ids" or "external_ids" must be set, but not both'
        );

      let params = ids ? `?ids=${ids}` : `?external_ids=${external_ids}`;
      return {
        method: 'DELETE',
        url: `${url}/api/v2/users/destroy_many.json${params}`,
        headers
      };
    },

    delete: (options = {}) => {
      const { error } = validate.delete(options);
      if (error) throw new Error(error.details[0].message);

      return {
        method: 'DELETE',
        url: `${url}/api/v2/users/${options.id}.json`,
        headers
      };
    },

    search: (options = {}) => {
      const { error } = validate.search(options);
      if (error) throw new Error(error.details[0].message);

      const { query = '', external_id = '' } = options;
      if ((!query && !external_id) || (query && external_id))
        throw new Error(
          'either "query" or "external_id" must be set, but not both'
        );

      const params = query ? `?query=${query}` : `?external_id=${external_id}`;
      return {
        method: 'GET',
        url: `${url}/api/v2/users/search.json${params}`,
        headers
      };
    },

    autocomplete: (options = {}) => {
      const { error } = validate.autocomplete(options);
      if (error) throw new Error(error.details[0].message);

      return {
        method: 'GET',
        url: `${url}/api/v2/users/autocomplete.json?name=${options.name}`,
        headers
      };
    },

    request_create: (options = {}) => {
      const { error } = validate.request_create(options);
      if (error) throw new Error(error.details[0].message);

      return {
        method: 'POST',
        url: `${url}/api/v2/users/request_create.json`,
        headers,
        data: options.data
      };
    },

    list_deleted: (options = null) => {
      if (options) throw new Error('options are not allowed');

      return {
        method: 'GET',
        url: `${url}/api/v2/deleted_users.json`,
        headers
      };
    },

    show_deleted: (options = {}) => {
      const { error } = validate.show_deleted(options);
      if (error) throw new Error(error.details[0].message);

      return {
        method: 'GET',
        url: `${url}/api/v2/deleted_users/${options.id}.json`,
        headers
      };
    },

    permanently_delete: (options = {}) => {
      const { error } = validate.permanently_delete(options);
      if (error) throw new Error(error.details[0].message);

      return {
        method: 'DELETE',
        url: `${url}/api/v2/deleted_users/${options.id}.json`,
        headers
      };
    },

    compliance_deletion_statuses: (options = {}) => {
      const { error } = validate.compliance_deletion_statuses(options);
      if (error) throw new Error(error.details[0].message);

      return {
        method: 'GET',
        url: `${url}/api/v2/users/${options.id}/compliance_deletion_statuses.json`,
        headers
      };
    },

    current: (options = null) => {
      if (options) throw new Error('options are not allowed');

      return {
        method: 'GET',
        url: `${url}/api/v2/users/me.json`,
        headers
      };
    }
  };
};
