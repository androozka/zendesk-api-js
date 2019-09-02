const validate = require('./validate');

module.exports = ({ instance, headers }) => {
  const url = `https://${instance}.zendesk.com`;

  return {
    list: (options = {}) => {
      const { error } = validate.list(options);
      if (error) throw new Error(error.details[0].message);

      const { user_id = '' } = options;
      const part = user_id ? `/users/${user_id}` : '';
      return {
        method: 'GET',
        url: `${url}/api/v2${part}/organizations.json`,
        headers
      };
    },

    autocomplete: (options = {}) => {
      const { error } = validate.autocomplete(options);
      if (error) throw new Error(error.details[0].message);

      const { name } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/organizations/autocomplete.json?name=${name}`,
        headers
      };
    },

    related: (options = {}) => {
      const { error } = validate.related(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/organizations/${id}/related.json`,
        headers
      };
    },

    show: (options = {}) => {
      const { error } = validate.show(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/organizations/${id}.json`,
        headers
      };
    },

    show_many: (options = {}) => {
      const { error } = validate.show_many(options);
      if (error) throw new Error(error.details[0].message);

      const { ids = '', external_ids = '' } = options;
      if ((!ids && !external_ids) || (ids && external_ids))
        throw new Error(
          'either "user_ids" or "external_ids" must be set, not both'
        );

      const part = ids ? `?ids=${ids}` : `?external_ids=${external_ids}`;
      return {
        method: 'GET',
        url: `${url}/api/v2/organizations/show_many.json${part}`,
        headers
      };
    },

    create: (options = {}) => {
      const { error } = validate.create(options);
      if (error) throw new Error(error.details[0].message);

      const { data } = options;
      return {
        method: 'POST',
        url: `${url}/api/v2/organizations.json`,
        headers,
        data
      };
    },

    create_many: (options = {}) => {
      const { error } = validate.create_many(options);
      if (error) throw new Error(error.details[0].message);

      const { data } = options;
      return {
        method: 'POST',
        url: `${url}/api/v2/organizations/create_many.json`,
        headers,
        data
      };
    },

    create_or_update: (options = {}) => {
      const { error } = validate.create_or_update(options);
      if (error) throw new Error(error.details[0].message);

      const { data } = options;
      return {
        method: 'POST',
        url: `${url}/api/v2/organizations/create_or_update.json`,
        headers,
        data
      };
    },

    update: (options = {}) => {
      const { error } = validate.update(options);
      if (error) throw new Error(error.details[0].message);

      const { id, data } = options;
      return {
        method: 'PUT',
        url: `${url}/api/v2/organizations/${id}.json`,
        headers,
        data
      };
    },

    update_many: (options = {}) => {
      const { error } = validate.update_many(options);
      if (error) throw new Error(error.details[0].message);

      const { ids, external_ids, data } = options;
      if (ids && external_ids)
        throw new Error('either "ids" or "external_ids" can be set, not both');

      const part = ids
        ? `?ids=${ids}`
        : external_ids
        ? `?external_ids=${external_ids}`
        : '';

      return {
        method: 'PUT',
        url: `${url}/api/v2/organizations/update_many.json${part}`,
        headers,
        data
      };
    },

    delete: (options = {}) => {
      const { error } = validate.delete(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'DELETE',
        url: `${url}/api/v2/organizations/${id}.json`,
        headers
      };
    },

    delete_many: (options = {}) => {
      const { error } = validate.delete_many(options);
      if (error) throw new Error(error.details[0].message);

      const { ids, external_ids } = options;
      if ((!ids && !external_ids) || (ids && external_ids))
        throw new Error(
          'either "user_ids" or "external_ids" must be set, not both'
        );

      const part = ids ? `?ids=${ids}` : `?external_ids=${external_ids}`;
      return {
        method: 'DELETE',
        url: `${url}/api/v2/organizations/destroy_many.json${part}`,
        headers
      };
    },

    search: (options = {}) => {
      const { error } = validate.search(options);
      if (error) throw new Error(error.details[0].message);

      const { external_id } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/organizations/search.json?external_id=${external_id}`,
        headers
      };
    }
  };
};
