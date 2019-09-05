const validate = require('./validate');

module.exports = ({ instance, headers }) => {
  const url = `https://${instance}.zendesk.com`;

  return {
    list: (options = null) => {
      if (options) throw new Error('no options are allowed');

      return {
        method: 'GET',
        url: `${url}/api/v2/suspended_tickets.json`,
        headers
      };
    },

    show: (options = {}) => {
      const { error } = validate.show(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/suspended_tickets/${id}.json`,
        headers
      };
    },

    recover: (options = {}) => {
      const { error } = validate.recover(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'PUT',
        url: `${url}/api/v2/suspended_tickets/${id}/recover.json`,
        headers
      };
    },

    recover_many: (options = {}) => {
      const { error } = validate.recover_many(options);
      if (error) throw new Error(error.details[0].message);

      const { ids } = options;
      return {
        method: 'PUT',
        url: `${url}/api/v2/suspended_tickets/recover_many.json?ids=${ids}`,
        headers
      };
    },

    delete: (options = {}) => {
      const { error } = validate.delete(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'DELETE',
        url: `${url}/api/v2/suspended_tickets/${id}.json`,
        headers
      };
    },

    delete_many: (options = {}) => {
      const { error } = validate.delete_many(options);
      if (error) throw new Error(error.details[0].message);

      const { ids } = options;
      return {
        method: 'DELETE',
        url: `${url}/api/v2/suspended_tickets/destroy_many.json?ids=${ids}`,
        headers
      };
    }
  };
};
