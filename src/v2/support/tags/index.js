const validate = require('./validate');

module.exports = ({ instance, headers }) => {
  const url = `https://${instance}.zendesk.com`;

  return {
    list: (options = null) => {
      if (options) throw new Error('no options are allowed');

      return {
        method: 'GET',
        url: `${url}/api/v2/tags.json`,
        headers
      };
    },

    show: (options = {}) => {
      const { error } = validate.show(options);
      if (error) throw new Error(error.details[0].message);

      const { type, id } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/${type}/${id}/tags.json`,
        headers
      };
    },

    set: (options = {}) => {
      const { error } = validate.set(options);
      if (error) throw new Error(error.details[0].message);

      const { type, id, data } = options;
      return {
        method: 'POST',
        url: `${url}/api/v2/${type}/${id}/tags.json`,
        headers,
        data
      };
    },

    add: (options = {}) => {
      const { error } = validate.add(options);
      if (error) throw new Error(error.details[0].message);

      const { type, id, data } = options;
      return {
        method: 'PUT',
        url: `${url}/api/v2/${type}/${id}/tags.json`,
        headers,
        data
      };
    },

    remove: (options = {}) => {
      const { error } = validate.remove(options);
      if (error) throw new Error(error.details[0].message);

      const { type, id, data } = options;
      return {
        method: 'DELETE',
        url: `${url}/api/v2/${type}/${id}/tags.json`,
        headers,
        data
      };
    },

    autocomplete: (options = {}) => {
      const { error } = validate.autocomplete(options);
      if (error) throw new Error(error.details[0].message);

      const { name } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/autocomplete/tags.json?name=${name}`,
        headers
      };
    }
  };
};
