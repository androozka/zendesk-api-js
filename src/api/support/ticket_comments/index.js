const validate = require('./validate');

module.exports = ({ instance, headers }) => {
  const url = `https://${instance}.zendesk.com`;

  return {
    list: (options = {}) => {
      const { error } = validate.list(options);
      if (error) throw new Error(error.details[0].message);

      const { ticket_id } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/tickets/${ticket_id}/comments.json`,
        headers
      };
    },

    emailCCs: (options = {}) => {
      const { error } = validate.emailCCs(options);
      if (error) throw new Error(error.details[0].message);

      const { ticket_id } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/tickets/${ticket_id}/comments.json?include=users`,
        headers
      };
    },

    redact: (options = {}) => {
      const { error } = validate.redact(options);
      if (error) throw new Error(error.details[0].message);

      const { ticket_id, id, data } = options;
      return {
        method: 'PUT',
        url: `${url}/api/v2/tickets/${ticket_id}/comments/${id}/redact.json`,
        headers,
        data
      };
    },

    makePrivate: (options = {}) => {
      const { error } = validate.makePrivate(options);
      if (error) throw new Error(error.details[0].message);

      const { ticket_id, id } = options;
      return {
        method: 'PUT',
        url: `${url}/api/v2/tickets/${ticket_id}/comments/${id}/make_private.json`,
        headers,
        data: {}
      };
    }
  };
};
