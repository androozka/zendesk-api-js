const validate = require('./validate');

module.exports = ({ instance, headers }) => {
  const url = `https://${instance}.zendesk.com`;

  return {
    list: (options = null) => {
      if (options) throw new Error('no options are allowed');

      return {
        method: 'GET',
        url: `${url}/api/v2/ticket_fields.json`,
        headers
      };
    },

    show: (options = {}) => {
      const { error } = validate.show(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/ticket_fields/${id}.json`,
        headers
      };
    },

    create: (options = {}) => {
      const { error } = validate.create(options);
      if (error) throw new Error(error.details[0].message);

      const { data } = options;
      return {
        method: 'POST',
        url: `${url}/api/v2/ticket_fields.json`,
        headers,
        data
      };
    },

    update: (options = {}) => {
      const { error } = validate.update(options);
      if (error) throw new Error(error.details[0].message);

      const { id, data } = options;
      return {
        method: 'PUT',
        url: `${url}/api/v2/ticket_fields/${id}.json`,
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
        url: `${url}/api/v2/ticket_fields/${id}.json`,
        headers
      };
    },

    listOptions: (options = {}) => {
      const { error } = validate.listOptions(options);
      if (error) throw new Error(error.details[0].message);

      const { field_id } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/ticket_fields/${field_id}/options.json`,
        headers
      };
    },

    showOption: (options = {}) => {
      const { error } = validate.showOption(options);
      if (error) throw new Error(error.details[0].message);

      const { field_id, id } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/ticket_fields/${field_id}/options/${id}.json`,
        headers
      };
    },

    createOrUpdateOption: (options = {}) => {
      const { error } = validate.createOrUpdateOption(options);
      if (error) throw new Error(error.details[0].message);

      const { field_id, id, data } = options;
      return {
        method: 'POST',
        url: `${url}/api/v2/ticket_fields/${field_id}/options/${id}.json`,
        headers,
        data
      };
    },

    deleteOption: (options = {}) => {
      const { error } = validate.deleteOption(options);
      if (error) throw new Error(error.details[0].message);

      const { field_id, id } = options;
      return {
        method: 'DELETE',
        url: `${url}/api/v2/ticket_fields/${field_id}/options/${id}.json`,
        headers
      };
    }
  };
};
