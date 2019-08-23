const pkg = require('..');

describe('Zendesk App Frameworks', () => {
  const headers = {};
  let api;

  describe('v2', () => {
    beforeAll(() => (api = pkg.v2('', headers)));
    afterAll(() => (api = null));

    test('support api', () => expect(api.support).toBeDefined());
  });
});

// const zdApi = require('zendesk-api-js')
// const { support } = new zdApi.v2(url, headers);
// const { tags } = await support.tags.list();

// const base64 = require('./node_modules/js-base64').Base64;

// const api = require('zendesk-api-js').v2
// const { support } = require('./src/api').v2;
// const api = require('./index').v2();

// console.log(api);

// const email = '';
// const token = '';
// const headers = {
//   'Content-Type': 'application/json',
//   Authorization: `Basic ${base64.encode(`${email}/token:${token}`)}`
// };
