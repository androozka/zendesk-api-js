module.exports = ({ instance, headers }) => ({ search_string }) => ({
  method: 'GET',
  url: `https://${instance}.zendesk.com/api/v2/search.json?query=${search_string}`,
  headers
});
