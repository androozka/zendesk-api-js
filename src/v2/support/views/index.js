const validate = require('./validate');

module.exports = ({ instance, headers }) => {
  const url = `https://${instance}.zendesk.com`;

  return {
    list: (options = {}) => {
      const { error } = validate.list(options);
      if (error) throw new Error(error.details[0].message);

      const { ids = '' } = options;
      const part = ids ? `?ids=${ids}` : '';

      return {
        method: 'GET',
        url: `${url}/api/v2/views.json${part}`,
        headers
      };
    },

    update_many: (options = {}) => {
      const { error } = validate.update_many(options);
      if (error) throw new Error(error.details[0].message);

      const { data } = options;
      return {
        method: 'PUT',
        url: `${url}/api/v2/views/update_many.json`,
        headers,
        data
      };
    },

    active: (options = null) => {
      if (options) throw new Error('no options are allowed');

      return {
        method: 'GET',
        url: `${url}/api/v2/views/active.json`,
        headers
      };
    },

    compact: (options = null) => {
      if (options) throw new Error('no options are allowed');

      return {
        method: 'GET',
        url: `${url}/api/v2/views/compact.json`,
        headers
      };
    },

    show: (options = {}) => {
      const { error } = validate.show(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/views/${id}.json`,
        headers
      };
    },

    create: (options = {}) => {
      const { error } = validate.create(options);
      if (error) throw new Error(error.details[0].message);

      const { data } = options;
      return {
        method: 'POST',
        url: `${url}/api/v2/views.json`,
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
        url: `${url}/api/v2/views/${id}.json`,
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
        url: `${url}/api/v2/views/${id}.json`,
        headers
      };
    },

    delete_many: (options = {}) => {
      const { error } = validate.delete_many(options);
      if (error) throw new Error(error.details[0].message);

      const { data } = options;
      return {
        method: 'DELETE',
        url: `${url}/api/v2/views/destroy_many.json`,
        headers,
        data
      };
    },

    execute: (options = {}) => {
      const { error } = validate.execute(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/views/${id}/execute.json`,
        headers
      };
    },

    tickets: (options = {}) => {
      const { error } = validate.tickets(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/views/${id}/tickets.json`,
        headers
      };
    },

    count_many: (options = {}) => {
      const { error } = validate.count_many(options);
      if (error) throw new Error(error.details[0].message);

      const { ids } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/views/count_many.json?ids=${ids}`,
        headers
      };
    },

    count: (options = {}) => {
      const { error } = validate.count(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/views/${id}/count.json`,
        headers
      };
    },

    export: (options = {}) => {
      const { error } = validate.export(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/views/${id}/export.json`,
        headers
      };
    },

    search: (options = {}) => {
      const { error } = validate.search(options);
      if (error) throw new Error(error.details[0].message);

      const { query } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/views/search.json?query=${query}`,
        headers
      };
    },

    preview: (options = {}) => {
      const { error } = validate.preview(options);
      if (error) throw new Error(error.details[0].message);

      const { data } = options;
      return {
        method: 'POST',
        url: `${url}/api/v2/views/preview.json`,
        headers,
        data
      };
    },

    preview_count: (options = {}) => {
      const { error } = validate.preview_count(options);
      if (error) throw new Error(error.details[0].message);

      const { data } = options;
      return {
        method: 'POST',
        url: `${url}/api/v2/views/preview/count.json`,
        headers,
        data
      };
    }
  };
};
