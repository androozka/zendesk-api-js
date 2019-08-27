const endpoint = require('../../../../src/api/v2/support');

const instance = 'instance';
const headers = {};

const check = (type, compare = 'object') => expect(typeof type).toBe(compare);

describe('support api', () => {
  let support;

  beforeEach(() => (support = endpoint({ instance, headers })));
  afterEach(() => (support = null));

  describe('tickets', () => {
    test('search', () => check(support.search, 'function'));
    test('tickets', () => check(support.tickets));
    test('ticket_metrics', () => check(support.ticket_metrics));
    test('tags', () => check(support.tags));
  });
});
