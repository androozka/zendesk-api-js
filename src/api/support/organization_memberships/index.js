const validate = require("./validate");

module.exports = ({ instance, headers }) => {
  const url = `https://${instance}.zendesk.com`;

  return {
    list: (options = {}) => {
      const { error } = validate.list(options);
      if (error) throw new Error(error.details[0].message);

      const { user_id, organization_id } = options;
      if (user_id && organization_id)
        throw new Error(
          'either "user_id" or "organization_id" may be set, not both'
        );

      return {
        method: "GET",
        url: `${url}/api/v2/${
          user_id
            ? `users/${user_id}/organization_memberships.json`
            : organization_id
            ? `organizations/${organization_id}/organization_memberships.json`
            : `organization_memberships.json`
        }`,
        headers
      };
    },

    show: (options = {}) => {
      const { error } = validate.show(options);
      if (error) throw new Error(error.details[0].message);

      const { id, user_id = "" } = options;
      return {
        method: "GET",
        url: `${url}/api/v2${
          user_id ? `/users/${user_id}` : ""
        }/organization_memberships/${id}.json`,
        headers
      };
    },

    create: (options = {}) => {
      const { error } = validate.create(options);
      if (error) throw new Error(error.details[0].message);

      const { user_id = "", data } = options;
      return {
        method: "POST",
        url: `${url}/api/v2${
          user_id ? `/users/${user_id}` : ""
        }/organization_memberships.json`,
        headers,
        data
      };
    },

    create_many: (options = {}) => {
      const { error } = validate.create_many(options);
      if (error) throw new Error(error.details[0].message);

      const { data } = options;
      return {
        method: "POST",
        url: `${url}/api/v2/organization_memberships/create_many.json`,
        headers,
        data
      };
    },

    delete: (options = {}) => {
      const { error } = validate.delete(options);
      if (error) throw new Error(error.details[0].message);

      const { id, user_id = "" } = options;
      return {
        method: "DELETE",
        url: `${url}/api/v2${
          user_id ? `/users/${user_id}` : ""
        }/organization_memberships/${id}.json`,
        headers
      };
    },

    delete_many: (options = {}) => {
      const { error } = validate.delete_many(options);
      if (error) throw new Error(error.details[0].message);

      const { ids } = options;
      return {
        method: "DELETE",
        url: `${url}/api/v2/organization_memberships/destroy_many.json?ids=${ids}`,
        headers
      };
    },

    default: (options = {}) => {
      const { error } = validate.default(options);
      if (error) throw new Error(error.details[0].message);

      const { id, membership_id } = options;
      return {
        method: "PUT",
        url: `${url}/api/v2/users/${id}/organization_memberships/${membership_id}/make_default.json`,
        headers
      };
    }
  };
};
