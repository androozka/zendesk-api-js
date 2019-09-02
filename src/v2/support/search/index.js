const validate = require('./validate');

module.exports = ({ instance, headers }) => {
  const url = `https://${instance}.zendesk.com`;

  return (options = {}) => {
    const { error } = validate(options);
    if (error) throw new Error(error.details[0].message);

    const { search_string } = options;
    return {
      method: 'GET',
      url: `${url}/api/v2/search.json?query=${search_string}`,
      headers
    };
  };
};
