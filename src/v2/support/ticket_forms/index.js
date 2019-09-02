const validate = require('./validate');

module.exports = ({ instance, headers }) => {
  const url = `https://${instance}.zendesk.com`;

  return {
    list: (options = null) => {
      if (options) throw new Error('no options are allowed');

      return {
        method: 'GET',
        url: `${url}/api/v2/ticket_forms.json`,
        headers
      };
    },

    create: (options = {}) => {
      const { error } = validate.create(options);
      if (error) throw new Error(error.details[0].message);

      const { data } = options;
      return {
        method: 'POST',
        url: `${url}/api/v2/ticket_forms.json`,
        headers,
        data
      };
    },

    show: (options = {}) => {
      const { error } = validate.show(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/ticket_forms/${id}.json`,
        headers
      };
    },

    show_many: (options = {}) => {
      const { error } = validate.show_many(options);
      if (error) throw new Error(error.details[0].message);

      const { ids } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/ticket_forms/show_many.json?ids=${ids}`,
        headers
      };
    },

    update: (options = {}) => {
      const { error } = validate.update(options);
      if (error) throw new Error(error.details[0].message);

      const { id, data } = options;
      return {
        method: 'PUT',
        url: `${url}/api/v2/ticket_forms/${id}.json`,
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
        url: `${url}/api/v2/ticket_forms/${id}.json`,
        headers
      };
    },

    reorder: (options = {}) => {
      const { error } = validate.reorder(options);
      if (error) throw new Error(error.details[0].message);

      const { data } = options;
      return {
        method: 'PUT',
        url: `${url}/api/v2/ticket_forms/reorder.json`,
        headers,
        data
      };
    },

    clone: (options = {}) => {
      const { error } = validate.clone(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'POST',
        url: `${url}/api/v2/ticket_forms/${id}/clone.json`,
        headers
      };
    }
  };
};
