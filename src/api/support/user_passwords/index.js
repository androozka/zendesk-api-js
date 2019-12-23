const validate = require('./validate');

module.exports = ({ instance, headers }) => {
  const url = `https://${instance}.zendesk.com`;

  return {
    set: (options = {}) => {
      const { error } = validate.set(options);
      if (error) throw new Error(error.details[0].message);

      const { user_id, data } = options;
      return {
        method: 'POST',
        url: `${url}/api/v2/users/${user_id}/password.json`,
        headers,
        data
      };
    },

    change: (options = {}) => {
      const { error } = validate.change(options);
      if (error) throw new Error(error.details[0].message);

      const { user_id, data } = options;
      return {
        method: 'PUT',
        url: `${url}/api/v2/users/${user_id}/password.json`,
        headers,
        data
      };
    },

    requirements: (options = {}) => {
      const { error } = validate.requirements(options);
      if (error) throw new Error(error.details[0].message);

      const { user_id } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/users/${user_id}/password/requirements.json`,
        headers
      };
    }
  };
};
