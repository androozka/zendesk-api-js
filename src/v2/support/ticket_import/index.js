const validate = require('./validate');

module.exports = ({ instance, headers }) => {
  const url = `https://${instance}.zendesk.com`;

  return {
    single: (options = {}) => {
      const { error } = validate.single(options);
      if (error) throw new Error(error.details[0].message);

      const { data } = options;
      return {
        method: 'POST',
        url: `${url}/api/v2/imports/tickets.json`,
        headers,
        data
      };
    },

    bulk: (options = {}) => {
      const { error } = validate.bulk(options);
      if (error) throw new Error(error.details[0].message);

      const { data } = options;
      return {
        method: 'POST',
        url: `${url}/api/v2/imports/tickets/create_many.json`,
        headers,
        data
      };
    }
  };
};
