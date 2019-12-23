const validate = require('./validate');

module.exports = ({ instance, headers }) => {
  const url = `https://${instance}.zendesk.com`;

  return {
    list: (options = {}) => {
      const { error } = validate.list(options);
      if (error) throw new Error(error.details[0].message);

      const { user_id, group_id } = options;
      if (user_id && group_id)
        throw new Error('either "user_id" or "group_id" may be set, not both');

      return {
        method: 'GET',
        url: `${url}/api/v2/${
          user_id
            ? `users/${user_id}/group_memberships.json`
            : group_id
            ? `groups/${group_id}/memberships.json`
            : `group_memberships.json`
        }`,
        headers
      };
    },

    assignable: (options = {}) => {
      const { error } = validate.assignable(options);
      if (error) throw new Error(error.details[0].message);

      const { group_id } = options;

      return {
        method: 'GET',
        url: `${url}/api/v2/${
          group_id
            ? `groups/${group_id}/memberships/assignable.json`
            : `group_memberships/assignable.json`
        }`,
        headers
      };
    },

    show: (options = {}) => {
      const { error } = validate.show(options);
      if (error) throw new Error(error.details[0].message);

      const { id, user_id = '' } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2${
          user_id ? `/users/${user_id}` : ''
        }/group_memberships/${id}.json`,
        headers
      };
    },

    create: (options = {}) => {
      const { error } = validate.create(options);
      if (error) throw new Error(error.details[0].message);

      const { user_id = '', data } = options;
      return {
        method: 'POST',
        url: `${url}/api/v2${
          user_id ? `/users/${user_id}` : ''
        }/group_memberships.json`,
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
        url: `${url}/api/v2/group_memberships/create_many.json`,
        headers,
        data
      };
    },

    delete: (options = {}) => {
      const { error } = validate.delete(options);
      if (error) throw new Error(error.details[0].message);

      const { id, user_id = '' } = options;
      return {
        method: 'DELETE',
        url: `${url}/api/v2${
          user_id ? `/users/${user_id}` : ''
        }/group_memberships/${id}.json`,
        headers
      };
    },

    delete_many: (options = {}) => {
      const { error } = validate.delete_many(options);
      if (error) throw new Error(error.details[0].message);

      const { ids } = options;
      return {
        method: 'DELETE',
        url: `${url}/api/v2/group_memberships/destroy_many.json?ids=${ids}`,
        headers
      };
    },

    default: (options = {}) => {
      const { error } = validate.default(options);
      if (error) throw new Error(error.details[0].message);

      const { user_id, membership_id } = options;
      return {
        method: 'PUT',
        url: `${url}/api/v2/users/${user_id}/group_memberships/${membership_id}/make_default.json`,
        headers
      };
    }
  };
};
