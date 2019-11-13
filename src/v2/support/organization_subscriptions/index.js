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
            ? `users/${user_id}/organization_subscriptions.json`
            : organization_id
            ? `organizations/${organization_id}/subscriptions.json`
            : `organization_subscriptions.json`
        }`,
        headers
      };
    },

    show: (options = {}) => {
      const { error } = validate.show(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: "GET",
        url: `${url}/api/v2/organization_subscriptions/${id}.json`,
        headers
      };
    },

    create: (options = {}) => {
      const { error } = validate.create(options);
      if (error) throw new Error(error.details[0].message);

      const { data } = options;
      return {
        method: "POST",
        url: `${url}/api/v2/organization_subscriptions.json`,
        headers,
        data
      };
    },

    delete: (options = {}) => {
      const { error } = validate.delete(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: "DELETE",
        url: `${url}/api/v2/organization_subscriptions/${id}.json`,
        headers
      };
    }
  };
};
