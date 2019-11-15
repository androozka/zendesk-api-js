const validate = require('./validate');

module.exports = ({ instance, headers }) => {
  const url = `https://${instance}.zendesk.com`;

  return {
    list: (options = {}) => {
      const { error } = validate.list(options);
      if (error) throw new Error(error.details[0].message);

      const { user_id } = options;

      return {
        method: 'GET',
        url: `${url}/api/v2/users/${user_id}/identities.json`,
        headers
      };
    },

    show: (options = {}) => {
      const { error } = validate.show(options);
      if (error) throw new Error(error.details[0].message);

      const { user_id, id } = options;

      return {
        method: 'GET',
        url: `${url}/api/v2/users/${user_id}/identities/${id}.json`,
        headers
      };
    },

    create: (options = {}) => {
      const { error } = validate.create(options);
      if (error) throw new Error(error.details[0].message);

      const { user_id, end_users = false, data } = options;

      return {
        method: 'POST',
        url: end_users
          ? `${url}/api/v2/end_users/${user_id}/identities.json`
          : `${url}/api/v2/users/${user_id}/identities.json`,
        headers,
        data
      };
    },

    update: (options = {}) => {
      const { error } = validate.update(options);
      if (error) throw new Error(error.details[0].message);

      const { user_id, id, data } = options;

      return {
        method: 'PUT',
        url: `${url}/api/v2/users/${user_id}/identities/${id}.json`,
        headers,
        data
      };
    },

    make_primary: (options = {}) => {
      const { error } = validate.make_primary(options);
      if (error) throw new Error(error.details[0].message);

      const { user_id, id, end_users = false, data = {} } = options;

      return {
        method: 'PUT',
        url: end_users
          ? `${url}/api/v2/end_users/${user_id}/identities/${id}/make_primary`
          : `${url}/api/v2/users/${user_id}/identities/${id}/make_primary`,
        headers,
        data
      };
    },

    verify: (options = {}) => {
      const { error } = validate.verify(options);
      if (error) throw new Error(error.details[0].message);

      const { user_id, id, data = {} } = options;

      return {
        method: 'PUT',
        url: `${url}/api/v2/users/${user_id}/identities/${id}/verify`,
        headers,
        data
      };
    },

    request_verification: (options = {}) => {
      const { error } = validate.request_verification(options);
      if (error) throw new Error(error.details[0].message);

      const { user_id, id, data = {} } = options;

      return {
        method: 'PUT',
        url: `${url}/api/v2/users/${user_id}/identities/${id}/request_verification.json`,
        headers,
        data
      };
    },

    delete: (options = {}) => {
      const { error } = validate.delete(options);
      if (error) throw new Error(error.details[0].message);

      const { user_id, id } = options;

      return {
        method: 'DELETE',
        url: `${url}/api/v2/users/${user_id}/identities/${id}.json`,
        headers
      };
    }
  };
};
